const request = require('supertest');
const app = require('../../src/app');

describe('Health endpoint', () => {
  it('returns service status', async () => {
    const res = await request(app).get('/health').expect(200);

    expect(res.body).toMatchObject({
      status: 'ok',
    });
    expect(typeof res.body.uptime).toBe('number');
  });
});

