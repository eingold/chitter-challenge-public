import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import testPosts from './testData/testPosts.js';
import testUser from './testData/testUser.js';
import AddPost from '../Components/AddPost.jsx';

describe(`Tests for AddPost`, () => {

    const mockSubmitPost = jest.fn();

    jest.useFakeTimers().setSystemTime(new Date(testPosts[0].postDateCreated));

    test(`it should render a TodoForm`, () => {
        render(<AddPost />)
        const form = document.querySelector(`form`);
        expect(form).toBeTruthy();
    });

    test(`it should call mockSubmitPost when the form is submitted`, () => {

        render(<AddPost user={testUser} submitPost={mockSubmitPost} />)

        const testPost = {
            postContent: testPosts[0].postContent,
            postDateCreated: testPosts[0].postDateCreated,
            username: testPosts[0].username
        };

        const postInput = screen.getByPlaceholderText(/Post here/);

        userEvent.clear(postInput);
        userEvent.type(postInput, testPost.postContent);

        const postButton = screen.getByRole(/button/i);

        userEvent.click(postButton);

        expect(mockSubmitPost).toHaveBeenCalledTimes(1);
        expect(mockSubmitPost).toHaveBeenCalledWith(testPost);
    });

});
