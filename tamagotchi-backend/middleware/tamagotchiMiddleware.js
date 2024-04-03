const PokemonPet = require('../models/PokemonPet');

const verifyOwnership = async (req, res, next) => {
  try {
    const { petId } = req.body;
    const pet = await PokemonPet.findByPk(petId);
    if (!pet || pet.userId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden - You do not own this pet' });
    }
    next();
  } catch (error) {
    console.error('Error verifying pet ownership:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { verifyOwnership };
