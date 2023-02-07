import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import testUser from './testData/testUser.js';
import Login from '../Components/Login.jsx';
import axiosMock from "axios";
import { act } from 'react-dom/test-utils';

jest.mock("axios");

describe('Login tests', () => {
    let loginInput;
    let passwordInput;
    let loginButton;

    const mockSetUser = jest.fn();

    const resolvedRequestWithData = { data: { user: testUser }, status: 200 };

    beforeEach(async () => {
        const routes = [
            {
                path: "/login",
                element: <Login setUser={mockSetUser} />
            },
            {
                path: "/",
                element: <p>Redirected</p>
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: [`/login`],
            initialIndex: 0
        });

        render(<RouterProvider router={router} />);

        loginInput = screen.getByPlaceholderText("Username or email");
        passwordInput = screen.getByPlaceholderText("Your password");
        loginButton = await screen.getByDisplayValue("Login");

        axiosMock.post.mockResolvedValueOnce(resolvedRequestWithData);
    });

    test('should render a form', () => {
        const form = document.querySelector(`form`);
        expect(form).toBeTruthy();
    })

    test('should allow logging in with correct username and password', async () => {
        userEvent.clear(loginInput);
        userEvent.type(loginInput, testUser.username);
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, testUser.password);
        await act(async () => { userEvent.click(loginButton) });

        expect(mockSetUser).toHaveBeenCalledTimes(1);
        expect(mockSetUser).toHaveBeenCalledWith(testUser);
    })

    test('should also allow logging in with correct email and password', async () => {
        userEvent.clear(loginInput);
        userEvent.type(loginInput, testUser.email);
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, testUser.password);
        await act(async () => { userEvent.click(loginButton) });

        expect(mockSetUser).toHaveBeenCalledTimes(1);
        expect(mockSetUser).toHaveBeenCalledWith(testUser);
    })

    test('should not allow logging in with missing login detail', async () => {
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, testUser.password);
        await act(async () => { userEvent.click(loginButton) });

        expect(mockSetUser).toHaveBeenCalledTimes(0);
    })

    test('should not allow logging in with missing password', async () => {
        userEvent.clear(loginInput);
        userEvent.type(loginInput, testUser.password);
        await act(async () => { userEvent.click(loginButton) });

        expect(mockSetUser).toHaveBeenCalledTimes(0);
    })

    test('should redirect to / after successfully logging in', async () => {
        userEvent.clear(loginInput);
        userEvent.type(loginInput, testUser.email);
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, testUser.password);
        await act(async () => { userEvent.click(loginButton) });

        const redirect = screen.getByText(/Redirected/);

        expect(redirect).toBeInTheDocument();
    })

})