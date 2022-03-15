import fs from 'fs';

import { NextFunction, Request, Response } from 'express';
import colors from 'colors';

import { getActualRequestDurationInMilliseconds, replacePassword } from '../utils';

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const current_datetime = new Date();
        const formatted_date =
            current_datetime.getFullYear() +
            '-' +
            (current_datetime.getMonth() + 1) +
            '-' +
            current_datetime.getDate() +
            ' ' +
            current_datetime.getHours() +
            ':' +
            current_datetime.getMinutes() +
            ':' +
            current_datetime.getSeconds();
        const method = req.method;
        const headers = req.headers;
        const url = req.url;
        const body = req.body;
        const status = res.statusCode;
        const start = process.hrtime();
        const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
        const log = `[${colors.blue(formatted_date)}] 
            Method: ${method}
            headers: ${JSON.stringify(headers)};
            URL: ${url}
            body: ${body.password ? JSON.stringify(replacePassword(body)) : JSON.stringify(body)}
            ${status < 300 ? colors.green(status.toString()) : colors.red(status.toString())} 
            ${colors.magenta(durationInMilliseconds.toLocaleString() + 'ms')}`;
        console.log(log);
        fs.appendFile('request_logs.txt', log + '\n', (err) => {
            if (err) {
                console.log(err);
            }
        });
        next();
    } catch (error) {
        console.log({ error });
        next(error);
    }
};

export default requestLogger;
