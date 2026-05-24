"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URL = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = (() => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("there is no secret");
    }
    return secret;
})();
exports.MONGO_URL = (() => {
    const url = process.env.MONGO_URL;
    if (!url) {
        throw new Error("there is no db url");
    }
    return url;
})();
