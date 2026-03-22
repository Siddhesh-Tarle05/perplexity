import nodemailer from 'nodemailer';
import dotenv from'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,       // make sure this matches the "from" email
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    }
});

// Verify connection
transporter.verify()
    .then(() => console.log('Email server is ready to send messages'))
    .catch(err => console.error('Error connecting to email server:', err));

// Send email function
const sendEmail = async ({ to, subject, text, html }) => {
     console.log(process.env.GOOGLE_USER, process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REFRESH_TOKEN);
    const mailOptions = {
        from: process.env.GOOGLE_USER,  // same as OAuth2 user
        to,
        subject,
        text, 
        html
    };
    console.log(mailOptions)

    try {
        const details = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', details.response);
        return details;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendEmail;