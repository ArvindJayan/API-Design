import supertest from 'supertest';
import app from '../server';

describe('GET /', () => {
    it('should return something', async () => {
        const res = await supertest(app).get('/');

        expect(res.body.message).toEqual('Server is up and running');
    });
});