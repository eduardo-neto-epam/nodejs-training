import { StatusCodes } from 'http-status-codes';

import HttpException from '../exceptions/HttpException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import { ParamsProps, processedDataByQueryParams } from '../utils';

import { UserAttributes } from './user.interfaces';
import { User } from './user.model';

class UserService {
    private userModel: typeof User;
    constructor(userInstance: typeof User) {
        this.userModel = userInstance;
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
            const user = await this.userModel.findByPk(id);
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

    createUser = async (payload: UserAttributes): Promise<string | undefined> => {
        try {
            const newUser = this.userModel.build(payload);
            const user = await newUser.save();
            return user.getDataValue('id');
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
            }
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

    deleteUser = async (id: string): Promise<string | HttpException> => {
        try {
            const data = await this.userModel.update(
                { isDeleted: true, updatedAt: new Date() },
                {
                    where: { id },
                    returning: true,
                },
            );
            return data[0] === 0 ? new UserNotFoundException(id) : data[1][0].getDataValue('id');
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
            }
            throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Oops, Something went wrong deleting user.');
        }
    };

    getSuggestions = async (params: ParamsProps): Promise<UserAttributes[]> => {
        try {
            const data = await this.userModel.findAll();
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
