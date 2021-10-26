import 'dotenv/config';

import App from './app';
import UserController from './user/user.controller';

const PORT = parseInt(process.env.PORT as string);

const app = new App([new UserController()], PORT);

app.listen();
