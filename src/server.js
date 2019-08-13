import express from 'express';
import http from 'http';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import typeDefs from './api/typeDefs';
import resolvers from './api/resolvers';
import schemaDirectives from './api/directives';

// Config File
import config, { IN_PROD } from './config';

// Import auth checker
import { checkAuthToken, checkReqAuthToken } from './middlewares';

// Starting function
(async () => {
  try {
    const app = express();

    // Import Loader Configuration
    require('./loaders').default(app);

    // Apollo server configuration
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: !IN_PROD,
      formatError: err => {
        const customError = {
          status: 400,
          data: {
            status: 'error',
            msg: err.message
          }
        };

        return {
          customError,
          ...err
        };
      },
      subscriptions: {
        onConnect: async (connectionParams, webSocket) => {
          if (connectionParams['x-auth-token']) {
            const token = connectionParams['x-auth-token'];
            const me = await checkAuthToken(token, config.secretKey);
            // if object exist
            if (typeof me === 'object' && me) {
              if (me.role !== 'ADMIN') {
                throw new AuthenticationError('You are not authorized to view this resource.');
              }

              // return data
              return {
                me
              };
            }
          }

          throw new Error('Missing auth token!');
        }
      },
      context: async ({ req, res, connection }) => {
        if (connection) {
          // check connection for metadata
          return connection.context;
        } else {
          // check for auth token
          const me = await checkReqAuthToken(req, config.secretKey);
          // if object exist
          if (typeof me === 'object' && me) {
            // return data
            return {
              me,
              req,
              res
            };
          }

          return {
            req
          };
        }
      }
    });

    // app is from an existing express app
    server.applyMiddleware({ app, cors: false });
    // Create server using http or you can use https for ssl cerfication
    const httpServer = http.createServer(app);
    // install subscription
    server.installSubscriptionHandlers(httpServer);
    // listen on server post
    httpServer.listen(config.port, err => {
      if (err) {
        console.log(err);
        process.exit(1);
      }

      console.log(`Server is listening on port http://localhost:${config.port}/graphql`);
    });
  } catch (e) {
    if (e) throw new Error(e);
  }
})();
