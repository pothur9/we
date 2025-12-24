var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var Lead = require('../models/Lead');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chowdaryp697@gmail.com',
    pass: 'bxqbwtfsarifmdia'
  }
});

// Function to send email notification
async function sendLeadNotification(lead) {
  const mailOptions = {
    from: 'chowdaryp697@gmail.com',
    to: 'chowdaryp697@gmail.com',
    subject: `🎓 New Lead: ${lead.name} - ${lead.course}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #2A8EA0 0%, #010066 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">🎓 New Lead Received!</h1>
        </div>
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333; border-bottom: 2px solid #2A8EA0; padding-bottom: 10px;">Lead Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">Name:</td>
              <td style="padding: 10px; color: #333;">${lead.name}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Phone:</td>
              <td style="padding: 10px; color: #333;"><a href="tel:${lead.phone}" style="color: #2A8EA0;">${lead.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">Course:</td>
              <td style="padding: 10px; color: #333;">${lead.course}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Date:</td>
              <td style="padding: 10px; color: #333;">${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; text-align: center;">
            <a href="https://wa.me/91${lead.phone}" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">
              📱 Contact on WhatsApp
            </a>
          </div>
        </div>
        <div style="padding: 15px; text-align: center; color: #888; font-size: 12px;">
          <p>This is an automated notification from We For Uni</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Lead notification email sent successfully');
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
}

// POST /api/leads - Create a new lead
router.post('/', async function(req, res) {
  try {
    const { name, phone, course } = req.body;

    // Validate required fields
    if (!name || !phone || !course) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, phone, and course are required' 
      });
    }

    // Validate phone number (10 digits)
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid 10-digit phone number' 
      });
    }

    // Create new lead
    const lead = new Lead({
      name: name.trim(),
      phone: phone.trim(),
      course
    });

    await lead.save();

    // Send email notification (don't wait for it)
    sendLeadNotification(lead);

    res.status(201).json({ 
      success: true, 
      message: 'Lead submitted successfully',
      data: lead 
    });

  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save lead. Please try again.' 
    });
  }
});

// GET /api/leads - Get all leads (for admin)
router.get('/', async function(req, res) {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, data: leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch leads' 
    });
  }
});

module.exports = router;
