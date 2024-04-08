const PokePet = require('./pokePet');

describe('PokePet Model', () => {
  // Test for the create method
  describe('create', () => {
    it('should create a new pokePet with valid data', async () => {
      const newPokePet = await PokePet.create({ userId: 1, pokePetId: 1 });
      expect(newPokePet).toBeDefined();
      expect(newPokePet.userId).toEqual(1);
      expect(newPokePet.pokePetId).toEqual(1);
    });

    it('should throw BadRequestError for duplicate pokePet', async () => {
      await expect(PokePet.create({ userId: 1, pokePetId: 1 })).rejects.toThrowError('PokePet already exists for user');
    });
  });

  // Test for the find method
  describe('find', () => {
    it('should return pokePets by search term', async () => {
      const pokePets = await PokePet.find('search_term');
      expect(pokePets).toBeDefined();
      expect(pokePets.length).toBeGreaterThan(0);
    });
  });

  // Test for the adopt method
  describe('adopt', () => {
    it('should adopt a pokePet with valid data', async () => {
      const adoptedPokePet = await PokePet.adopt({ userId: 1, pokePetId: 1, name: 'Charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif' });
      expect(adoptedPokePet).toBeDefined();
      expect(adoptedPokePet.userId).toEqual(1);
      expect(adoptedPokePet.pokePetId).toEqual(1);
      expect(adoptedPokePet.name).toEqual('Charmander');
      expect(adoptedPokePet.image).toEqual('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif');
    });

    it('should throw NotFoundError for non-existent pokePet', async () => {
      await expect(PokePet.adopt({ userId: 1, pokePetId: 100, name: 'Bulbasaur', image: 'bulbasaur.png' })).rejects.toThrowError('No pokePet');
    });
  });

  // Test for the findAll method
  describe('findAll', () => {
    it('should return all pokePets', async () => {
      const pokePets = await PokePet.findAll();
      expect(pokePets).toBeDefined();
      expect(pokePets.length).toBeGreaterThan(0);
    });
  });

  // Test for the get method
  describe('get', () => {
    it('should return pokePet data by userId and pokePetId', async () => {
      const pokePet = await PokePet.get(1, 1);
      expect(pokePet).toBeDefined();
      expect(pokePet.userId).toEqual(1);
      expect(pokePet.pokePetId).toEqual(1);
    });

    it('should throw NotFoundError for non-existent pokePet', async () => {
      await expect(PokePet.get(1, 100)).rejects.toThrowError('No pokePet');
    });
  });

  // Test for the update method
  describe('update', () => {
    it('should update pokePet data with valid data', async () => {
      const updatedPokePet = await PokePet.update(1, 1, { userId: 2, pokePetId: 2 });
      expect(updatedPokePet).toBeDefined();
      expect(updatedPokePet.userId).toEqual(2);
      expect(updatedPokePet.pokePetId).toEqual(2);
    });

    it('should throw NotFoundError for non-existent pokePet', async () => {
      await expect(PokePet.update(1, 100, { userId: 2, pokePetId: 2 })).rejects.toThrowError('No pokePet');
    });
  });

  // Test for the remove method
  describe('remove', () => {
    it('should remove a pokePet by userId and pokePetId', async () => {
      const removedPokePet = await PokePet.remove(1, 1);
      expect(removedPokePet).toBeDefined();
      expect(removedPokePet.userId).toEqual(1);
      expect(removedPokePet.pokePetId).toEqual(1);
    });

    it('should throw NotFoundError for non-existent pokePet', async () => {
      await expect(PokePet.remove(1, 100)).rejects.toThrowError('No pokePet');
    });
  });
});
