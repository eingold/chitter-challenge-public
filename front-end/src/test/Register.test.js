import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import testUser from './testData/testUser.js';
import Register from '../Components/Register.jsx';
import axiosMock from "axios";
import { act } from 'react-dom/test-utils';

jest.mock("axios");

describe('Register tests', () => {
    let firstNameInput;
    let lastNameInput;
    let emailInput;
    let usernameInput;
    let passwordInput;
    let confirmPasswordInput;
    let registerButton;

    const mockSetUser = jest.fn();

    const resolvedRequestWithData = { data: { user: testUser }, status: 201 };

    beforeEach(async () => {
        const routes = [
            {
                path: "/register",
                element: <Register setUser={mockSetUser} />
            },
            {
                path: "/",
                element: <p>Redirected</p>
            }
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: [`/register`],
            initialIndex: 0
        });

        render(<RouterProvider router={router} />);

        firstNameInput = screen.getByPlaceholderText("Your first name");
        lastNameInput = screen.getByPlaceholderText("Your last name");
        emailInput = screen.getByPlaceholderText("Your email");
        usernameInput = screen.getByPlaceholderText("Your username");
        passwordInput = screen.getByPlaceholderText("Your password");
        confirmPasswordInput = screen.getByPlaceholderText("Re-enter your password");
        registerButton = await screen.getByDisplayValue("Register");

        axiosMock.post.mockResolvedValueOnce(resolvedRequestWithData);
    });

    test('should render a form', () => {
        const form = document.querySelector(`form`);
        expect(form).toBeTruthy();
    })

    test('should allow signing up with correct data', async () => {
        userEvent.clear(firstNameInput);
        userEvent.type(firstNameInput, testUser.name.firstName);
        userEvent.clear(lastNameInput);
        userEvent.type(lastNameInput, testUser.name.lastName);
        userEvent.clear(emailInput);
        userEvent.type(emailInput, testUser.email);
        userEvent.clear(usernameInput);
        userEvent.type(usernameInput, testUser.username);
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, testUser.password);
        userEvent.clear(confirmPasswordInput);
        userEvent.type(confirmPasswordInput, testUser.password);
        await act(async () => { userEvent.click(registerButton) });

        expect(mockSetUser).toHaveBeenCalledTimes(1);
        expect(mockSetUser).toHaveBeenCalledWith(testUser);
    })

    test('should not allow signing up with missing first name', async () => {
        userEvent.clear(lastNameInput);
        userEvent.type(lastNameInput, testUser.name.lastName);
        userEvent.clear(emailInput);
        userEvent.type(emailInput, testUser.email);
        userEvent.clear(usernameInput);
        userEvent.type(usernameInput, testUser.username);
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, testUser.password);
        userEvent.clear(confirmPasswordInput);
        userEvent.type(confirmPasswordInput, testUser.password);
        await act(async () => { userEvent.click(registerButton) });

        expect(mockSetUser).toHaveBeenCalledTimes(0);
    })

    test('should not allow signing up with missing last name', async () => {
        userEvent.clear(firstNameInput);
        userEvent.type(firstNameInput, testUser.name.firstName);
        userEvent.clear(emailInput);
        userEvent.type(emailInput, testUser.email);
        userEvent.clear(usernameInput);
        userEvent.type(usernameInput, testUser.username);
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, testUser.password);
        userEvent.clear(confirmPasswordInput);
        userEvent.type(confirmPasswordInput, testUser.password);
        await act(async () => { userEvent.click(registerButton) });

        expect(mockSetUser).toHaveBeenCalledTimes(0);
    })

    test('should not allow signing up with missing email', async () => {
        userEvent.clear(firstNameInput);
        userEvent.type(firstNameInput, testUser.name.firstName);
        userEvent.clear(lastNameInput);
        userEvent.type(lastNameInput, testUser.name.lastName);
        userEvent.clear(usernameInput);
        userEvent.type(usernameInput, testUser.username);
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, testUser.password);
        userEvent.clear(confirmPasswordInput);
        userEvent.type(confirmPasswordInput, testUser.password);
        await act(async () => { userEvent.click(registerButton) });

        expect(mockSetUser).toHaveBeenCalledTimes(0);
    })

    test('should not allow signing up with missing username', async () => {
        userEvent.clear(firstNameInput);
        userEvent.type(firstNameInput, testUser.name.firstName);
        userEvent.clear(lastNameInput);
        userEvent.type(lastNameInput, testUser.name.lastName);
        userEvent.clear(emailInput);
        userEvent.type(emailInput, testUser.email);
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, testUser.password);
        userEvent.clear(confirmPasswordInput);
        userEvent.type(confirmPasswordInput, testUser.password);
        await act(async () => { userEvent.click(registerButton) });

        expect(mockSetUser).toHaveBeenCalledTimes(0);
    })

    test('should not allow signing up with missing password', async () => {
        userEvent.clear(firstNameInput);
        userEvent.type(firstNameInput, testUser.name.firstName);
        userEvent.clear(lastNameInput);
        userEvent.type(lastNameInput, testUser.name.lastName);
        userEvent.clear(usernameInput);
        userEvent.clear(emailInput);
        userEvent.type(emailInput, testUser.email);
        userEvent.type(usernameInput, testUser.username);
        userEvent.clear(confirmPasswordInput);
        userEvent.type(confirmPasswordInput, testUser.password);
        await act(async () => { userEvent.click(registerButton) });

        expect(mockSetUser).toHaveBeenCalledTimes(0);
    })

    test('should not allow signing up with missing password confirmation', async () => {
        userEvent.clear(firstNameInput);
        userEvent.type(firstNameInput, testUser.name.firstName);
        userEvent.clear(lastNameInput);
        userEvent.type(lastNameInput, testUser.name.lastName);
        userEvent.clear(usernameInput);
        userEvent.clear(emailInput);
        userEvent.type(emailInput, testUser.email);
        userEvent.type(usernameInput, testUser.username);
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, testUser.password);
        await act(async () => { userEvent.click(registerButton) });

        expect(mockSetUser).toHaveBeenCalledTimes(0);
    })

    test('should not allow signing up with if password and confirm password fields do not match', async () => {
        userEvent.clear(firstNameInput);
        userEvent.type(firstNameInput, testUser.name.firstName);
        userEvent.clear(lastNameInput);
        userEvent.type(lastNameInput, testUser.name.lastName);
        userEvent.clear(usernameInput);
        userEvent.clear(emailInput);
        userEvent.type(emailInput, testUser.email);
        userEvent.type(usernameInput, testUser.username);
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, testUser.password);
        userEvent.clear(confirmPasswordInput);
        userEvent.type(confirmPasswordInput, "Wrong password");
        await act(async () => { userEvent.click(registerButton) });

        const error = screen.getByText(/Password does not match/);

        expect(mockSetUser).toHaveBeenCalledTimes(0);
        expect(error).toBeInTheDocument();
    })

    test('should redirect to / after successfully registering', async () => {
        userEvent.clear(firstNameInput);
        userEvent.type(firstNameInput, testUser.name.firstName);
        userEvent.clear(lastNameInput);
        userEvent.type(lastNameInput, testUser.name.lastName);
        userEvent.clear(usernameInput);
        userEvent.clear(emailInput);
        userEvent.type(emailInput, testUser.email);
        userEvent.type(usernameInput, testUser.username);
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, testUser.password);
        userEvent.clear(confirmPasswordInput);
        userEvent.type(confirmPasswordInput, testUser.password);
        await act(async () => { userEvent.click(registerButton) });

        const redirect = screen.getByText(/Redirected/);

        expect(redirect).toBeInTheDocument();
    })

})