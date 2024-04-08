const request = require('supertest');
const app = require('../server'); 
const User = require('../models/user');

describe('Users Routes', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = {
        email: 'test123@gmail.com',
        username: 'test123',
        password: 'password',
      };
      
      const response = await request(app)
        .post('/users')
        .send(newUser)
        .expect(201); // Expecting a successful response with status code 201
      
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');

    });
  });

  describe('GET /users', () => {
    it('should retrieve all users', async () => {
      const response = await request(app)
        .get('/users')
        .expect(200); // Expecting a successful response with status code 200
      
      expect(response.body).toHaveProperty('users');

    });
  });

  describe('GET /users/:username', () => {
    it('should retrieve a user by username', async () => {
      const username = 'testadmin'; 
      
      const response = await request(app)
        .get(`/users/${username}`)
        .expect(200); // Expecting a successful response with status code 200
      
      expect(response.body).toHaveProperty('user');
    });
  });

  describe('PATCH /users/:username', () => {
    it('should update a user by username', async () => {
      const username = 'testadmin'; 
      const updatedUserData = {
        email: 'test@email.com',
        username: 'testadmin',
        password: 'password',
      };
      
      const response = await request(app)
        .patch(`/users/${username}`)
        .send(updatedUserData)
        .expect(200); // Expecting a successful response with status code 200
      
      expect(response.body).toHaveProperty('user');
    });
  });

  describe('DELETE /users/:username', () => {
    it('should delete a user by username', async () => {
      const username = 'testadmin'; 
      
      const response = await request(app)
        .delete(`/users/${username}`)
        .expect(200); // Expecting a successful response with status code 200
      
      expect(response.body).toHaveProperty('deleted', username);
    });
  });
});
