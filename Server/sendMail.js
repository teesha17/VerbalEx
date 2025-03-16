const nodemailer = require("nodemailer");

const sendMail = async (commitMessage) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "teeshakakkar2004@gmail.com",  // Replace with your email
        subject: "🚀 New Commit Pushed",
        text: `New commit made:\n\n${commitMessage}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);
    } catch (error) {
        console.error("❌ Error sending mail:", error);
        process.exit(1);  // Fail the CI if mail fails
    }
};

// Get commit message from CLI arg
const commitMessage = process.argv[2] || "No commit message provided.";
sendMail(commitMessage);
