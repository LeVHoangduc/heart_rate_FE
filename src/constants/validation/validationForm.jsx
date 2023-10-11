/* eslint-disable prettier/prettier */
import PasswordValidation from "./PasswordValidation"
import EmailValidation from "./EmailValidation"
const ValidationLogin = (data) => {
    let fieldCheck = []

    const userCheck = {
        email: data.email,
        password: data.password,
    }

    for (const key in userCheck) {
        const value = userCheck[key]

        let isValidField = true
        let messageRequired = ""
        let messageInvalid = ""

        if (key === "email") {
            isValidField = EmailValidation(value)
            messageRequired = "email required"
            messageInvalid = "email invalid"
        }
        if (key === "password") {
            isValidField = PasswordValidation(value)
            messageRequired = "password required"
            messageInvalid = "password invalid"
        }

        if (value.trim() === "") {
            fieldCheck.push({
                field: key,
                isValid: false,
                message: messageRequired,
            })
        } else if (!isValidField) {
            fieldCheck.push({
                field: key,
                isValid: false,
                message: messageInvalid,
            })
        } else {
            fieldCheck.push({
                field: key,
                isValid: true,
            })
        }
    }

    return fieldCheck
}

export default ValidationLogin