const AUTH_TOKEN_EXPIRE_TIME = process.env.AUTH_TOKEN_EXPIRE_TIME || 3600;
const AUTH_TOKEN_ISSUER = process.env.AUTH_TOKEN_ISSUER || 'amazing_issuer';
const AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET || 'super_secret';

export const authConfig = {
    expireTime: AUTH_TOKEN_EXPIRE_TIME,
    issuer: AUTH_TOKEN_ISSUER,
    secret: AUTH_TOKEN_SECRET,
};
