const nodemailer = require('nodemailer');
const { config } = require('../config/config');

class MailService {
    constructor() { }

    async sendMail(email, subject, message) {

        const transporter = nodemailer.createTransport({
            host: config.mailHost,
            port: config.mailPort,
            secure: true,
            auth: {
                user: config.mailUser,
                pass: config.mailPassword,
            }
        });
        const info = await transporter.sendMail({
            from: config.mailUser,
            to: email,
            subject: subject,
            // text: message,
            html: message,
        });
        return info;
    }

}

module.exports = MailService;
