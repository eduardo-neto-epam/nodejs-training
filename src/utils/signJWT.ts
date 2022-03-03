import jwt from 'jsonwebtoken';

import { authConfig } from '../config';
import Logger from '../lib/logger';
import { IUserBase } from '../entities/user/user.interfaces';

const signJWT = (user: IUserBase, callback: (err: Error | null, token: string | null) => void): void => {
    const timeSynchEpoch = new Date().getTime();
    const expirationTime = timeSynchEpoch + Number(authConfig.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    Logger.info(`Attempting to sign token for ${user.login}`);

    try {
        jwt.sign(
            {
                username: user.login,
            },
            authConfig.secret,
            {
                issuer: authConfig.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds,
            },
            (err, token) => {
                if (err) {
                    callback(err, null);
                } else if (token) {
                    callback(null, token);
                }
            },
        );
    } catch (err) {
        if (err instanceof Error) {
            Logger.error(err.message, err);
            callback(err, null);
        }
    }
};

export default signJWT;
