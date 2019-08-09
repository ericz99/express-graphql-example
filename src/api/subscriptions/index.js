import { PubSub } from 'apollo-server';

import * as KEY_EVENTS from './key';

export const EVENTS = {
  KEY: KEY_EVENTS
};

export default new PubSub();
