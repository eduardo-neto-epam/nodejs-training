import jwt from 'jsonwebtoken';

import Logger from '../lib/logger';

export default class Auth {
    private config: {
        expireTime: string | number;
        issuer: string;
        secret: string;
    };
    private expirationTime: number;
    private expirationTimeInSeconds: number;

    private timeSynchEpoch = new Date().getTime();

    constructor(authConfig: { expireTime: string | number; issuer: string; secret: string }) {
        this.config = authConfig;
        this.expirationTime = this.timeSynchEpoch + Number(this.config.expireTime) * 100000;
        this.expirationTimeInSeconds = Math.floor(this.expirationTime / 1000);
    }

    signToken = (username: string): string => {
        Logger.info(`Attempting to sign token...`);
        const signedToken = jwt.sign({ username }, this.config.secret, {
            issuer: this.config.issuer,
            algorithm: 'HS256',
            expiresIn: this.expirationTimeInSeconds,
        });
        return signedToken;
    };
}
