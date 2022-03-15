import { StatusCodes } from 'http-status-codes';

import HttpException from '../../exceptions/HttpException';
import UserNotFoundException from '../../exceptions/UserNotFoundException';
import { processedDataByQueryParams, omitPassword, EncryptionService, Auth } from '../../utils';
import { ParamsProps } from '../../utils/types';
import { Group } from '../group/group.model';
import Logger from '../../lib/logger';

import { IUserDto, UserAttributes } from './user.interfaces';
import { User } from './user.model';

class UserService {
    private userModel: typeof User;
    private encryptionService: EncryptionService;
    private authService: Auth;

    constructor(userInstance: typeof User, encryptionInstance: EncryptionService, authService: Auth) {
        this.userModel = userInstance;
        this.encryptionService = encryptionInstance;
        this.authService = authService;
    }

    findAll = async (): Promise<User[]> => {
        try {
            const users = await this.userModel.findAll();
            return users;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong');
        }
    };

    findById = async (id: string): Promise<User | UserNotFoundException> => {
        try {
            const user = await this.userModel.findByPk(id, {
                include: [Group],
            });
            if (user === null || user.getDataValue('isDeleted')) {
                return new UserNotFoundException(id);
            }
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong');
        }
    };

    createUser = async (payload: UserAttributes): Promise<string | HttpException> => {
        try {
            const { password, login } = payload;
            const userNameIsUsed = await this.userModel.findOne({ where: { login } });
            if (!!userNameIsUsed) {
                Logger.error(`Login ${login} already exists, please try an unique name.`);
                return new HttpException(
                    StatusCodes.FORBIDDEN,
                    `Login ${login} already exists, please try an unique name.`,
                );
            }
            const hashedPassword = await this.encryptionService.encrypt(password);
            const payloadWithHashedPassword = {
                ...payload,
                password: hashedPassword,
            };
            const newUser = this.userModel.build(payloadWithHashedPassword);
            const user = await newUser.save();
            const userId = user.getDataValue('id');
            Logger.info(`User id:${userId} created.`);
            return userId;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong');
        }
    };

    loginUser = async (username: string, passDts: string): Promise<IUserDto | HttpException> => {
        try {
            const data = await this.userModel.findAll({ where: { login: username } });
            const passwords = data.map((user) => user.get('password'));
            const uniquePass = passwords.filter(async (pass) => await this.encryptionService.match(passDts, pass))[0];
            if (!uniquePass) return new HttpException(StatusCodes.UNAUTHORIZED, 'No match for this credentials.');
            const user = data.filter((user) => user.password === uniquePass)[0];
            const { id, login, age, isDeleted, createdAt, updatedAt } = user;
            const userBase = {
                id,
                login,
                password: user.password,
                age,
                isDeleted,
                createdAt,
                updatedAt,
            };
            const token = this.authService.signToken(user.password);
            return {
                data: omitPassword(userBase),
                token,
            };
        } catch (error) {
            if (error instanceof Error) {
                Logger.error(error.message, error);
                throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
            }
            Logger.error('Oops, Something went wrong in user login service', error);
            throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong');
        }
    };

    updateUser = async (id: string, payload: Partial<UserAttributes>): Promise<User | UserNotFoundException> => {
        try {
            const data = await this.userModel.update(payload, { where: { id }, returning: true });
            return data[0] === 0 ? new UserNotFoundException(id) : data[1][0];
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong');
        }
    };

    deleteUser = async (id: string): Promise<number> => {
        try {
            const data = await this.userModel.destroy({
                where: {
                    id,
                },
            });
            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong deleting user.');
        }
    };

    getSuggestions = async (params: ParamsProps): Promise<Partial<UserAttributes>[]> => {
        try {
            const data = await this.userModel.findAll({
                include: [Group],
            });
            const users = data.map((user) => user.get());
            const processedUsers = processedDataByQueryParams(users, params);
            return processedUsers;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong.');
        }
    };
}

export default UserService;
