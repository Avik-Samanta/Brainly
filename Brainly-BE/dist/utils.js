"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(length) {
    const characters = "qwertyuiopasdfghjklzxcvbmm1234567890";
    let hash = "";
    for (let i = 0; i < length; i++) {
        hash += characters[(Math.floor(Math.random() * characters.length))];
    }
    return hash;
}
