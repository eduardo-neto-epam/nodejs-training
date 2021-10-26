import 'dotenv/config';

import App from './app';
import UserController from './user/user.controller';

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = new App([new UserController()], PORT);

app.listen();
