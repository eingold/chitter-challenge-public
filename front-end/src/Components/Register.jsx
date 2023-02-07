import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/APICalls';
import Error from './Error';

const Register = ({ setUser }) => {

    const nav = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState([]);

    const register = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const user = { name: { firstName, lastName }, email, username, password };
            if (firstName && lastName && email && username && password) {
                const res = await addUser(user);
                if (res.user) {
                    setUser(res.user);
                    setRegistered(true);
                }
                if (res.error) {
                    setError(res.error.data);
                }
                return;
            }
        }
    }

    const passwordValid = () => {
        return !((password.length < 8) || (password.match(/\d/) === null) || (password.match(/[A-Z]/) === null) || (password.match(/[a-z]/) === null));
    }

    const canRegister = () => {
        return firstName.length && lastName.length && email.length && username.length && password.length && password === confirmPassword;
    }

    useEffect(() => {
        if (registered) nav("/");
    }, [registered, nav])


    return (
        <>
            <h1>Please for the love of god do not sign up to this with your actual details, email address, or password. This is a novice site and I cannot guarantee its security.</h1>
            <form onSubmit={register} className="form-group">
                <label htmlFor="firstname">First name: </label>
                <input className="form-control" type="text" id="firstname" value={firstName} onChange={event => setFirstName(event.target.value)} placeholder="Your first name" required />
                <br />
                <br />
                <label htmlFor="lastname">Last name: </label>
                <input className="form-control" type="test" id="lastname" value={lastName} onChange={event => setLastName(event.target.value)} placeholder="Your last name" required />
                <br />
                <br />
                <label htmlFor="email">Email: </label>
                <input className="form-control" type="email" id="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Your email" required />
                <br />
                <br />
                <label htmlFor="username">Username: </label>
                <input className="form-control" type="text" id="username" value={username} onChange={event => setUsername(event.target.value)} placeholder="Your username" required />
                <br />
                <br />
                <label htmlFor="password">Password: </label>
                <input className="form-control" type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Your password" required />
                {!passwordValid() &&
                    <ul>
                        {(password.length < 8) && <li>Password must contain a minimum of 8 characters</li>}
                        {(password.match(/\d/) === null) && <li>Password must contain a number</li>}
                        {(password.match(/[A-Z]/) === null) && <li>Password must contain a capital letter</li>}
                        {(password.match(/[a-z]/) === null) && <li>Password must contain a lowercase letter</li>}
                    </ul>}
                {passwordValid() && <>
                    <br />
                    <br />
                </>}
                <label htmlFor="confirmPassword">Confirm password: </label>
                <input className="form-control" type="password" id="confirmPassword" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder="Re-enter your password" required />
                {(confirmPassword !== password) && <p>Password does not match</p>}
                {(confirmPassword === password) && <>
                    <br />
                    <br />
                </>}
                <input className="form-control" type="submit" id="submit" disabled={!canRegister()} value="Register" />
            </form>
            {error.length > 0 && <Error errors={error} />}
        </>
    );
}

export default Register;
