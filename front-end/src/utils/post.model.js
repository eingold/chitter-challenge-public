class Post {
    constructor(postContent, postDateCreated, username = "") {
        this.postContent = postContent;
        this.postDateCreated = postDateCreated;
        this.username = username;
    }
}

export { Post };