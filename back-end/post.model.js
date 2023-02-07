import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postContent: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 500
    },
    postDateCreated: {
        type: Date,
        default: Date.now,
        required: true
    },
    username: {
        type: String
    }
});

export default mongoose.model(`Post`, postSchema);