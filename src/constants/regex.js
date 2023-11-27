/* eslint-disable prettier/prettier */

export const Regex = {
    username: /^[\p{L} .'-]+$/u,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    first_name: /^[\p{L} .'-]+$/u,
    last_name: /^[\p{L} .'-]+$/u,
}
