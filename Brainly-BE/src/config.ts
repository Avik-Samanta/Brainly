export const JWT_SECRET = (()=>{
    const secret = process.env.JWT_SECRET;
    if(!secret){
        throw new Error("there is no secret")
    }
    return secret;
})();

export const MONGO_URL = (()=>{
    const url = process.env.MONGO_URL;
    if(!url){
        throw new Error("there is no db url");
    }
    return url;
})();