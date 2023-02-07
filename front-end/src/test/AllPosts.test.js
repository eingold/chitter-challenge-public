import { render, screen } from '@testing-library/react';
import AllPosts from '../Components/AllPosts.jsx';
import testPosts from './testData/testPosts.js';

describe('AllPosts tests', () => {

    test(`it should render the correct number of Post components based on the post array supplied`, () => {

        const testPostsLength = testPosts.length;

        render(<AllPosts posts={testPosts} />);

        const numberOfRows = screen.getAllByText(/Test post/).length;

        expect(numberOfRows).toBe(testPostsLength);
        expect(screen.getAllByText(/Test post/)[0]).toHaveTextContent("Test post 2");
    });

    test(`it should sort the posts in reverse chronological order`, () => {

        render(<AllPosts posts={testPosts} />);

        const posts = screen.getAllByText(/Test post/)
        expect(posts[0].textContent > posts[1].textContent).toBeTruthy();
    });
});