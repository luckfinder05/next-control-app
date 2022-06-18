'use strict';

const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./authMiddleware');
const roleMiddleware = require('./roleMiddleware');


router.post('/register', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('email', 'Неверный формат email').isEmail(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min: 4, max: 10 })],
    controller.signUp);
router.post('/login', controller.signIn);
router.get('/signout', controller.signOut);
// router.get('/users', authMiddleware, controller.getUsers);
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);
router.get('/confirmmail', controller.confirmMail);
router.get('/', async (req, res, next) => {
    res.send(`<h1>Hi,\${username}! User registration is not implemented yet</h1> <br>`);
    next();

});

module.exports = router;