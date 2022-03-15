import bcrypt from 'bcrypt';

import Logger from '../lib/logger';

export class EncryptionService {
    encrypt = async (password: string): Promise<string> => {
        Logger.info('Encrypting...');
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        Logger.info('Encrypting done');
        return hashedPassword;
    };

    match = async (hashedPassword: string, password: string): Promise<boolean> => {
        Logger.info('Decrypting and checking if passwords match...');
        const isMatch = await bcrypt.compare(hashedPassword, password);
        return isMatch;
    };
}
