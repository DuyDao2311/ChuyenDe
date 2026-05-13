const validator = require('validator');

function validateRegister(data) {
    const errors = {};

    if (!data.name || data.name.trim() === "") {
        errors.name = "Name không được để trống";
    }

    if (!data.email || data.email.trim() === "") {
        errors.email = "Email không được để trống";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email không hợp lệ";
    }

    if (!data.password) {
        errors.password = "Password không được để trống";
    } else if (data.password.length < 6) {
        errors.password = "Password phải >= 6 ký tự";
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0
    };
}


function validateLogin(data) {
    const errors = {};

    if (!data.email || data.email.trim() === "") {
        errors.email = "Email không được để trống";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email không hợp lệ";
    }

    if (!data.password) {
        errors.password = "Password không được để trống";
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0
    };
}

module.exports = {
    validateRegister,
    validateLogin
};
