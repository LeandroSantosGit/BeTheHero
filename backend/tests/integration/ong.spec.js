const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "ONG Grupo TransformAÇÃO",
                email: "grupo.transformacao@apad.com.br",
                whatsapp: "92995303228",
                city: "Manaus",
                uf: "AM"
            });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
        expect(response.statusCode).toEqual(200);
    });

    it('must be able to list ONGS', async () => {
        const response = await request(app)
            .get('/ongs');
        expect(response.statusCode).toEqual(200);
    });
});