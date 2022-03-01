import express from 'express';
import { Sequelize } from 'sequelize/types';

import { IController } from '../interfaces/controller.interfaces';
import errorMiddleware from '../middleware/error.middleware';
import requestLogger from '../middleware/request-logger.midleware';

class App {
    public app: express.Application;
    public port: number;

    private db: Sequelize;

    constructor(controllers: IController[], port: number, db: Sequelize) {
        this.app = express();
        this.port = port;
        this.db = db;

        this.initializeMiddleWares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleWares() {
        this.app.use(express.json());
        this.app.use(requestLogger);
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen(): void {
        this.db
            .sync()
            .then(() => {
                this.app.listen(this.port, () => {
                    console.log(`App listening on the port ${this.port}`);
                });
            })
            .catch((error) => console.error(error));
    }
}

export default App;
