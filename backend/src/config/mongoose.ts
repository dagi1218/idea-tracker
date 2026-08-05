import mongoose from 'mongoose';
import { config } from './environments.js'
import { logger } from './winston'


export const connectDatabase = async (): Promise<typeof mongoose> => {
    mongoose.connection.on('connected', () => {
        logger.info('Mongoose connection established successfully');
    });

    mongoose.connection.on('error', (error: Error) => {
        logger.error(`Mongoose connection error: ${error.message}`);
    });

    mongoose.connection.on('disconnected', () => {
        logger.warn('Mongoose disconnected from MongoDB');
    });

    process.on('SIGINT', async () => {
        try {
            await mongoose.connection.close();
            logger.info('Mongoose connection closed due to application termination (SIGINT)');
            process.exit(0);
        } catch (err) {
            logger.error('Error during Mongoose connection closure:', err);
            process.exit(1);
        }
    });

    return await mongoose.connect(config.mongoUri);
}