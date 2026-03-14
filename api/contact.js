const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

let cachedConnection = null;
const allowedOrigins = [
  'http://localhost:3000',
  'https://kabir-portfolio-management.vercel.app',
];

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

const connectToDatabase = async () => {
  if (cachedConnection || mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set');
  }

  cachedConnection = await mongoose.connect(mongoUri);
  return cachedConnection;
};

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

module.exports = async (req, res) => {
  const origin = req.headers.origin;
  const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[1];

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', allowOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Vary', 'Origin');
    return res.status(200).end();
  }

  // Add CORS headers for Vercel deployment
  try {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', allowOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    res.setHeader('Vary', 'Origin');
  } catch (headerError) {
    console.error('Error setting CORS headers:', headerError);
    // Continue execution even if headers fail
  }

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Log environment variables (without exposing sensitive values)
    const transporter = createTransporter();

    console.log('Environment check:', {
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set',
      NODE_ENV: process.env.NODE_ENV
    });
    
    // Log request for debugging
    console.log('Contact form submission received:', req.body);
    
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'All fields are required.' });
    }

    await connectToDatabase();
    await Message.create({ name, email, phone, message });

    if (!transporter) {
      console.warn('Email notification skipped: email credentials are not configured');
      return res.status(200).json({
        success: true,
        warning: 'Message saved, but email notifications are not configured.',
      });
    }

    try {
      console.log('Attempting to send email notification');
      console.log('Using email credentials:', {
        from: process.env.EMAIL_USER,
        to: 'mathurkabir336@gmail.com'
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'mathurkabir336@gmail.com',
        replyTo: email,
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
        text: `New message from ${name} (${email}, ${phone}): ${message}`
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully:', info.messageId);
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      return res.status(200).json({
        success: true,
        warning: 'Message saved, but email notification failed.',
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error in contact API:', err);
    return res.status(500).json({ 
      error: 'Server error processing your request.', 
      details: err.message 
    });
  }
}; 
