// 解析token

const jwt = require("jsonwebtoken");
module.exports = (token) => {
    if(token){
        if (token.includes("Bearer ")) token = token.split("Bearer ")[1];
        let account_number = null;
        jwt.verify(token, config.tokenEncryption.salt, (err, decoded) => {
            if(err) return `解析token失败${err}`;
            account_number = decoded.data;
        });
        return account_number;
    }
}