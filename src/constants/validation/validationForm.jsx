/* eslint-disable prettier/prettier */
import PasswordValidation from "./PasswordValidation"
import EmailValidation from "./EmailValidation"
const ValidationLogin = (data) => {
    let fieldCheck = []

    for(const key in data){
        
        if(key === "email"){
            let isRegex = EmailValidation(data[key])
            if(!isRegex){
                const field  = {
                    isValid: false,
                    field:key,
                    message:  `${key} is invalid`
                }
                fieldCheck.push(field)
            }
        }
        if(key === "password"){
            let isRegex = PasswordValidation(data[key])
            if(!isRegex){
                const field  = {
                    isValid: false,
                    field:key,
                    message:  `${key} is invalid`
                }
                fieldCheck.push(field)
            }
        }
        if(data[key] === " "){
            const field  = {
                isValid: false,
                field:key,
                message:  `${key} is required`
            }
            fieldCheck.push(field)
        }

        else{
            const field  = {
                isValid: true,
                field:key,
            }
            fieldCheck.push(field)
        }
    }

    return fieldCheck
}

export default ValidationLogin