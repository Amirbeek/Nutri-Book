import React, { useState } from "react";
import './Styles/login.css'
import { handleConfirmPasswordChange, handlePasswordChange } from "../utilities/passwordHandler";
import { Link, useOutletContext } from "react-router-dom";
import {
    handleEmailChange,
    handleNewPasswordChange,
    handleUsernameChange,
    handleDeleteActiveAccount
} from "../utilities/BackendService";
import useFetchUser from "../hooks/useFetchUser.jsx";

export default function AccountManagement() {
    const [newUsername, setNewUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const [loggedInUser, setLoggedInUser] = useOutletContext(); // TODO: COULD BE USED ON ACCOUNT DELETION / LOG-OUT
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [currentState, setCurrentState] = useState('');
    const [buttonText, setButtonText] = useState('Submit');
    const token = sessionStorage.getItem('token');

    // Unsure where to use the fetched error messages atm
    const [userID, fetchUserMessages] = useFetchUser(loggedInUser);

    // Function to handle API calls to the backend server based on user's selection in the form.
    const handleBackendCall = async () => {
        let response = '';
        let error = '';

        switch (currentState) {
            case 'changeEmail':
                ({ response, error } = await handleEmailChange(newEmail, oldPassword, userID, token));
                break;
            case 'changePassword':
                if (!passwordValid || !passwordMatch) {
                    if (!passwordValid) {
                        setMessages(['Password is not valid.', 'Please check this before submitting.']);
                    } else if (!passwordMatch) {
                        setMessages(['Passwords do not match.', 'Please check this before submitting.'])
                    }
                    return;
                }
                ({ response, error } = await handleNewPasswordChange(newPassword, oldPassword, userID, token));
                break;
            case 'changeUsername':
                ({ response, error } = await handleUsernameChange(newUsername, oldPassword, userID, token));
                break;
            case 'changeAllergies':
                // FOR AMIR TO SETUP
                break;
            case 'deleteAccount':
                ({ response, error } = await handleDeleteActiveAccount(oldPassword, userID, token));
                break;
            default:
                return;
        }

        if (response.status === 200) {
            setMessages([response.data]);
            if (currentState === "changeEmail") {
                setLoggedInUser(newEmail);
            }
            setConfirmNewPassword('');
            setNewEmail('');
            setNewPassword('');
            setNewUsername('');
        } else {
            setMessages(['Operation ' + currentState + ' failed']);
        }
        setOldPassword('');
    }

    // Handlers for each of the form field changes.
    const handleNewEmail = (e) => {
        setNewEmail(e.target.value);
    }
    const handleOldPassword = (op) => {
        setOldPassword(op.target.value);
    }
    const handleNewUsername = (u) => {
        setNewUsername(u.target.value);
    }
    const onChangeNewPassword = (event) => {
        const { password, passwordValid, errors } = handlePasswordChange(event, currentState);
        setNewPassword(password);
        setMessages(errors);
        setPasswordValid(passwordValid);
    }

    const onChangeConfirmNewPassword = (event) => {
        const { confPassword, passwordMatch, errors } = handleConfirmPasswordChange(event, currentState, newPassword)
        setConfirmNewPassword(confPassword);
        setMessages(errors);
        setPasswordMatch(passwordMatch)
    }

    // Handlers for each of the form field buttons.
    const handleEmailButton = () => {
        setCurrentState("changeEmail");
        setIsButtonClicked(true);
        setButtonText('Change Email');
    }

    const handleUsernameButton = () => {
        setCurrentState("changeUsername");
        setIsButtonClicked(true);
        setButtonText('Change Username');
    }

    const handlePasswordButton = () => {
        setCurrentState("changePassword");
        setIsButtonClicked(true);
        setButtonText('Change Password');
    }
    const handleAllergenButton = () => {
        // FOR AMIR TO SETUP
        setButtonText('TEXT');
    }
    const handleDeleteAccount = () => {
        setCurrentState("deleteAccount");
        setIsButtonClicked(true);
        setButtonText('DELETE ACCOUNT');
    }

    return (
        <div className={"page-container"}>
            <div className="form-box" id={"form-box"}>
                <h1 id={"title"}>Account Settings</h1>
                {/* SELECTOR */}
                {!isButtonClicked && (
                    <div>
                        <h2 id={"sub-header"}>Select an option</h2>
                        {/* BUTTON CONTAINER */}
                        <div className={"button-field"}>
                            {/* EMAIL */}
                            <div className={"button-pair"}>
                                <button type={"button"} id={"change-email"} name={"change-email"} onClick={handleEmailButton} className={'disable'}>
                                    Change Email
                                </button>
                            </div>
                            {/* USERNAME */}
                            <div className={"button-pair"}>
                                <button type={"button"} id={"change-username"} name={"change-username"} onClick={handleUsernameButton} className={'disable'}>
                                    Change Username
                                </button>
                            </div>
                            {/* PASSWORD */}
                            <div className={"button-pair"}>
                                <button type={"button"} id={"change-password"} name={"change-password"} onClick={handlePasswordButton} className={'disable'}>
                                    Change Password
                                </button>
                            </div>
                            {/* ALLERGEN */}
                            <div className={"button-pair"}>
                                <Link href={'/ChangeAllergy'} to={'/ChangeAllergy'} type={"button"} id={"allergen-form"} name={"allergen-form"} onClick={handleAllergenButton} className={'disable'}>
                                    Change Allergens
                                </Link>
                            </div>
                            {/* DELETE ACCOUNT BUTTON */}
                            <div className={"button-pair"}>
                                <button type={"button"} id={"delete-account"} name={"delete-account"} onClick={handleDeleteAccount} className={'warning'}>
                                    DELETE ACCOUNT
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className={"input-group"}>
                    {(isButtonClicked && currentState === 'changeEmail') && (
                        <div>
                            <h2 id={"sub-header"}> Change Email </h2>
                            <br/>
                            <h3>New Email</h3>
                            <div className="input-field" id="email-field">
                                <input id="email" value={newEmail} name="new-email" placeholder="New Email" type="email" onChange={handleNewEmail} required={true}/>
                            </div>
                        </div>
                    )}
                    {(isButtonClicked && currentState === 'changeUsername') && (
                        <div>
                            <h2 id={"sub-header"}> Change Username </h2>
                            <br/>
                            <h3>New Username</h3>
                            <div className="input-field" id="username-field">
                                <input id="username" value={newUsername} name="new-username" placeholder="New Username" type="text" onChange={handleNewUsername} required={true}/>
                            </div>
                        </div>
                    )}
                    {(isButtonClicked && currentState === 'changePassword') && (
                        <div>
                            <h2 id={"sub-header"}> Change Password </h2>
                            <br/>
                            <h3>New Password</h3>
                            <div className="input-field" id="password-field">
                                <input id="new-password" type="password" value={newPassword} placeholder="New Password" onChange={onChangeNewPassword} onFocus={onChangeNewPassword} required={true}/>
                            </div>
                            <h3>Confirm New Password</h3>
                            <div className="input-field" id="password-field">
                                <input id="confirm-new-password" type="password" value={confirmNewPassword} placeholder="New Password" onChange={onChangeConfirmNewPassword} onFocus={onChangeConfirmNewPassword} required={true}/>
                            </div>
                        </div>
                    )}
                </div>
                {isButtonClicked && currentState === 'deleteAccount' && (
                    <div>
                        <h2 id={"sub-header"}>Delete Account</h2>
                        <br/>
                        <h3>Are you sure you wish your delete your account?</h3>
                        <br/>
                    </div>
                )}
                {isButtonClicked && (
                    <div>
                        <h3>Current Password</h3>
                        <div className="input-field" id="password-field">
                            <input id="old-password" type="password" value={oldPassword} placeholder="Current Password" onChange={handleOldPassword} required={true}/>
                        </div>
                        <div className={"button-field"}>
                            {/* SUBMIT BUTTON */}
                            <div className={"button-pair"}>
                                <button type={"button"} id={"submit"} name={"submit"} onClick={handleBackendCall}>
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                        <div className={"message"} id={"message"}>
                            {messages.map((error, index) => (
                                <div className="error-message" key={index}><b>{error}</b></div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
