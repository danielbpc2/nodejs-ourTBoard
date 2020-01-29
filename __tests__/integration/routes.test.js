import request from 'supertest';
import app from '../../src/index';

import truncate from '../util/truncate';

let token = '';
const newUser = {
  active: true,
  email: 'cassio@gmail.com',
  id: 1,
  name: 'Cassio Carvs II',
};

beforeAll(async () => {
  await truncate();
});

describe('User', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Cassio Carvs II',
        email: 'cassio@gmail.com',
        password: '123123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject(newUser);
  });

  it('should make auth and create session', async () => {
    const res = await request(app)
      .post('/session')
      .send({
        email: 'cassio@gmail.com',
        password: '123123',
      });
    expect(res.statusCode).toEqual(200);
    token = res.body.token;
  });

  it('should make call users endpoint', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      users: [
        {
          id: 1,
          name: 'Cassio Carvs II',
          email: 'cassio@gmail.com',
          active: true,
        },
      ],
    });
  });
});

afterAll(async () => {
  await app.close();
});
