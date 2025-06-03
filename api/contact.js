const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Using Gmail service
  auth: {
    user: process.env.EMAIL_USER || 'mathurkabir336@gmail.com', // Your sending email address
    pass: process.env.EMAIL_PASSWORD, // Your app password from .env
  },
});

let conn = null;

async function connectToDatabase() {
  if (conn) return conn;

  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Kabir999:Kabir999@portfolio.h9s6ckn.mongodb.net/?retryWrites=true&w=majority&appName=portfolio';
  
  try {
    conn = await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Log request for debugging
    console.log('Contact form submission received:', req.body);
    
    await connectToDatabase();
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save to database
    try {
      const newMessage = await Message.create({ name, email, phone, message });
      console.log('Message saved to database with ID:', newMessage._id);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to save message to database.' });
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
      
      res.status(200).json({ success: true });
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Still return success if DB save worked but email failed
      res.status(200).json({ success: true, warning: 'Message saved but email notification failed' });
    }
  } catch (err) {
    console.error('Error in contact API:', err);
    res.status(500).json({ error: 'Server error processing your request.' });
  }
}; 