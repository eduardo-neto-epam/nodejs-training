import 'dotenv/config';

import App from './app';
import UserController from './user/user.controller';
import db from './database/config/database.config';

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = new App([new UserController()], PORT, db);

app.listen();
