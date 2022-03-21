import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createValidator } from 'express-joi-validation';
import { v4 as uuid_v4 } from 'uuid';

import { IController } from '../../interfaces/controller.interfaces';
import HttpException from '../../exceptions/HttpException';
import GroupNotFoundException from '../../exceptions/GroupNotFoundException';
import InternalServerException from '../../exceptions/InternalServerException';
import authorize from '../../middleware/authorize.middleware';

import { IGroupAttributes } from './group.interfaces';
import { Group } from './group.model';
import GroupService from './group.service';
import * as valid from './group.validation';

class GroupController implements IController {
    public path = '/groups';
    public router = Router();

    private validator = createValidator();
    private groupService: GroupService;

    constructor() {
        this.groupService = new GroupService(Group);
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get(this.path, authorize, this.getAll);
        this.router.post(this.path, authorize, this.validator.body(valid.GroupBodySchema), this.createGroup);
        this.router.get(`${this.path}/:id`, authorize, this.getGroupById);
        this.router.patch(
            `${this.path}/:id`,
            authorize,
            this.validator.body(valid.GroupUpdateBodySchema),
            this.updateGroup,
        );
        this.router.delete(`${this.path}/:id`, authorize, this.deleteGroup);
    }

    getGroupById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const { id } = request.params;
        try {
            const group = await this.groupService.findById(id);
            if (!group) throw new GroupNotFoundException(id);
            response.send(group.toJSON());
        } catch (error) {
            next(error);
        }
    };

    createGroup = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const groupDTO = request.body;
            const payload: IGroupAttributes = {
                id: uuid_v4(),
                ...groupDTO,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const newId = await this.groupService.createGroup(payload);
            if (!newId) throw new InternalServerException();
            response.send(newId);
        } catch (error) {
            next(error);
        }
    };

    updateGroup = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = request.params;
            const payload: Partial<IGroupAttributes> = { ...request.body, updatedAt: new Date() };
            const data = await this.groupService.updateGroup(id, payload);
            if (data instanceof HttpException) throw new GroupNotFoundException(id);
            response.send(data.toJSON());
        } catch (error) {
            next(error);
        }
    };

    deleteGroup = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const { id } = request.params;
        try {
            const deletedResources = await this.groupService.deleteGroup(id);
            if (deletedResources === 0) throw new GroupNotFoundException(id);
            response.sendStatus(StatusCodes.NO_CONTENT);
        } catch (error) {
            next(error);
        }
    };

    getAll = async (_request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const groups = await this.groupService.findAll();
            response.send(groups);
        } catch (error) {
            next(error);
        }
    };
}

export default GroupController;
