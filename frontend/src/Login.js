import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const urlBase = 'https://cop4331-contact-manager.thomasgriffin.dev/LAMPAPI';
const extension = 'php';

function Login() {
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginResult, setLoginResult] = useState('');

    // initializing nav
    const navigate = useNavigate();

    const doLogin = async () => {
        setLoginResult('');

        const tmp = {
            login: loginName,
            password: loginPassword
        };

        const jsonPayload = JSON.stringify(tmp);
        const url = `${urlBase}/Login.${extension}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: jsonPayload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });

            const jsonObject = await response.json();

            if(jsonObject.id < 1) {
                setLoginResult('Incorrect username or password.')
            } 

            else {
                localStorage.setItem('user_data', JSON.stringify(jsonObject)); //check this and whether you can still save to database

                navigate('/contacts'); 
            }
        } catch(e) {
            setLoginResult(e.message);
        }
    };

    return (
        <div id="loginDiv">
            <span id="inner-title">Welcome back!</span>
            <span id="no-account">Don't have an account? <Link id="no-account-signup" to="/register">Sign up</Link></span>
            <input
                type="text"
                id="loginName"
                placeholder="Username"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
            /><br />
            <input
                type="password"
                id="loginPassword"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
            /><br />
            <span id="loginResult">{loginResult}</span>
            <button type="button" aria-label="Sign in" id="loginButton" className="buttons" onClick={doLogin}>
                 Sign In
            </button>
            
            <br />
        </div>
    );
}

export default Login;