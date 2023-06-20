import jwt from "jsonwebtoken";

export function sign_token(data) {
    return jwt.sign(data, process.env.APPJWTKEY);
}

export function verify_token(token) {
    return jwt.verify(token, process.env.APPJWTKEY)
}

export function encode_zaincash_token(data) {
    //return jwt.sign(data, process.env.ZAINCASH_SECRET, { algorithm: "HS256"})
    return jwt.sign(data, '$2y$10$hBbAZo2GfSSvyqAyV2SaqOfYewgYpfR1O19gIh4SqyGWdmySZYPuS', { algorithm: "HS256"})
}

export function decode_zaincash_token(token) {
    return jwt.verify(token, '$2y$10$hBbAZo2GfSSvyqAyV2SaqOfYewgYpfR1O19gIh4SqyGWdmySZYPuS', { algorithm: "HS256"})
}