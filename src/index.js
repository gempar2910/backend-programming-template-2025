const { env, port } = require('./core/config');
const logger = require('./core/logger')('app');
const createServer = require('./core/server'); // Pastikan ini benar

const app = createServer(); // Jangan lupa panggil fungsi!

const listener = app.listen(port, (err) => {
  if (err) {
    logger.fatal(err, 'Failed to start the server.');
    process.exit(1);
  } else {
    logger.info(`Server runs at port ${port} in ${env} environment`);
  }
});

// Tangani error agar server tidak crash
process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught exception.');
  listener.close(() => process.exit(1));
  setTimeout(() => process.abort(), 1000).unref();
});
