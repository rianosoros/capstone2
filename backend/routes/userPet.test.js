const request = require('supertest');
const app = require('../server'); 
const OneUserPet = require('../models/userPet');

describe('UserPet Routes', () => {
  describe('GET /userPets/:petId', () => {
    it('should retrieve a pet by its ID', async () => {
      const petId = 1; 
      
      const response = await request(app)
        .get(`/userPets/${petId}`)
        .expect(200); // Expecting a successful response with status code 200
      
      expect(response.body).toHaveProperty('pet');
    });

    it('should return 404 for non-existent pet', async () => {
      const petId = 100; 
    
      const response = await request(app)
        .get(`/userPets/${petId}`)
        .expect(404); // Expecting a 404 Not Found
    });
  });

  describe('POST /userPets/:petId/interact', () => {
    it('should interact with a pet', async () => {
      const petId = 1; 
      const interactionData = { interactionType: 'feed' }; // Replace with valid interaction data
      
      const response = await request(app)
        .post(`/userPets/${petId}/interact`)
        .send(interactionData)
        .expect(200); // Expecting a successful response with status code 200
      
      expect(response.body).toHaveProperty('pet');
    });

    it('should return 400 for invalid interaction type', async () => {
      const petId = 1; 
      const interactionData = { interactionType: 'invalid' }; 
      
      const response = await request(app)
        .post(`/userPets/${petId}/interact`)
        .send(interactionData)
        .expect(400); // Expecting a 400 Bad Request
    });
  });
});
