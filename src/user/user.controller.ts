import { Router, Request, Response, NextFunction } from 'express';

import { IController } from '../interfaces/controller.interface';
import { IHelperArgs } from '../interfaces/helpers.interface';
import InMemoryDatabase from '../database';
import DbAdapter from '../database/db.adapter';
import loader from '../database/loader';

import * as helpers from './user.helpers';
import { IUser } from './user.interface';

const PATH_TO_DUMMY_DATA = process.env.PATH_TO_DUMMY_DATA as string;

class UserController implements IController {
    public path = '/users';
    public router = Router();

    private usersDb = new InMemoryDatabase<IUser>();

    constructor() {
        this.initializeRoutes();
        loader(PATH_TO_DUMMY_DATA, new DbAdapter<IUser, InMemoryDatabase<IUser>>(this.usersDb));
    }

    initializeRoutes(): void {
        this.router.get(this.path, this.getSuggestions);
        this.router.post(this.path, this.createUser);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.patch(`${this.path}/:id`, this.updateUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }

    getUserById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const helperArgs: IHelperArgs<IUser> = { db: this.usersDb, request, response, next };
        helpers.getUserByIdHelper(helperArgs);
    };

    createUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const helperArgs: IHelperArgs<IUser> = { db: this.usersDb, request, response, next };
        helpers.createUserHelper(helperArgs);
    };

    updateUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const helperArgs: IHelperArgs<IUser> = { db: this.usersDb, request, response, next };
        helpers.updateUserHelper(helperArgs);
    };

    deleteUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const helperArgs: IHelperArgs<IUser> = { db: this.usersDb, request, response, next };
        helpers.deleteUserHelper(helperArgs);
    };

    getSuggestions = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const helperArgs: IHelperArgs<IUser> = { db: this.usersDb, request, response, next };
        helpers.getUserAutoSuggestions(helperArgs);
    };
}

export default UserController;
