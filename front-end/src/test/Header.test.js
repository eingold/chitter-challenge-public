import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Header from "../Components/Header";
import testUser from "./testData/testUser";

describe('Header tests', () => {
    test('should display login and register buttons if a user is not logged in', () => {
        render(<MemoryRouter><Header user={{}} /></MemoryRouter>)

        const login = screen.getByText(/Login/);
        const register = screen.getByText(/Register/);

        expect(login).toBeInTheDocument();
        expect(register).toBeInTheDocument();
    })

    test("should display user's username if a user is logged in", () => {
        render(<MemoryRouter><Header user={testUser} /></MemoryRouter>)

        const username = screen.getByText(new RegExp(`Logged in as ${testUser.username}`))

        expect(username).toBeInTheDocument();
    })

    test("should display a logout button if a user is logged in", () => {
        render(<MemoryRouter><Header user={testUser} /></MemoryRouter>)

        const logout = screen.getByText(/Log out/);

        expect(logout).toBeInTheDocument();
    })

    test("should log the user out if the logout button is pressed", () => {
        const mockSetUser = jest.fn()

        render(<MemoryRouter><Header user={testUser} setUser={mockSetUser} /></MemoryRouter>)

        const logout = screen.getByText(/Log out/);

        userEvent.click(logout);

        expect(mockSetUser).toHaveBeenCalledTimes(1);
        expect(mockSetUser).toHaveBeenCalledWith({});
    })

})