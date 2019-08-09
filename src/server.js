import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';

// Config File
import config from './config';

// Starting function
(async () => {
  try {
    const app = express();

    // Import Loader Configuration
    require('./loaders').default(app);

    // Create server using http or you can use https for ssl cerfication
    const httpServer = http.createServer(app);
    httpServer.listen(config.port, err => {
      if (err) {
        console.log(err);
        process.exit(1);
      }

      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (e) {
    if (e) throw new Error(e);
  }
})();
