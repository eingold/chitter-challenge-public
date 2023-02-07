import { render, screen } from '@testing-library/react';
import Post from '../Components/Post.jsx';
import { Post as PostModel } from '../utils/post.model.js';

const testPostContent = "Test post content";
const testPostDateCreated = "2022-12-01T00:00:00.000Z";
const testPostUsername = "Username";

describe("Post test suite", () => {
    const testPost = new PostModel(testPostContent, testPostDateCreated, testPostUsername);
    const testPostNoUsername = new PostModel(testPostContent, testPostDateCreated);

    test("it should render the content and date created of the post", () => {

        const date = new Date(testPostDateCreated).toLocaleString("en-GB");

        render(<Post post={testPost} />);

        expect(screen.getByText(testPostContent)).toBeInTheDocument();
        expect(screen.getByText(`Posted on ${date}`)).toBeInTheDocument();
    });

    test("it should render the username if the post is supplied with one", () => {

        render(<Post post={testPost} />);

        expect(screen.getByText(`Posted by ${testPostUsername}`)).toBeInTheDocument();
    });

    test('should not render a "Posted by" element if no username is supplied', () => {

        render(<Post post={testPostNoUsername} />);

        expect(screen.queryByText(/Posted by/)).toBeNull();
    })
});