import HttpException from '../exceptions/HttpException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import { IControllerHandlerArgs } from '../interfaces/controller.interfaces';
import { IUser } from './user.interfaces';
import { v4 as uuid_v4 } from 'uuid';
import * as utils from '../utils';
import InvalidIDException from '../exceptions/InvalidIDException';
import * as valid from './user.validation';

export const getUserByIdHandler = async (userHandlerArgs: IControllerHandlerArgs<IUser, null>): Promise<void> => {
    const { db, request, response, next } = userHandlerArgs;
    const { id } = request.params;
    try {
        const user = await db.getById(id);
        if (user) {
            if (user.isDeleted) {
                next(new UserNotFoundException(id));
            } else {
                response.send(user);
            }
        } else {
            next(new UserNotFoundException(id));
        }
    } catch (error) {
        if (error instanceof Error) {
            next(new HttpException(500, `Unable to get user with id ${id}. Error: ${error.message}`));
        }
    }
};

export const createUserHandler = async (
    userHandlerArgs: IControllerHandlerArgs<IUser, valid.IUserBodySchema>,
): Promise<void> => {
    const { db, request, response, next } = userHandlerArgs;
    const user: IUser = { id: uuid_v4(), ...request.body, isDeleted: false };
    try {
        const newUser = await db.create(user);
        newUser ? response.send(newUser) : next(new InvalidIDException(user.id));
    } catch (error) {
        if (error instanceof Error) {
            next(new HttpException(500, `Unable to create user. Error: ${error.message}`));
        }
    }
};

export const updateUserHandler = async (
    userHandlerArgs: IControllerHandlerArgs<IUser, valid.IUserBodySchema>,
): Promise<void> => {
    const { db, request, response, next } = userHandlerArgs;
    const { id } = request.params;
    try {
        const updatedUser = await db.update(id, request.body);
        updatedUser ? response.send(updatedUser) : next(new UserNotFoundException(id));
    } catch (error) {
        if (error instanceof Error) {
            next(new HttpException(500, `An Error occurred when updating user with id ${id}. Error: ${error.message}`));
        }
    }
};

export const deleteUserHandler = async (userHandlerArgs: IControllerHandlerArgs<IUser, null>): Promise<void> => {
    const { db, request, response, next } = userHandlerArgs;
    const { id } = request.params;
    try {
        const deletedUser = await db.delete(id);
        deletedUser ? response.send(deletedUser.id) : next(new UserNotFoundException(id));
    } catch (error) {
        if (error instanceof Error) {
            next(new HttpException(500, `An Error occurred when updating user with id ${id}. Error: ${error.message}`));
        }
    }
};

export const getUserAutoSuggestionsHandler = async (
    userHandlerArgs: IControllerHandlerArgs<IUser, null>,
): Promise<void> => {
    const { db, request, response, next } = userHandlerArgs;
    const { pattern, order, limit } = request.query;
    let parsedLimit = 0;
    let processedUsers: IUser[] = [];
    try {
        const users = await db.get();
        processedUsers = users.filter(utils.removeDeletedRecordsByIsDeletedProp);
        if (typeof limit === 'string') {
            parsedLimit = parseInt(limit, 10);
        }
        if (typeof pattern === 'string' && pattern.length > 0) {
            processedUsers = processedUsers.filter(utils.filterRecordsByPatternInLoginProp(pattern));
        }
        if (typeof order === 'string') {
            processedUsers.sort(utils.sortRecordsByLoginProp(order));
        }
        if (parsedLimit) {
            processedUsers = processedUsers.slice(0, parsedLimit);
        }
        response.send(processedUsers);
    } catch (error) {
        if (error instanceof Error) {
            next(new HttpException(500, `An Error occurred when retrieving users. Error: ${error.message}`));
        }
    }
};
