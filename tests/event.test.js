const request = require('supertest');
const app = require('../index');

describe('Event API Tests', () => {
    it('should create an event', async () => {
        const res = await request(app).post('/api/events').send({
            name: 'Team Meeting',
            category: 'Meeting',
            date: '2025-04-20T10:00:00Z'
        });
        expect(res.status).toBe(201);
    });
});
