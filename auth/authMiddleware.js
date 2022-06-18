'use strict';

const jwt = require('jsonwebtoken');
// const keys = require('../config/auth-config');


module.exports = function (req, res, next) {
    console.log('AUTH MIDDLEWARE');
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        // const token = req.headers.authorization.split(' ')[1];
        const token = req.cookies['user-token'];
        console.log('token: ', token);
        if (!token) {
            // return res.status(403).json({ message: "Пользователь не авторизован" });
            return res.status(403).redirect(`/auth/login?returnUrl=${req.url}`);


        }
        const decodedData = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        req.user = decodedData;
        next();

    } catch (e) {
        console.log('e: ', e);
        return res.status(403).json({ message: "Ошибка", error: e });
        // return res.status(403).redirect('auth/login');
    }
};