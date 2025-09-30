import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Alert from './components/alert';
//import md5 from './md5'; 

const urlBase = 'https://cop4331-contact-manager.thomasgriffin.dev/LAMPAPI';
const extension = 'php';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [registerResult, setRegisterResult] = useState('');
    const [registerWork, setRegisterWork] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(registerWork){
            const timer = setTimeout(() => {
                navigate('/login');
            },3000);

            return () => clearTimeout(timer);
        }
    }, [registerWork, navigate])

    const doRegister = async () => {
        setRegisterResult('');

        if (firstName === "" || lastName === "" || login === "" || password === "") {
            setRegisterResult("Please fill in all fields.");
            return;
        }

        //const hashedPassword = md5(password);

        const tmp = {
            firstName: firstName,
            lastName: lastName,
            login: login,
            password: password // use hashedPassword if hashing
        };
        const jsonPayload = JSON.stringify(tmp);
        const url = `${urlBase}/Register.${extension}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: jsonPayload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });

            const jsonObject = await response.json();

            if (response.status === 200 && !jsonObject.error) {
                setRegisterResult("Registration successful! You can now log in.");
                setRegisterWork(true);

            } else {
                setRegisterResult(jsonObject.error || "Unable to register.");
            }
        } catch (err) {
            setRegisterResult(err.message);
        }
    };

    return (
        <>
            {registerWork && <Alert message={'Redirecting in 3 seconds'} trigger={setRegisterWork} />}
            <div id="registerDiv">
                <span id="inner-title">Register Account!</span>
                <span id="no-account">Already have an account? <Link id="no-account-signup" to="/login">Log in</Link></span>
                <input
                    type="text"
                    id="registerFirstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                /><br />
                <input
                    type="text"
                    id="registerLastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                /><br />
                <input
                    type="text"
                    id="registerLogin"
                    placeholder="Username"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                /><br />
                <input
                    type="password"
                    id="registerPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <span id="registerResult">{registerResult}</span>
                <button type="button"  aria-label="register" id="registerButton" className="buttons" onClick={doRegister}>
                    Sign Up
                </button><br />
                
                <br />
            </div>
        </>
    );
}

export default Register;