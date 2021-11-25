import GroupNotFoundException from '../../exceptions/GroupNotFoundException';
import InternalServerException from '../../exceptions/InternalServerException';
import UserNotFoundException from '../../exceptions/UserNotFoundException';
import { User } from '../user/user.model';
import { Group } from '../group/group.model';
import db from '../../database/config/database.config';

class UserGroupService {
    private userModel: typeof User;
    private groupModel: typeof Group;

    constructor(userInstance: typeof User, groupInstance: typeof Group) {
        this.groupModel = groupInstance;
        this.userModel = userInstance;
    }

    addUserToGroup = async (userId: string, groupId: string): Promise<Group[]> => {
        try {
            const result = await db.transaction(async (t) => {
                const user = await this.userModel.findByPk(userId, { transaction: t });
                if (!user) throw new UserNotFoundException(userId);
                const group = await this.groupModel.findByPk(groupId, { transaction: t });
                if (!group) throw new GroupNotFoundException(groupId);
                await user.addGroup([group], { transaction: t });
                const groupsFromUser = user.getGroups({ transaction: t });
                return groupsFromUser;
            });
            return result;
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerException(error);
            }
            throw new InternalServerException();
        }
    };

    getAllUsersFromGroup = async (groupId: string): Promise<User[] | undefined> => {
        try {
            const result = db.transaction(async (t) => {
                const group = await this.groupModel.findByPk(groupId, { transaction: t });
                if (!group) throw new GroupNotFoundException(groupId);
                const users = await group.getUsers({ transaction: t });
                return users;
            });
            return result;
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerException(error);
            }
            throw new InternalServerException();
        }
    };

    removeUserFromGroup = async (userId: string, groupId: string): Promise<User[]> => {
        try {
            const result = db.transaction(async (t) => {
                const group = await this.groupModel.findByPk(groupId, { transaction: t });
                if (!group) throw new GroupNotFoundException(groupId);
                const user = await this.userModel.findByPk(userId, { transaction: t });
                if (!user) throw new UserNotFoundException(userId);
                await group.removeUser(user, { transaction: t });
                const usersFromGroup = group.getUsers({ transaction: t });
                return usersFromGroup;
            });
            return result;
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerException(error);
            }
            throw new InternalServerException();
        }
    };
}

export default UserGroupService;
