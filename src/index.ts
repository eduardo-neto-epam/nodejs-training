/**
 * Required imports to run compiled version from dist folder
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'dotenv/config';

import App from './app';
import { User } from './entities/user/user.model';
import { Group } from './entities/group/group.model';
import UserController from './entities/user/user.controller';
import GroupController from './entities/group/group.controller';
import UserGroupController from './entities/user_group/userGroup.controller';
import db from './database/config/database.config';

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = new App([new UserController(), new GroupController(), new UserGroupController(User, Group)], PORT, db);

app.listen();
