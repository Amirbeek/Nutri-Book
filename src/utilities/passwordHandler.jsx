export function handlePasswordChange(event, currentState) {

    const password = event.target.value;
    let errors = [];

    if (currentState === 'signUp' || currentState === 'changePassword' || currentState === 'reset') {

        // Password must contain at least one lowercase letter
        if (!password.match(/[a-z]/g)) {
            errors.push('Password must contain at least one lowercase letter.');
        }
        // Password must contain at least one uppercase letter
        if (!password.match(/[A-Z]/g)) {
            errors.push('Password must contain at least one uppercase letter.');
        }
        // Password must contain at least one number
        if (!password.match(/[0-9]/g)) {
            errors.push('Password must contain at least one number');
        }
        // Password must be at least 8 characters long
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        // Clear the "8 characters long" error once requirement is met
        else if (password.length >= 8) {
            errors = errors.filter(error => error !== 'Password must be at least 8 characters long');
        }
        if (errors.length === 0 && password.length >=8 ) {
            return {password, passwordValid: true, errors:[]};
        }
        return {password, passwordValid: false, errors}
    } else if (currentState === 'signIn') {
        return {password, passwordValid: true, errors: []};
    }
}

export function handleConfirmPasswordChange(event, currentState, password) {
    const confPassword = event.target.value;
    let passwordMatch = false;
    if (currentState === ('signUp') || currentState === 'changePassword' || currentState === 'reset') {
        let errors = [];
        if (confPassword !== password) {
            if (!errors.includes('Passwords do not match')) {
                errors.push('Passwords do not match')
            }
            passwordMatch = false;
        }
        // Clear the "do not match" error once passwords match
        else {
            errors.filter(error => error !== 'Passwords do not match');
            passwordMatch = true;
        }
        return {confPassword, passwordMatch, errors};
    }
    return {confPassword: '', passwordMatch: true, errors: []};

}


