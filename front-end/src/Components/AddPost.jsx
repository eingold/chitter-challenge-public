import { useState, useEffect } from "react";
import { Post } from "../utils/post.model.js";

const AddPost = ({ submitPost, user }) => {

    const [postContent, setPostContent] = useState("");
    const [postLengthWarning, setPostLengthWarning] = useState("length-ok")

    const handleSubmit = (event) => {
        event.preventDefault();
        const postToSubmit = new Post(postContent, new Date().toISOString(), Object.keys(user).length > 0 ? user.username : "");
        submitPost(postToSubmit);
        setPostContent("");
    }

    useEffect(() => {
        if (postContent.length > 500) setPostLengthWarning("my-1 text-end length-warning");
        else setPostLengthWarning("my-1 text-end length-ok");
    }, [postContent])


    return (
        <div className="mb-2">
            <form>
                <input className="form-control" type="text" id="postContent" name="postContent" placeholder="Post here" onChange={event => setPostContent(event.target.value)} value={postContent} />
                {postContent.length > 0 && <p className={postLengthWarning}>{`${postContent.length}/500`}</p>}
                <button onClick={handleSubmit} className="btn btn-large btn-addPost btn-block w-100" disabled={postContent.length === 0 || postContent.length > 500} ><span>Post</span></button>
            </form>
        </div>
    );
};

export default AddPost;