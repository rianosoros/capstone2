const request = require('supertest');
const app = require('../server'); 
const PokePet = require('../models/pokePet');

describe('PokePets Routes', () => {
  describe('POST /pokePets/createPokePet', () => {
    it('should create a new PokePet', async () => {
      const newPokePetData = { userId: 1, pokePetId: 1 }; 
      
      const response = await request(app)
        .post('/pokePets/createPokePet')
        .send(newPokePetData)
        .expect(201); // Expecting a successful response with status code 201
      
      expect(response.body).toHaveProperty('pokePet');
    });
  });

  describe('GET /pokePets/search', () => {
    it('should retrieve PokePets matching the search term', async () => {
      const searchTerm = 'charmander'; 
      
      const response = await request(app)
        .get(`/pokePets/search?searchTerm=${searchTerm}`)
        .expect(200); // Expecting a successful response with status code 200
      
      expect(response.body).toHaveProperty('pokePets');
    });
  });

  describe('POST /pokePets/adopt', () => {
    it('should adopt a new PokePet', async () => {
      const petData = { userId: 1, pokePetId: 1, name: 'Charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif' }; // Replace with valid data
      
      const response = await request(app)
        .post('/pokePets/adopt')
        .send(petData)
        .expect(201); // Expecting a successful response with status code 201
      
      expect(response.body).toHaveProperty('pokePet');
    });
  });

  describe('GET /pokePets', () => {
    it('should retrieve all PokePets', async () => {
      const response = await request(app)
        .get('/pokePets')
        .expect(200); // Expecting a successful response with status code 200
      
      expect(response.body).toHaveProperty('pokePets');s
    });
  });

  describe('DELETE /pokePets/:id', () => {
    it('should delete a PokePet by ID', async () => {
      const pokePetId = 1; 
      
      const response = await request(app)
        .delete(`/pokePets/${pokePetId}`)
        .expect(200); // Expecting a successful response with status code 200
      
      expect(response.body).toHaveProperty('deleted');
    });
  });
});
