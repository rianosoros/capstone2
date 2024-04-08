const OneUserPet = require('./userPet');
const db = require('../db');

// Mock the db.query method to simulate database interactions
jest.mock('../db', () => ({
  query: jest.fn(),
}));

describe('OneUserPet model', () => {
  afterEach(() => {
    // Reset the mock after each test to ensure clean state
    jest.clearAllMocks();
  });

  describe('create method', () => {
    it('should create a new pet for a user', async () => {
      // Mock the database response
      db.query.mockResolvedValueOnce({ rows: [] });

      // Mock the database query result
      db.query.mockResolvedValueOnce({
        rows: [{ userId: 1, pokePetId: 1 }],
      });

      const pet = await OneUserPet.create({ userId: 1, pokePetId: 1 });

      // Check if the method returns the correct pet object
      expect(pet).toEqual({ userId: 1, pokePetId: 1 });

      // Check if db.query method is called with correct parameters
      expect(db.query).toHaveBeenCalledTimes(2);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, 1]);
    });

    it('should throw BadRequestError if pet already exists for user', async () => {
      // Mock the database response to simulate duplicate pet entry
      db.query.mockResolvedValueOnce({
        rows: [{ userId: 1, pokePetId: 1 }],
      });

      await expect(
        OneUserPet.create({ userId: 1, pokePetId: 1 })
      ).rejects.toThrowError('Pet already exists for user: 1');

      // Check if db.query method is called with correct parameters
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, 1]);
    });
  });

    it('should return pet data for a given petId', async () => {
      // Mock the database response
      db.query.mockResolvedValueOnce({
        rows: [{ userId: 1, pokePetId: 1 }],
      });

      const pet = await OneUserPet.getPetById(1);

      // Check if the method returns the correct pet object
      expect(pet).toEqual({ userId: 1, pokePetId: 1 });

      // Check if db.query method is called with correct parameters
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
    });

    it('should throw NotFoundError if pet does not exist', async () => {
      // Mock the database response to simulate no pet entry
      db.query.mockResolvedValueOnce({ rows: [] });

      await expect(OneUserPet.getPetById(1)).rejects.toThrowError('No pet found with id: 1');

      // Check if db.query method is called with correct parameters
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
    });
});
