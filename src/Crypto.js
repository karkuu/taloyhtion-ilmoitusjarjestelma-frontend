let cr = require("crypto")

export default class Crypto
{
    returnHash(Str) {
        let crypto = cr.createHash('sha256');
        crypto.update(Str);
        
        return crypto.digest('hex');
    }
}