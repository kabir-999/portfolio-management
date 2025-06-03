require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Kabir999:Kabir999@portfolio.h9s6ckn.mongodb.net/?retryWrites=true&w=majority&appName=portfolio';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mathurkabir336@gmail.com', // Sender email address
    pass: process.env.EMAIL_PASSWORD || 'your_app_password' // Use app password for Gmail
  }
});

// Test email configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('Email server error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Send email notification function
const sendEmailNotification = async (messageData) => {
  const { name, email, phone, message } = messageData;
  
  const mailOptions = {
    from: 'mathurkabir336@gmail.com',
    to: 'kabirmathur05@gmail.com', // Your email where you want to receive notifications
    subject: `New Portfolio Message from ${name}`,
    html: `
      <h2>You've received a new message from your portfolio contact form</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <p><em>This is an automated notification from your portfolio website.</em></p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    
    // Save message to MongoDB
    const newMessage = await Message.create({ name, email, phone, message });
    
    // Send email notification
    await sendEmailNotification({ name, email, phone, message });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error in contact API:', err);
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 