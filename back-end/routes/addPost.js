import express from "express";
import Post from "../post.model.js";
import { check, body, validationResult } from "express-validator";

const router = express.Router();

router.route("/").post(
    [
        check("postContent").exists().isLength({ min: 1, max: 500 }),
        check("postDateCreated").exists().isISO8601(),
        body("postContent").escape(),
        body("username").escape()
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                'message': `There were errors in the post data`,
                'error': errors.array()
            });
        }
        const post = new Post(req.body);
        post.save()
            .then(post => {
                res.status(201).json({ 'message': `Post added`, post });
            })
            .catch(err => {
                res.status(400).json({
                    'message': `Post unsuccessful`,
                    'error': err
                });
            });
    });

export { router };