import { render, screen } from '@testing-library/react';
import testErrors from './testData/testErrors.js';
import Error from '../Components/Error.jsx';

describe('Error tests', () => {

    beforeEach(() => {
        render(<Error errors={testErrors} />);
    })

    test('should display an unordered list when errors are passed in', () => {
        const ul = document.querySelector(`ul`);
        expect(ul).toBeTruthy();
    })

    test('should display list entries equal to the number of errors', () => {
        const numberOfRows = screen.getAllByText(/Error/).length;
        expect(numberOfRows).toBe(testErrors.length);
    })

    test('should display error message with param if message is Invalid value', () => {
        const error = screen.getByText(/Invalid value in Param 1/);
        expect(error).toBeInTheDocument();
    })

    test('should just display error message without param if message is not Invalid value', () => {
        const error = screen.getByText(/Error 1$/);
        expect(error).toBeInTheDocument();
    })
})