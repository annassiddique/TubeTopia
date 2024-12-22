const nodemailer = require("nodemailer");
const cron = require("node-cron");
const User = require("../models/User");

// Create a transporter object using SMTP for sending emails (configured for Gmail in this case)
const transporter = nodemailer.createTransport({
  service: "gmail", // Using email provider 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Email template function that generates the email content
const generateEmailTemplate = (userName) => `
    <div style="font-family: 'Roboto', sans-serif; text-align: center; padding: 20px; border: 2px dashed #222831; border-radius: 15px;  margin: auto; background: linear-gradient(to bottom right, #eee, #cecfd1);">
    <h1 style="color: #222831; font-size: 28px; margin-bottom: 10px;">Hello ${userName} 👋</h1>
    <p style="font-size: 18px; color: #444; margin-bottom: 20px;">
    It's voting o'clock! ⏰ Let your voice echo across the board—your community needs you!
    </p>
    <a href="${process.env.VOTE_URL}" 
    style="display: inline-block; background-color: #222831; color: #fff; padding: 12px 30px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 25px; transition: background-color 0.3s ease;">
    Cast Your Vote Now 🚀
    </a>
    <p style="font-size: 14px; color: #777; margin-top: 25px;">
    Not sure what this is? No worries! Feel free to ignore this email.
    </p>
    <footer style="margin-top: 30px; font-size: 12px; color: #aaa;">
    <hr style="border: none; border-top: 1px solid #222831; margin: 20px 0;font-style: italic;">
    © ${new Date().getFullYear()} VoteTopia | All rights reserved.
    </footer>
    </div>
`;

// Function to send reminder emails to all users
const sendEmailsToAllUsers = async () => {
  try {
    const users = await User.find(); // Fetch all users from the database

    // Send an email to each user
    users.forEach(async (user) => {
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: "Time to Cast Your Vote! 🗳️",
        html: generateEmailTemplate(user.name || "User"), // Use generated email template
      };

      await transporter.sendMail(mailOptions); 
      console.log(`Email sent to ${user.email}`);
    });
  } catch (error) {
    console.error("Error sending emails:", error.message); 
  }
};

// Cron job that runs every 4 hours to send reminder emails
cron.schedule("0 0 */4 * *", () => {
  console.log("Running email reminder job...");
  sendEmailsToAllUsers(); // Trigger the email sending function
});

module.exports = { sendEmailsToAllUsers };
