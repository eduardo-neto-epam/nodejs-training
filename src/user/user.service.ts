import { StatusCodes } from 'http-status-codes';
import { v4 as uuid_v4 } from 'uuid';

import HttpException from '../exceptions/HttpException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import { IHelperArgs } from '../interfaces/helpers.interface';
import * as utils from '../utils';

import { IUser } from './user.interface';

class UserService {
    getUserByIdHelper = async (userHelpersArgs: IHelperArgs<IUser>): Promise<void> => {
        const { db, request, response, next } = userHelpersArgs;
        const { id } = request.params;
        try {
            const user = await db.getById(id);
            if (!user || user.isDeleted) {
                next(new UserNotFoundException(id));
            }
            response.send(user);
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR));
            }
        }
    };

    createUserHelper = async (userHelpersArgs: IHelperArgs<IUser>): Promise<void> => {
        const { db, request, response, next } = userHelpersArgs;
        const user: IUser = { id: uuid_v4(), ...request.body, isDeleted: false };
        try {
            const newUser = await db.create(user);
            newUser ? response.send(newUser) : next(new HttpException(StatusCodes.BAD_REQUEST));
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR));
            }
        }
    };

    updateUserHelper = async (userHelpersArgs: IHelperArgs<IUser>): Promise<void> => {
        const { db, request, response, next } = userHelpersArgs;
        const { id } = request.params;
        try {
            const updatedUser = await db.update(id, request.body);
            updatedUser ? response.send(updatedUser) : next(new UserNotFoundException(id));
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR));
            }
        }
    };

    deleteUserHelper = async (userHelpersArgs: IHelperArgs<IUser>): Promise<void> => {
        const { db, request, response, next } = userHelpersArgs;
        const { id } = request.params;
        try {
            const deletedUser = await db.delete(id);
            deletedUser ? response.send(deletedUser.id) : next(new UserNotFoundException(id));
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR));
            }
        }
    };

    getUserAutoSuggestions = async (userHelpersArgs: IHelperArgs<IUser>): Promise<void> => {
        const { db, request, response, next } = userHelpersArgs;
        const { pattern, order, limit } = request.query;
        let parsedLimit = 0;
        let processedUsers: IUser[] = [];
        try {
            const users = await db.get();
            processedUsers = users.filter(utils.removeDeletedByIsDeletedProp);
            if (typeof limit === 'string') {
                parsedLimit = parseInt(limit, 10);
            }
            if (typeof pattern === 'string' && pattern.length > 0) {
                processedUsers = processedUsers.filter(utils.filterByPatternInLoginProp(pattern));
            }
            if (typeof order === 'string') {
                processedUsers.sort(utils.sortSuggestionsByLoginProp(order));
            }
            if (parsedLimit) {
                processedUsers = processedUsers.slice(0, parsedLimit);
            }
            response.send(processedUsers);
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR));
            }
        }
    };
}

export default UserService;
