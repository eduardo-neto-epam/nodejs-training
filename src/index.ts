import App from './app';
import UserController from './user/user.controller';
import InMemoryDatabase from './database';
import { IUser } from './user/user.interfaces';

const app = new App([new UserController(new InMemoryDatabase<IUser>())], 3000);

app.listen();
