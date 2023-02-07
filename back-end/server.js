import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { router as getPosts } from "./routes/allPosts.js";
import { router as addPosts } from "./routes/addPost.js";
import { router as addUser } from "./routes/addUser.js";
import { router as login } from "./routes/login.js";

import https from 'https';
import fs from 'fs';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const port = process.env.PORT || 4000;
const dburi = process.env.DBURI;

const main = async () => {
    console.log(`Connecting to database at ${dburi}`);
    await mongoose.connect(dburi);
}

main().catch(e => console.log(e));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/posts", getPosts);
app.use("/posts", addPosts);
app.use("/register", addUser);
app.use("/login", login);

// const httpsOptions = {
//     key: fs.readFileSync(process.env.SERVER_KEY),
//     cert: fs.readFileSync(process.env.SERVER_CERT)
// }

//HTTPS - not currently working properly
// const server = https.createServer(httpsOptions, app).listen(port, host, () => {
//     const SERVERHOST = server.address().address;
//     const SERVERPORT = server.address().port;
//     console.log(`App listening on https://${SERVERHOST}:${SERVERPORT}`);
// });

//HTTP
const server = app.listen(port, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`App listening on http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;