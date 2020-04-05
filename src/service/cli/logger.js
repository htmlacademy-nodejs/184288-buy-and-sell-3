'use strict';

const logger = require(`pino`)({
  name: `api`,
  level: process.env.LOG_LEVEL || `info`,
  prettyPrint: { colorize: true }
});

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
