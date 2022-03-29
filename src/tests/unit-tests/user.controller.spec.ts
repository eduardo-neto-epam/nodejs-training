import { StatusCodes } from 'http-status-codes';

import { IUserDto } from '../../entities/user/user.interfaces';
import User from '../../entities/user/user.model';
import { omitPassword } from '../../utils';
import {
    mockCreateUser,
    mockDeleteUser,
    mockGetSuggestions,
    mockGetUserById,
    mockLoginUser,
    mockUpdateUser,
} from '../helpers';

describe('user', () => {
    describe('when createUser method is called with a valid request.body', () => {
        it('service method createUser should be called once', async () => {
            const { userController, mockUserServiceInstance, req, res, next } = mockCreateUser();
            await userController.createUser(req, res, next);
            expect(mockUserServiceInstance.createUser).toBeCalledTimes(1);
        });
        it('res.status should be called with 201 created', async () => {
            const { userController, req, res, next } = mockCreateUser();
            await userController.createUser(req, res, next);
            expect(res.status).toBeCalledWith(StatusCodes.CREATED);
        });
        it('res.json should be called with userId object', async () => {
            const { userController, req, res, next, payload } = mockCreateUser();
            await userController.createUser(req, res, next);
            expect(res.json).toBeCalledWith({ userId: payload.id });
        });
        it('UserModal methods findOne and build should be called once and build should return a user', async () => {
            const { userService, payload, mockUserModel, mockedUser } = mockCreateUser();
            await userService.createUser(payload);
            expect(mockUserModel.findOne).toHaveBeenCalledTimes(1);
            expect(mockUserModel.build).toHaveBeenCalledTimes(1);
            expect(mockUserModel.build).toReturnWith(mockedUser);
        });
        it('User save method should be called, getDataValue should return the id matching the userId returned by UserService.createUser call', async () => {
            const { userService, payload, mockedUser, mockedUserResult } = mockCreateUser();
            const userId = await userService.createUser(payload);
            expect(mockedUser.save).toHaveBeenCalled();
            expect(mockedUser.save).toReturnWith(mockedUserResult);
            expect(mockedUser.getDataValue).toHaveBeenCalled();
            expect(mockedUser.getDataValue).toReturnWith(payload.id);
            expect(userId).toEqual(payload.id);
        });
    });
    describe('when login method is called with a valid req.body', () => {
        it('service method loginUser should be called once', async () => {
            const { req, res, next, userController, mockUserServiceInstance } = mockLoginUser();
            await userController.login(req, res, next);
            expect(mockUserServiceInstance.loginUser).toBeCalledTimes(1);
        });
        it('res.status should be called with 200 OK', async () => {
            const { userController, req, res, next } = mockLoginUser();
            await userController.login(req, res, next);
            expect(res.status).toBeCalledWith(StatusCodes.OK);
        });
        it('res.json should be called with user object', async () => {
            const { userController, req, res, next, userMock } = mockLoginUser();
            await userController.login(req, res, next);
            expect(res.json).toBeCalledWith({
                data: omitPassword(userMock),
                token: 'fake_token',
            });
        });
        it('UserModal methods findAll should be called once', async () => {
            const { req, userService, mockUserModel } = mockLoginUser();
            const { login, password } = req.body;
            await userService.loginUser(login, password);
            expect(mockUserModel.findAll).toHaveBeenCalledTimes(1);
        });
        it('service should return an object with key data of type Omit<UserAttributes, "password"> and key token of type string', async () => {
            const { req, userService, userMock } = mockLoginUser();
            const { login, password } = req.body;
            const returnedValue = await userService.loginUser(login, password);
            expect(returnedValue).toMatchObject<IUserDto>({
                data: omitPassword(userMock),
                token: 'fake_token',
            });
        });
    });
    describe('when getUserById method is called with a valid id param', () => {
        it('should call service method findById', async () => {
            const { req, res, next, userController, mockUserServiceInstance } = mockGetUserById();
            await userController.getUserById(req, res, next);
            expect(mockUserServiceInstance.findById).toBeCalledTimes(1);
        });
        it('userModel method findByPk should be called with req.params.id', async () => {
            const { req, userService, mockUserModel, userMock } = mockGetUserById();
            const { id } = req.params;
            const returnedValue = await userService.findById(id);
            expect(mockUserModel.findByPk).toBeCalledTimes(1);
            expect(returnedValue).toMatchObject<User>({
                ...userMock,
            } as unknown as User);
        });
        it('response.status should be called with 200 Ok', async () => {
            const { req, res, next, userController } = mockGetUserById();
            await userController.getUserById(req, res, next);
            expect(res.status).toBeCalledWith(StatusCodes.OK);
        });
        it('response.json should be called with expected object', async () => {
            const { req, res, next, userController, userMock } = mockGetUserById();
            await userController.getUserById(req, res, next);
            expect(res.json).toBeCalledWith({
                ...userMock,
            });
        });
    });
    describe('when updateUser method is called with a valid req.body', () => {
        it('should call service method updateUser', async () => {
            const { req, res, next, userController, mockUserServiceInstance } = mockUpdateUser();
            await userController.updateUser(req, res, next);
            expect(mockUserServiceInstance.updateUser).toBeCalledTimes(1);
        });
        it('userModel method update should be called with a payload to update and an id to select user from Db', async () => {
            const { req, userService, mockUserModel, userMock, payload } = mockUpdateUser();
            const { id } = req.params;
            const returnedValue = await userService.updateUser(id, payload);
            expect(mockUserModel.update).toBeCalledTimes(1);
            expect(returnedValue).toMatchObject<User>({
                ...userMock,
            } as unknown as User);
        });
        it('response.status should be called with 200 Ok', async () => {
            const { req, res, next, userController } = mockUpdateUser();
            await userController.updateUser(req, res, next);
            expect(res.status).toBeCalledWith(StatusCodes.OK);
        });
        it('response.json should be called with expected object', async () => {
            const { req, res, next, userController, userMock } = mockUpdateUser();
            await userController.updateUser(req, res, next);
            expect(res.json).toBeCalledWith({
                ...userMock,
            });
        });
    });
    describe('when deleteUser method is called with a valid id as req.param', () => {
        it('should call service method deleteUser', async () => {
            const { req, res, next, userController, mockUserServiceInstance } = mockDeleteUser();
            await userController.deleteUser(req, res, next);
            expect(mockUserServiceInstance.deleteUser).toBeCalledTimes(1);
        });
        it('userModel method destroy should be called with an id to select user from Db', async () => {
            const { req, userService, mockUserModel } = mockDeleteUser();
            const { id } = req.params;
            const returnedValue = await userService.deleteUser(id);
            expect(mockUserModel.destroy).toBeCalledTimes(1);
            expect(returnedValue).toBe(1);
        });
        it('response.status should be called with 200 Ok', async () => {
            const { req, res, next, userController } = mockDeleteUser();
            await userController.deleteUser(req, res, next);
            expect(res.status).toBeCalledWith(StatusCodes.OK);
        });
        it('response.json should be called with expected string containing number of deleted users', async () => {
            const { req, res, next, userController } = mockDeleteUser();
            await userController.deleteUser(req, res, next);
            expect(res.json).toBeCalledWith(`Deleted 1 user(s).`);
        });
    });
    describe('when getSuggestions method is called with a valid req.query', () => {
        it('should call service method getSuggestions', async () => {
            const { req, res, next, userController, mockUserServiceInstance } = mockGetSuggestions();
            await userController.getSuggestions(req, res, next);
            expect(mockUserServiceInstance.getSuggestions).toBeCalledTimes(1);
        });
        it('userModel method findAll should be called once', async () => {
            const { userService, mockUserModel, params } = mockGetSuggestions();
            await userService.getSuggestions(params);
            expect(mockUserModel.findAll).toBeCalledTimes(1);
        });
        it('response.status should be called with 200 Ok', async () => {
            const { req, res, next, userController } = mockGetSuggestions();
            await userController.getSuggestions(req, res, next);
            expect(res.status).toBeCalledWith(StatusCodes.OK);
        });
        it('response.json should be called with expected array of users', async () => {
            const { req, res, next, userController, processedUsers } = mockGetSuggestions();
            await userController.getSuggestions(req, res, next);
            expect(res.json).toBeCalledWith(processedUsers);
        });
    });
});
