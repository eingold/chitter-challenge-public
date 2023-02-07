import express from "express";
import User from "../user.model.js";
import { check, validationResult } from "express-validator";
import { Error } from "mongoose";
import { compareSync } from "bcrypt";

const router = express.Router();

router.route("/").post(
    [
        check("login").exists().escape(),
        check("password").exists().escape()
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                'message': `There were errors in the login data`,
                'error': errors.array()
            });
        }
        const login = req.body.login;
        const password = req.body.password;
        User.findOne({ $or: [{ email: login }, { username: login }] }).then(user => {
            if (user) {
                if (compareSync(password, user.password)) {
                    res.status(200).json({ message: "Login successful", user });
                } else {
                    const error = new Error;
                    error.statusCode = 403;
                    error.message = ("Password not correct");
                    throw error;
                }
            } else {
                const error = new Error;
                error.statusCode = 404;
                error.message = ("User not found");
                throw error;
            }
        }).catch(error => {
            res.status(error.statusCode ?? 500).send({ message: error.message, error: [{ "msg": error.message }] });
        });
    });

export { router };