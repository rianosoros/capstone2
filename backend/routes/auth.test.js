const request = require('supertest');
const app = require('../server.js'); 
const User = require('../models/user');

describe('Authentication Routes', () => {
  describe('POST /auth/token', () => {
    it('should return a JWT token for valid username and password', async () => {
      // Assuming a test user with known credentials exists in the database
      const testUser = { username: 'testadmin', password: 'password' };
      
      // Make a POST request to /auth/token with the test user credentials
      const response = await request(app)
        .post('/auth/token')
        .send(testUser)
        .expect(200); // Expecting a successful response with status code 200
      
      // Validate that the response contains a token
      expect(response.body).toHaveProperty('token');
    });

    it('should return 400 for invalid username or password', async () => {
      // Make a POST request with invalid credentials
      const response = await request(app)
        .post('/auth/token')
        .send({ username: 'invaliduser', password: 'invalidpassword' })
        .expect(400); // Expecting a 400 Bad Request
      
      // Validate the error response
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /auth/register', () => {
    it('should register a new user and return a JWT token', async () => {
      // Generate random user data for registration
      const userData = {
        username: 'newuser',
        password: 'newpassword',
        email: 'newuser@example.com'
      };
      
      // Make a POST request to register a new user
      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(201); // Expecting a successful registration with status code 201
      
      // Validate that the response contains a token
      expect(response.body).toHaveProperty('token');
      
      const newUser = await User.get(userData.username);
      expect(newUser).toBeDefined();
    });

    it('should return 400 for invalid user registration data', async () => {
      // Make a POST request with invalid user registration data
      const response = await request(app)
        .post('/auth/register')
        .send({}) // Sending empty data to trigger validation errors
        .expect(400); // Expecting a 400 Bad Request
      
      // Validate the error response
      expect(response.body).toHaveProperty('error');
    });
  });
});
