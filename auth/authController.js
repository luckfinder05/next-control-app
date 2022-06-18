'use strict';
const User = require('./user');
const Role = require('./roles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const USER_TOKEN = 'user-token';

// const keys = require('../config/auth-config');
const { validationResult, body } = require('express-validator');
// const confirmMail = require('../utils/mailer');

// const errorHandler = require('../utils/errorHandler');

const generateAccessToken = (id, username, roles) => {
    const payLoad = {
        id,
        username,
        roles
    };
    return jwt.sign(payLoad, process.env.NEXTAUTH_SECRET, { expiresIn: "24h" });
};

async function isCandidateAlreadyExists(field) {
    try {
        const candidate = await User.findOne(field);
        if (candidate) {
            return true;
        }
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

class authController {
    async signUp(req, res) {
        try {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ message: "Ошибка при регистрации", errors });
            // }
            // const { username, email, password } = req.body;

            // if (await isCandidateAlreadyExists({ username }) || await isCandidateAlreadyExists({ email })) {
            //     return res.status(400).json({ message: "Пользователь с такими данными уже существует" });
            // }

            // const salt = bcrypt.genSaltSync(10);
            // const passwordHash = bcrypt.hashSync(password, salt);
            // const userRole = await Role.findOne({ value: "USER" });
            // console.log('userRole: ', userRole);
            // // confirmCode = 
            // console.log('userRole.value: ', userRole.value);
            // const user = new User({ username, email, password: passwordHash, roles: [userRole.value] });
            // await user.save();
            // // await confirmMail(email);
            // return res.json({ message: "Пользователь успешно зарегистрирован" });
            return res.status(500).send('<h1>Unavailable</h1>');
        } catch (e) {
            console.dir(e);
            res.status(400).json({
                message: 'Registration error',
                msg: e
            });
        }
    }
    async confirmMail(req, res) {
        return res.status(200).redirect('/');
    }
    async signIn(req, res) {
        console.log('signIn controller');
        try {
            const { username, password, returnUrl } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: `Введён неверный пароль` });
            }

            const token = generateAccessToken(user._id, username, user.roles);

            res.cookie("user-token", token, { secure: true, httpOnly: true, maxAge: 10 * 60000 });
            res.status(200);
            res.json({ id: user._id, username: username, isLoggedIn: true, returnUrl });
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Login error'
            });
        }
    }
    async signOut(req, res) {
        console.log('sign out');
        res.cookie(USER_TOKEN, '', { expires: new Date(1) });
        return res.redirect('/auth/login');
    }
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.send(users);
        } catch (e) {
            console.error(e);
        }
    }
    async createRoles(req, res) {
        const userRole = new Role();
        const adminRole = new Role({
            value: "ADMIN"
        });
        await userRole.save();
        await adminRole.save();
    }
}

module.exports = new authController();