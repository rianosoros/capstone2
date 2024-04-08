const request = require('supertest');
const app = require('../server');
const Pet = require('../models/pet');

describe('UserPets Routes', () => {
  describe('GET /userPets/:userId', () => {
    it('should retrieve all UserPets by user ID', async () => {
      const userId = 1; 
      
      const response = await request(app)
        .get(`/userPets/${userId}`)
        .expect(200); // Expecting a successful response with status code 200
      
      expect(response.body).toHaveProperty('userPet');
    });
  });

  describe('GET /userPets/:userId/:userPetId', () => {
    it('should retrieve a UserPet by username and userPet ID', async () => {
      const userId = 1; 
      const userPetId = 1; 
      
      const response = await request(app)
        .get(`/userPets/${userId}/${userPetId}`)
        .expect(200); // Expecting a successful response with status code 200
      
      expect(response.body).toHaveProperty('userPet');
t
    });

  });
  
  describe('DELETE /userPets/:id', () => {
    it('should delete a UserPet by ID', async () => {
      const userPetId = 1; 
      
      const response = await request(app)
        .delete(`/userPets/${userPetId}`)
        .expect(200); // Expecting a successful response with status code 200
      
      expect(response.body).toHaveProperty('deleted', userPetId);
    });
  });
});
