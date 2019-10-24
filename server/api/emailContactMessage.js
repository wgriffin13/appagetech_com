const nodemailer = require('nodemailer');

const emailContactMessage = (messageObj) => {

    const privateKey = process.env.GSUITE_PRIVATE_KEY.replace(new RegExp('\\\\n', '\g'), '\n') 
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'info@appagetech.com',
            serviceClient: process.env.GSUITE_CLIENT_ID,
            privateKey: privateKey,
        }
    });

    const mailResponse = transporter.sendMail({
        from: 'info@appagetech.com',
        to: 'preston@appagetech.com, william@appagetech.com',
        subject: messageObj.subject,
        html: messageObj.html
    })
        .catch(error => console.error(error));
    return mailResponse

}

module.exports = { emailContactMessage };
