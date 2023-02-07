import express from "express";
import { body } from "express-validator";
import Post from "../post.model.js";

const router = express.Router();

router.use(express.json());

router.route("/").get(
    (req, res) => {
        Post.find((error, posts) => {
            if (error) {
                return res.status(404).send("Not found");
            }
            return res.type("json").send(JSON.stringify(posts, null, '\t'));
        });
    });

export { router };