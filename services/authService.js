const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const UserService = require('./usersServices');
const MailService = require('./mailService');
const { config } = require('../config/config');

const userService = new UserService();
const mailService = new MailService();

class AuthService {
    constructor() { }

    async getUser(email, password) {
        const user = await userService.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return user;
    }

    async getProfile(id) {
        const user = await userService.findOne(id);
        delete user.dataValues.password;
        delete user.dataValues.recoveryToken;  
        delete user.dataValues.createdAt;
        if (!user.customer) {
            delete user.dataValues.customer;        
        }      
        if (!user.specialist) {
            delete user.dataValues.specialist;        
        }      
        return user; 
    }

    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role,
        }
        const token = jwt.sign(payload, config.jwtSecret)
        return { user, token };
    }

    async sendRecovery(email) {
        const user = await userService.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        const payload = { sub: user.id, };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
        const link = `${config.frontendUrl}/recovery/change-password?token=${token}`;
        await userService.update(user.id, { recoveryToken: token });
        const htmlMessage = `<b>Hi!</b><br>Click on the link to recover your password<br><a href="${link}">Recover password</a>`;
        await mailService.sendMail(email, 'Password recovery', htmlMessage);
        return { message: 'Email sent' };
    }

    async changePassword(token, newPassword) {
        try {
            const payload = jwt.verify(token, config.jwtSecret);
            const user = await userService.findOne(payload.sub);
            if (user.recoveryToken !== token) {
                throw boom.unauthorized();
            }
            console.log(token, newPassword);
            await userService.update(user.id, { recoveryToken: null, password: newPassword });
            return { message: 'Password changed' };
        }
        catch (error) {
            throw boom.unauthorized();
        }

    }


}

module.exports = AuthService;
