import { createApp } from './app';
import { logger } from './utils/logger';
require('dotenv').config();


const PORT = process.env.PORT || 3000;

const startServer = () => {
  try {
    const app = createApp();
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(`Server startup error: ${error}`);
    process.exit(1);
  }
};

startServer();
