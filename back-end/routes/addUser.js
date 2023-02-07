import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../user.model.js";

const router = express.Router();

const signup = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error(`Validation failed`);
            err.statusCode = 422;
            err.data = errors.array();
            throw err;
        }
    }
    catch (err) {
        return res.status(err.statusCode ?? 500).send({ message: "Registration failed", error: err.data });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 12)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err, error: [{ "msg": err }] });
            return;
        }
        user.save(err => {
            if (err) {
                res.status(500).send({ message: err, error: [{ "msg": err }] });
                return;
            }
            res.status(201).send({ message: `User was registered successfully`, user });
        });
    });
};

router.route("/").post(
    [
        body("password").exists().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).escape(),
        body("email").exists().trim().escape().normalizeEmail().isEmail(),
        body("name.firstName").exists().trim().escape(),
        body("name.lastName").exists().trim().escape(),
        body("username").exists().escape(),
        body("email").custom(async email => {
            const user = await User.find({ email: email });
            if (user.length) {
                return Promise.reject('E-mail already in use');
            }
            ;
        }),
        body("username").custom(async username => {
            const user = await User.find({ username: username });
            if (user.length) {
                return Promise.reject('Username already in use');
            }
            ;
        })
    ],
    signup);

export { router };