import HttpException from '../../exceptions/HttpException';
import GroupNotFoundException from '../../exceptions/GroupNotFoundException';
import InternalServerException from '../../exceptions/InternalServerException';

import { IGroupAttributes } from './group.interfaces';
import { Group } from './group.model';

class GroupService {
    private groupModel: typeof Group;
    constructor(groupInstance: typeof Group) {
        this.groupModel = groupInstance;
    }

    findAll = async (): Promise<Group[]> => {
        try {
            const groups = await this.groupModel.findAll();
            return groups;
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerException(error);
            }
            throw new InternalServerException();
        }
    };

    findById = async (id: string): Promise<Group | null> => {
        try {
            const group = await this.groupModel.findByPk(id);
            return group;
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerException(error);
            }
            throw new InternalServerException();
        }
    };

    createGroup = async (payload: IGroupAttributes): Promise<string | undefined> => {
        try {
            const newGroup = this.groupModel.build(payload);
            const group = await newGroup.save();
            return group.getDataValue('id');
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerException(error);
            }
            throw new InternalServerException();
        }
    };

    updateGroup = async (id: string, payload: Partial<IGroupAttributes>): Promise<Group | GroupNotFoundException> => {
        try {
            const data = await this.groupModel.update(payload, { where: { id }, returning: true });
            if (data[0] === 0) {
                return new GroupNotFoundException(id);
            }
            return data[1][0];
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerException(error);
            }
            throw new InternalServerException();
        }
    };

    deleteGroup = async (id: string): Promise<number | HttpException> => {
        try {
            const deletedResources = await this.groupModel.destroy({
                where: {
                    id,
                },
            });
            return deletedResources;
        } catch (error) {
            if (error instanceof Error) {
                throw new InternalServerException(error);
            }
            throw new InternalServerException();
        }
    };
}

export default GroupService;
