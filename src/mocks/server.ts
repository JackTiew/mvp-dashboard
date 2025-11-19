// Node.js mock service worker setup (for testing/SSR)
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
