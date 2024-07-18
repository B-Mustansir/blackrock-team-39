import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../../utils';
import '../Login/Login.css';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { message, success, jwtToken, email, name, tokenHoldings, balance, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('email', email);
                localStorage.setItem('balance', balance);
                
                // Ensure tokenHoldings is properly stringified
                if (tokenHoldings) {
                    localStorage.setItem('tokenHoldings', JSON.stringify(tokenHoldings));

                console.log('Token holdings:', tokenHoldings);
            } else {
                console.error('Token holdings are undefined');
            }
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
                setLoginInfo(prevState => ({ ...prevState, password: '' }));
            } else if (!success) {
                handleError(message);
                setLoginInfo(prevState => ({ ...prevState, password: '' }));
            }
        } catch (err) {
            handleError(err);
            setLoginInfo(prevState => ({ ...prevState, password: '' }));
        }
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        value={loginInfo.password}
                    />
                </div>
                <button className='loginButton' type='submit'>Login</button>
                <span>Don't have an account?
                    <Link to="/signup"> Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;