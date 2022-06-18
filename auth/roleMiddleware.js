'use strict';

const jwt = require('jsonwebtoken');
// const keys = require('../config/auth-config');

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            // const token = req.headers.authorization.split(' ')[1];
            const token = req.cookies['user-token'];
            if (!token) {
                // return res.status(403).json({ message: "Пользователь не авторизован" });
                return res.status(403).redirect('/auth');

            }

            const { roles: userRoles } = jwt.verify(token, process.env.NEXTAUTH_SECRET);
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(403).json({ message: "У вас нет прав доступа" });
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({ message: "Пользователь не авторизован" });
        }
    };
};