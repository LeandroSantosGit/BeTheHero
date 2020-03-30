const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENT', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create new INCIDENT', async () => {
        const response = await request(app)
            .post('/incidents')
            .set('Authorization', '7f88f4d8')
            .send({
                title: "Caso teste",
                description: "Detalhes do caso",
                value: 120
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('id');
    });
});