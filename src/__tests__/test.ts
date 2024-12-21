import request from 'supertest';
import { createApp } from '../app';

describe('App Test', () => {
  const app = createApp();

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
  });
});
