'use strict';

const {Env} = require(`../../constants`);

const LOG_FILE = `./logs/api.log`
const isDevMode = process.env.NODE_ENV === Env.DEVELOPMENT;
const defaultLogLevel = isDevMode ? `info` : `error`;

const logger = require(`pino`)({
  name: `api`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  prettyPrint: { colorize: true }
}, isDevMode ? process.stdout : pino.destination(LOG_FILE));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
