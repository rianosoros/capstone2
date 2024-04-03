const express = require('express');
const router = express.Router();
const PokemonPet = require('../models/PokemonPet');
const InteractionLog = require('../models/InteractionLog');
const authMiddleware = require('../middleware/authMiddleware');


// Adopt a new Pokemon pet
router.post('/adopt-pet', authMiddleware, async (req, res) => {
  try {
    // Assume req.user.id contains the authenticated user's ID
    const { name, speciesId, imageURL } = req.body;
    const newPet = await PokemonPet.create({ name, speciesId, imageURL, userId: req.user.id });
    res.status(201).json({ message: 'Pet adopted successfully', pet: newPet });
  } catch (error) {
    console.error('Error adopting pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Feed the pet
router.post('/feed', authMiddleware, async (req, res) => {
  try {
    const { petId } = req.body;
    const pet = await PokemonPet.findByPk(petId);
    // Perform feeding logic, update pet's hunger level, and log the interaction
    pet.hunger += 10;
    await pet.save();
    await InteractionLog.create({
      interactionType: 'Feed',
      effectOnHunger: 10,
      effectOnHappiness: 5,
      effectOnHealth: 0,
    });
    res.json({ message: 'Pet fed successfully', updatedPet: pet });
  } catch (error) {
    console.error('Error feeding pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Play with the pet
router.post('/play', authMiddleware, async (req, res) => {
  try {
    const { petId } = req.body;
    const pet = await PokemonPet.findByPk(petId);
    // Perform playing logic, update pet's happiness level, and log the interaction
    pet.happiness += 10;
    await pet.save();
    await InteractionLog.create({
      interactionType: 'Play',
      effectOnHunger: 5,
      effectOnHappiness: 10,
      effectOnHealth: 0,
    });
    res.json({ message: 'Pet played with successfully', updatedPet: pet });
  } catch (error) {
    console.error('Error playing with pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Heal the pet
router.post('/heal', authMiddleware, async (req, res) => {
  try {
    const { petId } = req.body;
    const pet = await PokemonPet.findByPk(petId);
    // Perform healing logic, update pet's health level, and log the interaction
    pet.health += 10;
    await pet.save();
    await InteractionLog.create({
      interactionType: 'Heal',
      effectOnHunger: 5,
      effectOnHappiness: 0,
      effectOnHealth: 10,
    });
    res.json({ message: 'Pet healed successfully', updatedPet: pet });
  } catch (error) {
    console.error('Error healing pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all interaction logs for the authenticated user
router.get('/interaction-logs', authMiddleware, async (req, res) => {
  try {
    const interactionLogs = await InteractionLog.findAll({ where: { userId: req.user.id } });
    res.json({ interactionLogs });
  } catch (error) {
    console.error('Error fetching interaction logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all pets for the authenticated user
router.get('/my-pets', authMiddleware, async (req, res) => {
  try {
    const pets = await PokemonPet.findAll({ where: { userId: req.user.id } });
    res.json({ pets });
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get one pet by ID
router.get('/pet/:petId', authMiddleware, async (req, res) => {
  try {
    const { petId } = req.params;
    const pet = await PokemonPet.findByPk(petId);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json({ pet });
  } catch (error) {
    console.error('Error fetching pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a pet's information
router.put('/pet/:petId', authMiddleware, async (req, res) => {
  try {
    const { petId } = req.params;
    const { name, speciesId, imageURL } = req.body;
    const pet = await PokemonPet.findByPk(petId);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    pet.name = name;
    pet.speciesId = speciesId;
    pet.imageURL = imageURL;
    await pet.save();
    res.json({ message: 'Pet updated successfully', updatedPet: pet });
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a pet
router.delete('/pet/:petId', authMiddleware, async (req, res) => {
  try {
    const { petId } = req.params;
    const pet = await PokemonPet.findByPk(petId);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    await pet.destroy();
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
