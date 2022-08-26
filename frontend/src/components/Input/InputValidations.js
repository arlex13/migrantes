import {
    email,
    composeValidators,
    alphanumeric,
    required,
    date,
    password,
} from "../../validations";

export const Validations = (validations) => {
    const _validations = []
    required, email
    if (validations.includes("required")) {
        _validations.push(required)
    }
    if (validations.includes("email")) {
        _validations.push(email)
    }
    if (validations.includes("password")) {
        _validations.push(password)
    }
    if (validations.includes("date")) {
        _validations.push(date)
    }
    if (validations.includes("alphanumeric")) {
        _validations.push(alphanumeric)
    }

    return { validate: composeValidators(..._validations) }
}