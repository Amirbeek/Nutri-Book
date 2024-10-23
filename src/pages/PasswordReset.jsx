import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {handleConfirmPasswordChange, handlePasswordChange} from "../utilities/passwordHandler.jsx";
import './Styles/login.css'

export default function PasswordResetPage() {
    const url = "http://localhost:8080/api/reset-password"
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token')

    const onChangePassword = (event) => {
        const {password, passwordValid, errors} = handlePasswordChange(event, 'reset');
        setPassword(password);
        setMessages(errors);
        setPasswordValid(passwordValid);

    }

    const onChangeConfirmPassword = (event) => {
        const {confPassword, passwordMatch, errors} = handleConfirmPasswordChange(event, 'reset', password)
        setConfirmPassword(confPassword);
        setMessages([errors]);
        setPasswordMatch(passwordMatch)
    }

    return (<div className={"page-container"}>
            <div>
                <h1 className={"title"}>Reset Forgotten Password</h1>
                <div className="input-field">
                    <label htmlFor="password" className={"hide-from-view"}>Password</label>
                    <input type={"password"} value={password} placeholder={"Password"}
                           onChange={onChangePassword} onFocus={onChangePassword}
                           required={true}/>
                </div>
                <div className={"input-group"}>
                    <div className={"input-field"}>
                        <label htmlFor={"confirm-password"} className={"hide-from-view"}>Confirm Password</label>
                        <input type={"password"} value={confirmPassword} placeholder={"Confirm Password"}
                               onChange={onChangeConfirmPassword} onFocus={onChangeConfirmPassword}
                               required={true}/>
                    </div>
                    <div className={"button-field"}>
                        <div className={"button-pair"}>
                            <label htmlFor={"submit"} className={"hide-from-view"}>Submit</label>
                            <button type={"button"} id={"submit"} name={"submit"} className="disable">Submit</button>
                        </div>
                    </div>
                </div>
                <div className={"message"}>
                    {messages.map((error, index) => (<div className="error-message" key={index}><b>{error}</b></div>))}
                </div>
            </div>
        </div>
    );
}
