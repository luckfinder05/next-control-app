import dbConnect from '../lib/mongooseConnect'
import { User } from "../models/User";
import { Role } from "../models/Role";

const bcrypt = require('bcryptjs');
import { check, validationResult } from 'express-validator';


function initMiddleware(middleware) {
    return (req, res) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result)
                }
                return resolve(result)
            })
        })
}
function validateMiddleware(validations, validationResult) {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        res.status(422).json({ errors: errors.array() })
    }
}

const validateBody = initMiddleware(
    validateMiddleware([
        check('username', 'Имя пользователя не может быть пустым').notEmpty(),
        check('email', 'Неверный формат email').isEmail(),
        check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min: 4, max: 10 })
    ], validationResult)
)

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

export async function getUsers() {
    try {
        await dbConnect();
        const users = await User.find({});
        console.log('users: ', users);
        if (users) return users;
    }
    catch (err) {
        console.error(err);
    }
    return
}

export async function addUser(req, res) {

    try {
        await dbConnect();

        await validateBody(req, res)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Ошибка при регистрации", errors });
        }
        const { username, email, password, role } = req.body;

        if (await isCandidateAlreadyExists({ username }) || await isCandidateAlreadyExists({ email })) {
            return res.status(400).json({ message: "Пользователь с такими данными уже существует" });
        }
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        const userRole = await Role.findOne({ value: role || "USER" });
        const user = new User({ username, email, password: passwordHash, roles: [userRole.value] });
        await user.save();
        return res.status(200).json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
        console.dir(e);
        res.status(400).json({
            message: 'Registration error',
            msg: e
        });
    }
}

export async function removeUser(req, res) {
    try {
        const { id } = req.body;
        await dbConnect();
        const users = await User.deleteOne({ _id: id });
        if (users) return res.status(200).json({ message: "User was deleted" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error on deleting user" });
    }
    return
}