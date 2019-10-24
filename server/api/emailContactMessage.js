const nodemailer = require('nodemailer');

const emailContactMessage = (messageObj) => {

    console.log('"'.concat(process.env.GSUITE_CLIENT_ID).concat('"'))
    console.log('"'.concat(process.env.GSUITE_PRIVATE_KEY).concat('"'))
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'william@appagetech.com',
            serviceClient: '"'.concat(process.env.GSUITE_CLIENT_ID).concat('"'),
            privateKey: '"'.concat(process.env.GSUITE_PRIVATE_KEY).concat('"'),
        }
    });

    const mailResponse = transporter.sendMail({
        from: 'william@appagetech.com',
        to: 'preston@appagetech.com, william@appagetech.com',
        subject: messageObj.subject,
        html: messageObj.html
    })
        .catch(error => console.error(error));
    return mailResponse

}

module.exports = { emailContactMessage };
