const nodemailer = require('nodemailer');

// Create transporter outside the handler to reuse connection
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'mathurkabir336@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = async (req, res) => {
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Add CORS headers for Vercel deployment
  try {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
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

    // Send email notification
    try {
      console.log('Attempting to send email notification');
      console.log('Using email credentials:', {
        from: process.env.EMAIL_USER || 'mathurkabir336@gmail.com',
        to: 'mathurkabir336@gmail.com'
      });
      
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
        text: `New message from ${name} (${email}, ${phone}): ${message}` // Plain text fallback
      };

      // Verify transporter before sending
      if (!transporter) {
        throw new Error('Email transporter not initialized properly');
      }

      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully:', info.messageId);
      
      return res.status(200).json({ success: true });
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Return a 200 status with error details to prevent client-side error
      // This helps in debugging while not breaking the user experience
      return res.status(200).json({ 
        success: false,
        error: 'Failed to send email', 
        details: emailError.message
      });
    }
  } catch (err) {
    console.error('Error in contact API:', err);
    return res.status(500).json({ 
      error: 'Server error processing your request.', 
      details: err.message 
    });
  }
}; 