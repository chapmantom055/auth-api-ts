import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const DBURI = process.env.MONGO_DB_URI;
const accessTokenPrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
const accessTokenPublicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY;
const refreshTokenPrivateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
const refreshTokenPublicKey = process.env.REFRESH_TOKEN_PUBLIC_KEY;

    // const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    //     modulusLength: 2048,
    //     publicKeyEncoding: { type: "spki", format: "pem" },
    //     privateKeyEncoding: { type: "pkcs8", format: "pem" },


export default {
    port: 3000,
    dbUri: DBURI,
    logLevel: 'info',
    accessTokenPrivateKey: accessTokenPrivateKey,
    accessTokenPublicKey: accessTokenPublicKey,
    refreshTokenPrivateKey: refreshTokenPrivateKey,
    refreshTokenPublicKey: refreshTokenPublicKey,
    smtp: {
        user: 'etsculoitorh2sct@ethereal.email',
        pass: 'A8kepp31V3wEjpVWPF',
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
    }
}