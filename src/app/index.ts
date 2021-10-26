import express from 'express';

import { IController } from '../interfaces/controller.interface';
import errorMiddleware from '../middleware/error.middleware';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: IController[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddleWares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleWares() {
        this.app.use(express.json());
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
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
