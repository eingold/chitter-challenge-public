import Post from "../post.model.js";
import User from "../user.model.js";

import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";

import server from "../server.js";
import testPosts from "./testData/testPosts.js";
import testUser from "./testData/testUser.js";
import { compareSync } from "bcrypt";

chai.use(chaiHttp);

const testServer = chai.request(server).keepOpen();

beforeEach(async () => {
    try {
        await Post.deleteMany();
        await User.deleteMany();
    } catch (error) {
        console.log("Error clearing database");
        throw new Error();
    };
    try {
        await Post.insertMany(testPosts);
    } catch (error) {
        console.log("Error inserting into database");
        throw new Error();
    };
});

describe("/GET posts", () => {
    it("should return all of the posts as an array", async () => {
        const res = await testServer
            .get("/posts")
            .send();

        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(testPosts.length);
    });
});

describe("/POST create a post", () => {
    it("should not create a post without a content field", async () => {
        let post = {
            postDateCreated: "2022-11-01T00:00:00.000Z",
            username: "Username"
        };

        const res = await testServer
            .post("/posts")
            .send(post);

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.be.eql("There were errors in the post data");
        expect(res.body.error[0]).to.have.property("param", "postContent");
    });

    it("should not create a post without a date created field", async () => {
        let post = {
            postContent: "Post with no date",
            username: "Username"
        };

        const res = await testServer
            .post("/posts")
            .send(post);

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.be.eql("There were errors in the post data");
        expect(res.body.error[0]).to.have.property("param", "postDateCreated");
    });

    it("should create a blank username field if one is not supplied", async () => {
        let post = {
            postContent: "A test post",
            postDateCreated: "2022-11-01T00:00:00.000Z",
        };

        const res = await testServer
            .post("/posts")
            .send(post)

        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.post).to.have.property("username", "");
    });

    it("should create a post that is properly formed", async () => {
        let post = {
            postContent: "A test post",
            postDateCreated: "2022-11-01T00:00:00.000Z",
            username: "Username"
        };

        const res = await testServer
            .post("/posts")
            .send(post)

        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.post).to.have.property("postContent", post.postContent);
    });
});

describe("Registration tests", () => {
    it("should not allow sign up with missing first name", async () => {
        let user = {
            name: {
                lastName: testUser.name.lastName
            },
            email: testUser.email,
            username: testUser.username,
            password: testUser.password
        };

        const res = await testServer
            .post("/register")
            .send(user)

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.be.eql("Registration failed");
        expect(res.body.error[0]).to.have.property("param", "name.firstName");
    });

    it("should not allow sign up with missing last name", async () => {
        let user = {
            name: {
                firstName: testUser.name.firstName
            },
            email: testUser.email,
            username: testUser.username,
            password: testUser.password
        };

        const res = await testServer
            .post("/register")
            .send(user)

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.be.eql("Registration failed");
        expect(res.body.error[0]).to.have.property("param", "name.lastName");
    });

    it("should not allow sign up with missing email", async () => {
        let user = {
            name: {
                firstName: testUser.name.firstName,
                lastName: testUser.name.lastName
            },
            username: testUser.username,
            password: testUser.password
        };

        const res = await testServer
            .post("/register")
            .send(user)

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.be.eql("Registration failed");
        expect(res.body.error[0]).to.have.property("param", "email");
    });

    it("should not allow sign up with missing username", async () => {
        let user = {
            name: {
                firstName: testUser.name.firstName,
                lastName: testUser.name.lastName
            },
            email: testUser.email,
            password: testUser.password
        };

        const res = await testServer
            .post("/register")
            .send(user)

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.be.eql("Registration failed");
        expect(res.body.error[0]).to.have.property("param", "username");
    });

    it("should not allow sign up with missing password", async () => {
        let user = {
            name: {
                firstName: testUser.name.firstName,
                lastName: testUser.name.lastName
            },
            username: testUser.username,
            email: testUser.email
        };

        const res = await testServer
            .post("/register")
            .send(user)

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.be.eql("Registration failed");
        expect(res.body.error[0]).to.have.property("param", "password");
    });

    it("should not allow sign up with a password with no capital letters", async () => {
        let user = {
            name: {
                firstName: testUser.name.firstName,
                lastName: testUser.name.lastName
            },
            username: testUser.username,
            email: testUser.email,
            password: "password123"
        };

        const res = await testServer
            .post("/register")
            .send(user)

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.be.eql("Registration failed");
        expect(res.body.error[0]).to.have.property("param", "password");
    });

    it("should not allow sign up with a password with no lowercase letters", async () => {
        let user = {
            name: {
                firstName: testUser.name.firstName,
                lastName: testUser.name.lastName
            },
            username: testUser.username,
            email: testUser.email,
            password: "PASSWORD123"
        };

        const res = await testServer
            .post("/register")
            .send(user)

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.be.eql("Registration failed");
        expect(res.body.error[0]).to.have.property("param", "password");
    });

    it("should not allow sign up with a password with no numbers", async () => {
        let user = {
            name: {
                firstName: testUser.name.firstName,
                lastName: testUser.name.lastName
            },
            username: testUser.username,
            email: testUser.email,
            password: "Password"
        };

        const res = await testServer
            .post("/register")
            .send(user)

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.be.eql("Registration failed");
        expect(res.body.error[0]).to.have.property("param", "password");
    });

    it("should not allow sign up with a password less than 8 characters", async () => {
        let user = {
            name: {
                firstName: testUser.name.firstName,
                lastName: testUser.name.lastName
            },
            username: testUser.username,
            email: testUser.email,
            password: "Pword12"
        };

        const res = await testServer
            .post("/register")
            .send(user)

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.be.eql("Registration failed");
        expect(res.body.error[0]).to.have.property("param", "password");
    });

    it("should allow sign up with valid data", async () => {
        let user = {
            name: {
                firstName: testUser.name.firstName,
                lastName: testUser.name.lastName
            },
            username: testUser.username,
            email: testUser.email,
            password: testUser.password
        };

        const res = await testServer
            .post("/register")
            .send(user)

        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.user).to.have.property("username", user.username);
    });

    it("should not store passwords in plaintext", async () => {
        let user = {
            name: {
                firstName: testUser.name.firstName,
                lastName: testUser.name.lastName
            },
            username: testUser.username,
            email: testUser.email,
            password: testUser.password
        };

        const res = await testServer
            .post("/register")
            .send(user)

        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.user.password).to.not.equal(user.password);
        expect(compareSync(user.password, res.body.user.password)).to.be.true;
    });

    it("should not allow signing up twice", async () => {

        let res = await testServer
            .post("/register")
            .send(testUser)

        res = await testServer
            .post("/register")
            .send(testUser)

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.be.eql("Registration failed");
        expect(res.body.error[0]).to.contain({ "msg": "E-mail already in use" });
        expect(res.body.error[1]).to.contain({ "msg": "Username already in use" });
    });
});

describe("Login tests", () => {

    it("should not allow login attempt with missing username or email", async () => {
        let login = {
            password: testUser.password
        };

        const res = await testServer
            .post("/login")
            .send(login)

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.equal("There were errors in the login data");
        expect(res.body.error[0]).to.have.property("param", "login");
    });

    it("should not allow login attempt with missing password", async () => {
        let login = {
            login: testUser.username
        };

        const res = await testServer
            .post("/login")
            .send(login)

        expect(res).to.have.status(422);
        expect(res).to.have.property("error");
        expect(res.body.message).to.equal("There were errors in the login data");
        expect(res.body.error[0]).to.have.property("param", "password");
    });

    it("should not allow login attempt with incorrect username", async () => {
        let login = {
            login: "Wrong username",
            password: testUser.password
        };

        await testServer
            .post("/register")
            .send(testUser)

        const res = await testServer
            .post("/login")
            .send(login)

        expect(res).to.have.status(404);
        expect(res.body.message).to.equal("User not found");
    });

    it("should not allow login attempt with incorrect password", async () => {
        let login = {
            login: testUser.username,
            password: "Wrong password"
        };

        await testServer
            .post("/register")
            .send(testUser)

        const res = await testServer
            .post("/login")
            .send(login)

        expect(res).to.have.status(403);
        expect(res.body.message).to.equal("Password not correct");
    });

    it("should allow login attempt with correct username and password", async () => {
        let login = {
            login: testUser.username,
            password: testUser.password
        };

        await testServer
            .post("/register")
            .send(testUser)

        const res = await testServer
            .post("/login")
            .send(login)

        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.user).to.have.property("username", login.login);
    });

    it("should also allow login attempt with correct email and password", async () => {
        let login = {
            login: testUser.email,
            password: testUser.password
        };

        await testServer
            .post("/register")
            .send(testUser)

        const res = await testServer
            .post("/login")
            .send(login)

        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.user).to.have.property("email", login.login);
    });
});