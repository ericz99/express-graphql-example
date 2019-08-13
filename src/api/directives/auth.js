import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { ensureSignedIn } from '../../auth';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { roles } = this.args;
    field.resolve = function(...args) {
      const [, , context] = args;
      ensureSignedIn(context.req);
      const userRole = context.me.role;

      if (roles && (!userRole || !roles.includes(userRole))) {
        throw new AuthenticationError('You are not authorized to view this resource.');
      }

      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;
