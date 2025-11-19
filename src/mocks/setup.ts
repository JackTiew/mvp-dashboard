// Test setup file - use this in your test configuration
// To use this file, install a testing framework like vitest:
// npm install -D vitest
// Then import: import { beforeAll, afterEach, afterAll } from 'vitest';

import { server } from './server';

// Start server before all tests
// beforeAll(() => {
// 	server.listen({ onUnhandledRequest: 'bypass' });
// });

// Reset handlers after each test
// afterEach(() => {
// 	server.resetHandlers();
// });

// Clean up after all tests
// afterAll(() => {
// 	server.close();
// });

// For now, you can start the server manually in your app:
export const setupMocks = () => {
	server.listen({ onUnhandledRequest: 'bypass' });
};

export const cleanupMocks = () => {
	server.close();
};
