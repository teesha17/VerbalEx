const nodemailer = require("nodemailer");

console.log("Starting email send...");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

console.log("Transporter created");

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "recipient@example.com",  // <-- replace with your email
    subject: "GitHub Repo Updated",
    text: "The code has been updated!",
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("❌ Error sending mail:", error);
    } else {
        console.log("✅ Email sent:", info.response);
    }
});
