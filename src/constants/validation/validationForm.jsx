/* eslint-disable prettier/prettier */
import PasswordValidation from "./PasswordValidation"
import EmailValidation from "./EmailValidation"
import NameValidation from "./NameValidation"
const fieldValidators = {
    email: {
        validate: value => EmailValidation(value),
        messages: {
            required: "Email required",
            invalid: "Email invalid",
            rule: "Email must be a valid email address"
        }
    },
    password: {
        validate: value => PasswordValidation(value),
        messages: {
            required: "Password required",
            invalid: "Password invalid",
            rule: "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
        }
    },
    name: {
        validate: value => NameValidation(value),
        messages: {
            required: "Name required",
            invalid: "Name invalid",
            rule: "Name invalid. Ex: John Doe"
        }
    }
};
export const ValidationLogin = (data) => {
    let fieldCheck = [];

    const fieldsToCheck = ['email', 'password'];

    for (const key of fieldsToCheck) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            const { validate, messages } = fieldValidators[key];

            let isValidField = validate(value);

            if (value.trim() === "") {
                fieldCheck.push({
                    field: key,
                    isValid: false,
                    message: messages.required,
                });
            } else if (!isValidField) {
                fieldCheck.push({
                    field: key,
                    isValid: false,
                    message: messages.invalid,
                });
            } else {
                fieldCheck.push({
                    field: key,
                    isValid: true,
                });
            }
        }
    }

    return fieldCheck;
};

export const ValidationRegister = (data) => {
    let fieldCheck = [];

    for (const key in fieldValidators) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            const { validate, messages } = fieldValidators[key];

            let isValidField = validate(value);

            if (value.trim() === "") {
                fieldCheck.push({
                    field: key,
                    isValid: false,
                    message: messages.required,
                });
            } else if (!isValidField) {
                fieldCheck.push({
                    field: key,
                    isValid: false,
                    message: messages.rule,
                });
            } else {
                fieldCheck.push({
                    field: key,
                    isValid: true,
                });
            }
        }
    }

    return fieldCheck;
};
