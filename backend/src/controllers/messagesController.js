import pool from '../config/db.js';
import nodemailer from 'nodemailer';

// Extensible email sending feature
const sendEmailAlert = async (name, email, subject, message) => {
  const { EMAIL_USER, EMAIL_PASS, NOTIFICATION_EMAIL } = process.env;

  // Gracefully skip if credentials are not configured
  if (!EMAIL_USER || !EMAIL_PASS || !NOTIFICATION_EMAIL) {
    console.log(`[Email Notification Skipped] SMTP environment variables are not fully configured.
      To enable, set EMAIL_USER, EMAIL_PASS, and NOTIFICATION_EMAIL in your .env.
      Message summary:
      From: ${name} <${email}>
      Subject: ${subject}
      Body: ${message}`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another provider
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Portfolio Contact <${EMAIL_USER}>`,
      to: NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `New Portfolio Message: ${subject}`,
      html: `
        <h3>You received a new message from your portfolio website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; padding: 10px; background-color: #f5f5f5; border-radius: 4px;">${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email alert notification sent successfully.');
  } catch (error) {
    console.error('Failed to send email alert:', error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

export const addMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, subject, message]
    );

    // Fire email alert asynchronously (don't block HTTP response)
    sendEmailAlert(name, email, subject, message);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error saving message' });
  }
};
