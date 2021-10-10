import { Router, Request, Response, NextFunction } from 'express';
import { IUser } from './user.interfaces';
import { IController } from '../interfaces/controller.interfaces';
import InMemoryDatabase from '../database';
import * as handlers from './user.controller-handlers';
import DbAdapter from '../database/db.adapter';
import { loader } from '../database/loader';
import { ValidatedRequest, createValidator } from 'express-joi-validation';
import * as valid from './user.validation';

class UserController implements IController {
    public path = '/users';
    public router = Router();

    private usersDb: InMemoryDatabase<IUser>;
    private validator = createValidator();

    constructor(db: InMemoryDatabase<IUser>) {
        this.usersDb = db;
        this.initializeRoutes();
        loader('src/database/data.json', new DbAdapter<IUser, InMemoryDatabase<IUser>>(this.usersDb));
    }

    initializeRoutes(): void {
        this.router.get(this.path, this.getSuggestions);
        this.router.post(this.path, this.validator.body(valid.UserBodySchema), this.createUser);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.patch(`${this.path}/:id`, this.validator.body(valid.UserUpdateBodySchema), this.updateUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }

    getUserById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        handlers.getUserByIdHandler({ db: this.usersDb, request, response, next });
    };

    createUser = async (
        request: ValidatedRequest<valid.IUserBodySchema>,
        response: Response,
        next: NextFunction,
    ): Promise<void> => {
        handlers.createUserHandler({ db: this.usersDb, request, response, next });
    };

    updateUser = async (
        request: ValidatedRequest<valid.IUserBodySchema>,
        response: Response,
        next: NextFunction,
    ): Promise<void> => {
        handlers.updateUserHandler({ db: this.usersDb, request, response, next });
    };

    deleteUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        handlers.deleteUserHandler({ db: this.usersDb, request, response, next });
    };

    getSuggestions = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        handlers.getUserAutoSuggestionsHandler({ db: this.usersDb, request, response, next });
    };
}

export default UserController;
