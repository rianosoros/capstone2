const PokemonPet = require('../models/PokemonPet');

const validatePetExistence = async (req, res, next) => {
  try {
    const { petId } = req.params;
    const pet = await PokemonPet.findByPk(petId);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    next();
  } catch (error) {
    console.error('Error validating pet existence:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { validatePetExistence };
