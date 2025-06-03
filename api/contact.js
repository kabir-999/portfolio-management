const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Define schema outside of handler to avoid redefinition on each invocation
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// Use mongoose.models to check if the model is already defined
let Message;
try {
  Message = mongoose.model('Message');
} catch {
  Message = mongoose.model('Message', messageSchema);
}

// Create transporter outside the handler to reuse connection
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'mathurkabir336@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Cache database connection between invocations
let cachedConnection = null;

async function connectToDatabase() {
  // If the connection is already established, reuse it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Kabir999:Kabir999@portfolio.h9s6ckn.mongodb.net/?retryWrites=true&w=majority&appName=portfolio';
  
  try {
    cachedConnection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log('MongoDB connected');
    return cachedConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = async (req, res) => {
  // Add CORS headers for Vercel deployment
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Log environment variables (without exposing sensitive values)
    console.log('Environment check:', {
      MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set',
      NODE_ENV: process.env.NODE_ENV
    });
    
    // Log request for debugging
    console.log('Contact form submission received:', req.body);
    
    // Connect to database
    try {
      await connectToDatabase();
      console.log('Database connection successful');
    } catch (dbConnError) {
      console.error('Database connection failed:', dbConnError);
      return res.status(500).json({ error: 'Failed to connect to database', details: dbConnError.message });
    }
    
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save to database
    let newMessage;
    try {
      newMessage = await Message.create({ name, email, phone, message });
      console.log('Message saved to database with ID:', newMessage._id);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to save message to database', details: dbError.message });
    }

    // Send email notification
    try {
      console.log('Attempting to send email notification');
      
      const mailOptions = {
        from: process.env.EMAIL_USER || 'mathurkabir336@gmail.com',
        to: 'mathurkabir336@gmail.com', // Your personal email to receive notifications
        subject: `New Portfolio Message from ${name}`,
        html: `
          <h2>You've received a new message from your portfolio contact form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p><em>This is an automated notification from your portfolio website.</em></p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully');
      
      return res.status(200).json({ success: true, messageId: newMessage._id });
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Still return success if DB save worked but email failed
      return res.status(200).json({ 
        success: true, 
        warning: 'Message saved but email notification failed',
        details: emailError.message,
        messageId: newMessage._id
      });
    }
  } catch (err) {
    console.error('Error in contact API:', err);
    return res.status(500).json({ error: 'Server error processing your request.', details: err.message });
  }
}; 