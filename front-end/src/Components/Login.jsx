import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/APICalls';
import Error from './Error';

const Login = ({ setUser }) => {

    const nav = useNavigate();

    const [loginDetail, setLoginDetail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState([]);

    const submitLogin = async (e) => {
        e.preventDefault();
        const user = { login: loginDetail, password };
        if (loginDetail && password) {
            const res = await login(user);
            if (res.user) {
                setUser(res.user);
                setLoggedIn(true);
            }
            if (res.error) {
                setError(res.error.data);
            }
            return;
        }
        alert("Invalid data");
    }

    useEffect(() => {
        if (loggedIn) nav("/");
    }, [loggedIn, nav])

    const canLogin = () => {
        return loginDetail.length && password.length;
    }

    return (
        <>
            <form className="form-group" onSubmit={submitLogin}>
                <label htmlFor="email">Username or email: </label>
                <input className="form-control" type="text" id="loginDetail" value={loginDetail} onChange={event => setLoginDetail(event.target.value)} placeholder="Username or email" required />
                <br />
                <br />
                <label htmlFor="password">Password: </label>
                <input className="form-control" type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Your password" required />
                <input className="form-control" type="submit" disabled={!canLogin()} value="Login" />
            </form>
            {error.length > 0 && <Error errors={error} />}
        </>
    );
}

export default Login;
