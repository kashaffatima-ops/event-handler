const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = require('../models/userModel');

describe('Authentication Tests', () => {
    beforeAll(async () => {
        await User.deleteMany(); // Clear existing users before running tests
    });

    let token;

    test('User registration should return 201', async () => {
        const res = await request(app).post('/api/auth/register').send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('User registered successfully');
    });

    test('User login should return token', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'test@example.com',
            password: 'password123'
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');

        token = res.body.token; // Save token for future tests
    });

    test('Accessing protected route without token should return 401', async () => {
        const res = await request(app).get('/api/events');
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Access denied. No token provided.');
    });

    test('Accessing protected route with valid token should return 200', async () => {
        const res = await request(app).get('/api/events').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
