import { Request, Response, NextFunction } from 'express';

export const mockRequest = (): Request => {
    const req: { body?: unknown; params?: unknown; query?: unknown } = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    req.query = jest.fn().mockReturnValue(req);
    return req as unknown as Request;
};

export const mockResponse = (): Response => {
    const res: { send?: unknown; status?: unknown; json?: unknown } = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as unknown as Response;
};

export const mockNext = (): NextFunction => jest.fn() as unknown as NextFunction;

export {
    mockCreateUser,
    mockLoginUser,
    mockGetUserById,
    mockUpdateUser,
    mockDeleteUser,
    mockGetSuggestions,
} from './user.helpers';

export { mockCreateGroup, mockDeleteGroup, mockGetAll, mockGetGroupById, mockUpdateGroup } from './group.helpers';
