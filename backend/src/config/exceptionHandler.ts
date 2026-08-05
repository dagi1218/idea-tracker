import { logger } from './winston.js';

export const handleGlobalExceptions = (): void => {
    process.on('uncaughtException', (error: Error) => {
        logger.error(`Uncaught Exception: ${error.message}`);
        if (error.stack) {
            logger.error(error.stack);
        }

        process.exit(1);
    });

    process.on('unhandledRejection', (reason: unknown) => {
        if (reason instanceof Error) {
            logger.error(`Unhandled Promise Rejection: ${reason.message}`);
            if (reason.stack) {
                logger.error(reason.stack);
            }
        } else {
            logger.error(`Unhandled Promise Rejection: ${JSON.stringify(reason)}`);
        }
    });
};