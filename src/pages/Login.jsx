

import React, {useState} from "react";
import './Styles/login.css'
import {handleConfirmPasswordChange, handlePasswordChange} from "../utilities/passwordHandler";
import {useOutletContext} from "react-router-dom";
import {handleRecoveryCall, handleSignInCall, handleSignUpCall} from "../utilities/BackendService"
import {wait} from "@testing-library/user-event/dist/utils";

// Define the Login, Recovery and Registration component
export default function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const [loggedInUser, setLoggedInUser] = useOutletContext();
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    let [currentState, setCurrentState] = useState('signUp');
    let [title, setTitle] = useState('Sign Up');

    const handleBackendCall = async () => {
        let response = '';
        let error = '';

        switch (currentState) {
            case 'signUp':
                ({response, error} = await handleSignUpCall(email, username, password));

                break;
            case 'signIn':
                ({response, error} = await handleSignInCall(email, password));

                break;
            case 'recovery':
                ({response, error} = await handleRecoveryCall(email));
                break;
            default:
                return;
        }
        if (response && (response.status === 200 || response.status === 201)) {
            switch (currentState) {
                case 'signIn':
                    try {
                        const { authorization } = response.headers;


                        if (authorization) {
                            sessionStorage.setItem('token', authorization);
                            setLoggedInUser(email);
                            setMessages(["Login to account " + email + " Successful"]);
                            sessionStorage.setItem('email', email);
                        } else {
                            setMessages(["Token failure!"]);
                            setLoggedInUser("");
                        }
                    } catch (e) {
                        setMessages(["Error during login", e]);
                        setLoggedInUser('');
                    }
                    break;
                case 'recovery':
                case 'signUp':
                    setMessages([response.data]);
                    break;
                default:
                    return;
            }
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } else {
            setMessages(['Failed to Login due to server issue.']);
        }


    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleUsernameChange = (u) => {
        setUsername(u.target.value);
    }

    const onChangePassword = (event) => {
        const {password, passwordValid, errors} = handlePasswordChange(event, currentState);
        setPassword(password);
        setMessages([errors]);
        setPasswordValid(passwordValid);

    }

    const onChangeConfirmPassword = (event) => {
        const {confPassword, passwordMatch, errors} = handleConfirmPasswordChange(event, currentState, password)
        setConfirmPassword(confPassword);
        setMessages([errors]);
        setPasswordMatch(passwordMatch)
    }

    function onButtonPress(state) {
        setCurrentState(state);
        switch (state) {
            case 'signIn':
                setTitle('Sign In');
                setMessages([]);
                document.getElementById('sign-up').className = "disable";
                document.getElementById('sign-in').className = "";
                document.getElementById('recovery').className = "disable";
                break;
            case 'signUp':
                setTitle('Sign Up');
                setMessages([]);
                document.getElementById('sign-up').className = "";
                document.getElementById('sign-in').className = "disable";
                document.getElementById('recovery').className = "disable";
                break;
            case 'recovery':
                setTitle('Recovery');
                setMessages([]);
                document.getElementById('sign-in').className = "disable";
                document.getElementById('sign-up').className = "disable";
                document.getElementById('recovery').className = "";
                break;
            default:
                return;
        }
    }

    const handleSignUp = () => {
        setMessages([]);
        if (currentState === 'signUp') {
            if (currentState === 'signUp' && (passwordMatch && passwordValid)) {
                sessionStorage.setItem('email', email);
                handleBackendCall();
            } else if (!passwordMatch) {
                setMessages(['Passwords do not match.', 'Please check this before submitting.']);
            } else if (!passwordValid) {
                setMessages(['Password is not valid.', 'Please check this before submitting.']);
            }
        } else {
            onButtonPress('signUp')
        }
    }

    const handleSignIn = () => {
        if (currentState === 'signIn') {
            handleBackendCall();
        } else {
            onButtonPress('signIn')
        }
    }

    const handleRecoverAccount = () => {
        if (currentState === 'recovery') {
            handleBackendCall();
        } else {
            onButtonPress('recovery')
        }
    }

    return (<div className={"page-container"}>
        <div className={"content-container"}>
            <h1>{title}</h1>
            <div className="input-group">
                <div className="input-field">
                    <label htmlFor="email" className={"hide-from-view"}>Email</label>
                    <input value={email} name="email" placeholder="Email" type="email"
                           onChange={handleEmailChange} required={true}/>
                </div>

                {currentState === 'signUp' && <div className="input-field">
                    <label htmlFor="username" className={"hide-from-view"}>Username</label>
                    <input value={username} name="username" placeholder="Username" type="text"
                           onChange={handleUsernameChange} required={true}/>
                </div>}

                {(currentState === 'signUp' || currentState === 'signIn') && <div className="input-field">
                    <label htmlFor="password" className={"hide-from-view"}>Password</label>
                    <input type={"password"} value={password} placeholder="Password"
                           onChange={onChangePassword} onFocus={onChangePassword}
                           required={true}/>
                </div>}

                {currentState === 'signUp' && <div className="input-field">
                    <label htmlFor="confirm-password" className={"hide-from-view"}>Confirm Password</label>
                    <input value={confirmPassword} name="confirm-password"
                           placeholder="Confirm Password"
                           type="password" onChange={onChangeConfirmPassword} onFocus={onChangeConfirmPassword}
                           required={true}/>

                </div>}
            </div>
            <div className="button-field">
                <div className={"button-pair"}>
                    <label htmlFor={"sign-up"} className={"hide-from-view"}>Sign Up Button</label>
                    <button type="button" id="sign-up" name="sign-up"
                            onClick={handleSignUp}>Sign Up
                    </button>
                </div>
                <div className="button-pair">
                    <label htmlFor={"sign-in"} className={"hide-from-view"}>Sign In Button</label>
                    <button type="button" id="sign-in" name="sign-in" className="disable"
                            onClick={handleSignIn}>Sign In
                    </button>
                </div>
                <div className="button-pair">
                    <label htmlFor={"recovery"} className={"hide-from-view"}>Recover Account Button</label>
                    <button type={"button"} id={"recovery"} name={"recovery"} className="disable"
                            onClick={handleRecoverAccount}
                    >Recover Account
                    </button>
                </div>
            </div>

            <div className={"message"}>
                {messages.map((error, index) => (<div className="error-message" key={index}><b>{error}</b></div>))}
            </div>
        </div>
    </div>);
}