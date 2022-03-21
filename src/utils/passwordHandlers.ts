export const omitPassword = <T extends { password: string }>(user: T): Omit<T, 'password'> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const replacePassword = <T extends { password: string }>(user: T): T => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
        ...userWithoutPassword,
        password: 'xxxxxxx',
    } as T;
};
