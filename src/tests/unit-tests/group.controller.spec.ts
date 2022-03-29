import { StatusCodes } from 'http-status-codes';

import { mockCreateGroup, mockDeleteGroup, mockGetAll, mockGetGroupById, mockUpdateGroup } from '../helpers';

describe('Group', () => {
    describe('when getGroupById controller method is called with a valid id in req.params', () => {
        it('should call group service method getGroupById once and return the group', async () => {
            const { req, res, next, groupController, mockedGroupServiceInstance, groupMock } = mockGetGroupById();
            await groupController.getGroupById(req, res, next);
            expect(mockedGroupServiceInstance.findById).toBeCalledTimes(1);
            expect(mockedGroupServiceInstance.findById).toReturnWith(groupMock);
        });
        it('should call res.status with 200 and  res.json with group object', async () => {
            const { req, res, next, groupController, groupMock } = mockGetGroupById();
            await groupController.getGroupById(req, res, next);
            expect(res.status).toBeCalledWith(StatusCodes.OK);
            expect(res.json).toBeCalledWith(groupMock);
        });
    });
    describe('when createGroup controller method is called with a valid req.body', () => {
        it('should call group service method createGroup and return the new group id', async () => {
            const { req, res, next, groupController, mockGroupServiceInstance, payload } = mockCreateGroup();
            await groupController.createGroup(req, res, next);
            expect(mockGroupServiceInstance.createGroup).toBeCalledTimes(1);
            expect(mockGroupServiceInstance.createGroup).toReturnWith(payload.id);
        });
        it('should call res.status with 201 created and call res.json with id', async () => {
            const { req, res, next, groupController, payload } = mockCreateGroup();
            await groupController.createGroup(req, res, next);
            expect(res.status).toBeCalledWith(StatusCodes.CREATED);
            expect(res.json).toBeCalledWith(payload.id);
        });
    });
    describe('when updateGroup controller method is called with a valid req.body and valid req.params', () => {
        it('should call group service method updateGroup and return the updated group', async () => {
            const { req, res, next, groupController, mockGroupServiceInstance, updatedGroupMock } = mockUpdateGroup();
            await groupController.updateGroup(req, res, next);
            expect(mockGroupServiceInstance.updateGroup).toBeCalledTimes(1);
            expect(mockGroupServiceInstance.updateGroup).toReturnWith(updatedGroupMock);
        });
        it('should call res.status with 200 and call res.json with updated group', async () => {
            const { req, res, next, groupController, updatedGroupMock } = mockUpdateGroup();
            await groupController.updateGroup(req, res, next);
            expect(res.status).toBeCalledWith(StatusCodes.OK);
            expect(res.json).toBeCalledWith(updatedGroupMock);
        });
    });
    describe('when deleteGroup controller method is called with valid req.params.id', () => {
        it('should call group service method deleteGroup and return the number of groups deleted', async () => {
            const { req, res, next, groupController, mockGroupServiceInstance } = mockDeleteGroup();
            await groupController.deleteGroup(req, res, next);
            expect(mockGroupServiceInstance.deleteGroup).toBeCalledTimes(1);
            expect(mockGroupServiceInstance.deleteGroup).toReturnWith(1);
        });
        it('should call res.status with 204 no content', async () => {
            const { req, res, next, groupController } = mockDeleteGroup();
            await groupController.deleteGroup(req, res, next);
            expect(res.status).toBeCalledWith(StatusCodes.NO_CONTENT);
        });
    });
    describe('when getAll controller method is called', () => {
        it('should call group service method findAll and return an array of groups', async () => {
            const { req, res, next, groupController, mockGroupServiceInstance, groupsFound } = mockGetAll();
            await groupController.getAll(req, res, next);
            expect(mockGroupServiceInstance.findAll).toBeCalledTimes(1);
            expect(mockGroupServiceInstance.findAll).toReturnWith(groupsFound);
        });
        it('should call res.status with 204 no content', async () => {
            const { req, res, next, groupController, groupsFound } = mockGetAll();
            await groupController.getAll(req, res, next);
            expect(res.status).toBeCalledWith(StatusCodes.OK);
            expect(res.json).toBeCalledWith(groupsFound);
        });
    });
});
