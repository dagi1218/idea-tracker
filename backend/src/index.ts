import { config } from './config/environments.js';
import { connectDatabase } from './config/mongoose.js';
import { createExpressApp } from './config/express.js';
import { handleGlobalExceptions } from './config/exceptionHandler.js';
import { logger } from './config/winston.js';

const startServer = async (): Promise<void> => {

    handleGlobalExceptions();


    await connectDatabase();


    const app = createExpressApp();


    app.listen(config.port, () => {
        logger.info(
            `Server listening in '${config.env}' mode on http://localhost:${config.port}`
        );
    });
};

startServer();