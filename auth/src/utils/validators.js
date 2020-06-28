const validator = require('validator');
const MIN_PASSWORD_LENGTH = 6;

const isValidEmail = (email) => {
    if (email && validator.isEmail(email)) {
        return true;
    } else {
        return false;
    }
}

const isValidPassword = (password) => {
    if (password && typeof password === 'string' && password.length >= MIN_PASSWORD_LENGTH) {
        return true;
    } else {
        return false;
    }
}

module.exports = { isValidEmail, isValidPassword };