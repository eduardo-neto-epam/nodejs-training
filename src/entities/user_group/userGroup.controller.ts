import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IController } from '../../interfaces/controller.interfaces';
import { User } from '../user/user.model';
import { Group } from '../group/group.model';
import HttpException from '../../exceptions/HttpException';

import UserGroupService from './userGroup.service';

class UserGroupController implements IController {
    public path = '/usergroup';
    public router = Router();

    private userGroupService: UserGroupService;

    constructor(userClass: typeof User, groupClass: typeof Group) {
        this.userGroupService = new UserGroupService(userClass, groupClass);
        this.initializeAssociations();
        this.initializeRoutes();
    }

    initializeAssociations(): void {
        User.belongsToMany(Group, { through: 'user_group' });
        Group.belongsToMany(User, { through: 'user_group' });
    }

    initializeRoutes(): void {
        this.router.post(`${this.path}/:userId/:groupId`, this.addUserToGroup);
        this.router.get(`${this.path}/users-from-group/:groupId`, this.getAllUsersFromGroup);
        this.router.delete(`${this.path}/remove-user-from-group/:userId/:groupId`, this.removeUserFromGroup);
    }

    addUserToGroup = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId, groupId } = request.params;
            const groupsFromUser = await this.userGroupService.addUserToGroup(userId, groupId);
            response.send(groupsFromUser);
        } catch (error) {
            next(error);
        }
    };

    getAllUsersFromGroup = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { groupId } = request.params;
            const users = await this.userGroupService.getAllUsersFromGroup(groupId);
            if (!users) throw new HttpException(StatusCodes.NOT_FOUND, 'Group has no users.');
            response.send(users);
        } catch (error) {
            next(error);
        }
    };

    removeUserFromGroup = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId, groupId } = request.params;
            const usersFromGroup = await this.userGroupService.removeUserFromGroup(userId, groupId);
            response.send(usersFromGroup);
        } catch (error) {
            next(error);
        }
    };
}

export default UserGroupController;
