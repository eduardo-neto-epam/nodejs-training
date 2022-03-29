/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model } from 'sequelize/types';

import Group from '../../entities/group/group.model';
import GroupService from '../../entities/group/group.service';
import GroupController from '../../entities/group/group.controller';
import { IGroupAttributes } from '../../entities/group/group.interfaces';

import { mockRequest, mockResponse, mockNext } from './index';

export function createInstance<A extends Model>(c: new () => A): A {
    return new c();
}

export const mockCreateGroup = () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    req.body = {
        name: 'clients',
        permissions: ['READ'],
    };

    const payload: IGroupAttributes = {
        ...req.body,
        id: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockedGroupResult = {
        ...payload,
        save: jest.fn(),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getDataValue: jest.fn().mockImplementationOnce((_id: 'id') => payload.id),
    } as unknown as Group;

    const mockedGroup = {
        ...mockedGroupResult,
        save: jest.fn().mockReturnValueOnce(mockedGroupResult),
    } as unknown as Group;

    const mockGroupModel = {
        findOne: jest.fn().mockResolvedValueOnce(null),
        build: jest.fn().mockReturnValueOnce(mockedGroup),
    } as unknown as typeof Group;

    const mockGroupServiceInstance = {
        createGroup: jest.fn().mockReturnValue(payload.id),
    } as unknown as GroupService;

    const groupService = new GroupService(mockGroupModel);

    const groupController = new GroupController(mockGroupServiceInstance);

    return {
        groupController,
        mockGroupServiceInstance,
        groupService,
        mockGroupModel,
        mockedGroup,
        mockedGroupResult,
        req,
        res,
        next,
        payload,
    };
};

export const mockGetGroupById = () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    req.params = { id: 'some_test_id' };

    const groupMock = {
        id: req.params.id,
        name: 'someGroupName',
        permissions: ['READ', 'SHARE'],
        createdAt: new Date(),
        updatedAt: new Date(),
    } as unknown as Group;

    const mockGroupModel = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        findByPk: jest.fn().mockReturnValue(groupMock),
    } as unknown as typeof Group;

    const mockedGroupServiceInstance = {
        findById: jest.fn().mockReturnValue(groupMock),
    } as unknown as GroupService;

    const groupService = new GroupService(mockGroupModel);

    const groupController = new GroupController(mockedGroupServiceInstance);

    return {
        req,
        res,
        next,
        groupController,
        groupService,
        mockedGroupServiceInstance,
        mockGroupModel,
        groupMock,
    };
};

export const mockUpdateGroup = () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    req.params.id = 'some_test_id';

    req.body = {
        permissions: ['READ'],
    };

    const payload = {
        ...req.body,
        updatedAt: new Date(),
    };

    const updatedGroupMock = {
        id: req.params.id,
        name: 'someGroupName',
        ...payload,
        createdAt: new Date(),
    } as unknown as Group;

    type UpdateOptions = {
        where: {
            id: string;
        };
        returning: boolean;
    };

    type UpdateReturnType = [affectedCount: number, affectedRows: Group[]];

    const mockGroupModel = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        update: jest.fn().mockImplementation((_id: string, _options: UpdateOptions) => {
            return Promise.resolve<UpdateReturnType>([1, [updatedGroupMock]]);
        }),
    } as unknown as typeof Group;

    const mockGroupServiceInstance = {
        updateGroup: jest.fn().mockReturnValue(updatedGroupMock),
    } as unknown as GroupService;

    const groupService = new GroupService(mockGroupModel);

    const groupController = new GroupController(mockGroupServiceInstance);

    return {
        req,
        res,
        next,
        groupController,
        groupService,
        mockGroupServiceInstance,
        mockGroupModel,
        updatedGroupMock,
        payload,
    };
};

export const mockDeleteGroup = () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    req.params.id = 'some_test_id';

    type DeleteId = {
        where: {
            id: string;
        };
    };

    const mockGroupModel = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        destroy: jest.fn().mockImplementation((_options: DeleteId) => {
            return Promise.resolve<number>(1);
        }),
    } as unknown as typeof Group;

    const mockGroupServiceInstance = {
        deleteGroup: jest.fn().mockReturnValue(1),
    } as unknown as GroupService;

    const groupService = new GroupService(mockGroupModel);

    const groupController = new GroupController(mockGroupServiceInstance);

    return {
        req,
        res,
        next,
        groupController,
        groupService,
        mockGroupServiceInstance,
        mockGroupModel,
    };
};

export const mockGetAll = () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    const Group_1 = {
        id: '1',
        name: 'Group1',
        permissions: ['READ'],
        createdAt: new Date(),
        updatedAt: new Date(),
    } as IGroupAttributes;
    const Group_2 = {
        id: '2',
        name: 'Group2',
        permissions: ['READ', 'SHARE'],
        createdAt: new Date(),
        updatedAt: new Date(),
    } as IGroupAttributes;
    const Group_3 = {
        id: '3',
        name: 'Group3',
        permissions: ['READ', 'WRITE', 'UPLOAD_FILES'],
        createdAt: new Date(),
        updatedAt: new Date(),
    } as IGroupAttributes;

    const groupsFound: Group[] = [
        {
            ...Group_1,
            get: jest.fn().mockReturnValue(Group_1),
        } as unknown as Group,
        {
            ...Group_2,
            get: jest.fn().mockReturnValue(Group_2),
        } as unknown as Group,
        {
            ...Group_3,
            get: jest.fn().mockReturnValue(Group_3),
        } as unknown as Group,
    ];

    const mockGroupModel = {
        findAll: jest.fn().mockResolvedValue(groupsFound),
    } as unknown as typeof Group;

    const mockGroupServiceInstance = {
        findAll: jest.fn().mockReturnValue(groupsFound),
    } as unknown as GroupService;

    const groupService = new GroupService(mockGroupModel);

    const groupController = new GroupController(mockGroupServiceInstance);

    return {
        req,
        res,
        next,
        groupController,
        groupService,
        mockGroupServiceInstance,
        mockGroupModel,
        groupsFound,
    };
};
