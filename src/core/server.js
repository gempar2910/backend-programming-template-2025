const cors = require('cors');
const express = require('express');
const pinoHTTP = require('pino-http');
const methodOverride = require('method-override');

const config = require('./config');
const logger = require('./logger')('app');
const routes = require('../api/routes'); // Pastikan path benar
const { errorResponder, errorTypes } = require('./errors');

function createServer() {
  const app = express();

  app.enable('trust proxy');
  app.use(cors());
  app.use(methodOverride('_method'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(pinoHTTP({ logger }));

  logger.info('Middleware dan logging telah diinisialisasi');

  if (config.api && config.api.prefix) {
    app.use(config.api.prefix, routes);
    logger.info(`Routes telah dimuat di prefix: ${config.api.prefix}`);
  } else {
    app.use('/api', routes);
    logger.warn('config.api.prefix tidak ditemukan, menggunakan /api');
  }

  // Middleware untuk menangani route yang tidak ditemukan (404)
  app.use((req, res, next) => {
    logger.warn(
      `404 - Route tidak ditemukan: ${req.method} ${req.originalUrl}`
    );
    next(errorResponder(errorTypes.ROUTE_NOT_FOUND, 'Route not found'));
  });

  // Middleware untuk menangani error
  app.use((error, req, res, next) => {
    logger.error({ error }, `Error terjadi: ${error.message}`);
    res.status(error.status || 500).json({
      statusCode: error.status || 500,
      error: error.code || 'UNKNOWN_ERROR',
      description: error.description || 'Unknown error',
      message: error.message || 'An error has occurred',
    });
  });

  return app;
}

module.exports = createServer;
