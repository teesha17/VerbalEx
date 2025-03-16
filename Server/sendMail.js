const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail", // or your preferred service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "teeshakakkar2004@gmail.com",  // replace with actual recipient email
    subject: "Code Updated on GitHub",
    text: "The code in the repository has been updated. Check it out!",
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error("Error while sending mail:", error);
    }
    console.log("Email sent:", info.response);
});
