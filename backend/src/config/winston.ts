import winston from 'winston';
import { config } from './environments.js';


const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}


const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magneta',
    debug: 'white',
};

winston.addColors(colors);

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
        (info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`
    ));

const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
);

const transports: winston.transport[] = [
    new winston.transports.Console({
        format: consoleFormat,
    }),

    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: logFormat,
    }),

    new winston.transports.File({
        filename: 'logs/combined.log',
        format: logFormat,
    }),
]

export const logger = winston.createLogger({
    level: config.env === 'development' ? 'debug' : 'info',
    levels,
    transports,
});