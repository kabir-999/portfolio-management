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
  service: process.env.EMAIL_SERVICE, // e.g., 'Gmail', 'Outlook365'
  auth: {
    user: process.env.EMAIL_USER, // Your sending email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

let conn = null;

async function connectToDatabase() {
  if (conn) return conn;

  conn = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB connected');
  return conn;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await connectToDatabase();
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    await Message.create({ name, email, phone, message });

    // Send email notification
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.TO_EMAIL, // Your personal email to receive notifications
        subject: 'New Contact Form Submission',
        html: `
          <p>You have a new contact form submission:</p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Message:</strong> ${message}</li>
          </ul>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully');
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Failed to save message.' });
  }
}; 