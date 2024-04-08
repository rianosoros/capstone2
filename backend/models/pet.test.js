const Pet = require('./pet');

describe('Pet Model', () => {
  // Test for the create method
  describe('create', () => {
    it('should create a new pet with valid data', async () => {
      const newPet = await Pet.create({ userId: 1, pokePetId: 1 });
      expect(newPet).toBeDefined();
      expect(newPet.userId).toEqual(1);
      expect(newPet.pokePetId).toEqual(1);
    });

    it('should throw BadRequestError for duplicate pet', async () => {
      await expect(Pet.create({ userId: 1, pokePetId: 1 })).rejects.toThrowError('Pet already exists for user');
    });
  });

  // Test for the findAll method
  describe('findAll', () => {
    it('should return all pets for a user', async () => {
      const pets = await Pet.findAll(1); // Assuming user id 1 exists
      expect(pets).toBeDefined();
      expect(pets.length).toBeGreaterThan(0);
    });
  });

  // Test for the get method
  describe('get', () => {
    it('should return pet data by userId and pokePetId', async () => {
      const pet = await Pet.get(1, 1); // Assuming user id 1 and pokePetId 1 exist
      expect(pet).toBeDefined();
      expect(pet.userId).toEqual(1);
      expect(pet.pokePetId).toEqual(1);
    });

    it('should throw NotFoundError for non-existent pet', async () => {
      await expect(Pet.get(1, 100)).rejects.toThrowError('No pet found');
    });
  });

  // Test for the getAllUserPetsByUserId method
  describe('getAllUserPetsByUserId', () => {
    it('should return all pets for a user by userId', async () => {
      const pets = await Pet.getAllUserPetsByUserId(1); // Assuming user id 1 exists
      expect(pets).toBeDefined();
      expect(pets.length).toBeGreaterThan(0);
    });
  });

  // Test for the update method
  describe('update', () => {
    it('should update pet data with valid data', async () => {
      const updatedPet = await Pet.update(1, 1, { userId: 2, pokePetId: 2 });
      expect(updatedPet).toBeDefined();
      expect(updatedPet.userId).toEqual(2);
      expect(updatedPet.pokePetId).toEqual(2);
    });

    it('should throw NotFoundError for non-existent pet', async () => {
      await expect(Pet.update(1, 100, { userId: 2, pokePetId: 2 })).rejects.toThrowError('No pet');
    });
  });

  // Test for the getPetById method
  describe('getPetById', () => {
    it('should return pet data by petId', async () => {
      const pet = await Pet.getPetById(1); // Assuming pet id 1 exists
      expect(pet).toBeDefined();
      expect(pet.userId).toEqual(1);
      expect(pet.pokePetId).toEqual(1);
    });

    it('should throw NotFoundError for non-existent pet', async () => {
      await expect(Pet.getPetById(100)).rejects.toThrowError('No pet found');
    });
  });

  // Test for the remove method
  describe('remove', () => {
    it('should remove a pet by userId and pokePetId', async () => {
      const removedPet = await Pet.remove(1, 1); // Assuming user id 1 and pokePetId 1 exist
      expect(removedPet).toBeDefined();
      expect(removedPet.userId).toEqual(1);
      expect(removedPet.pokePetId).toEqual(1);
    });

    it('should throw NotFoundError for non-existent pet', async () => {
      await expect(Pet.remove(1, 100)).rejects.toThrowError('No pet');
    });
  });
});
