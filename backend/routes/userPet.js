
const express = require("express");
const OneUserPet = require("../models/userPet");

const router = new express.Router();

// Define the route for getting a pet by userId
router.get("/:petId", async function (req, res, next) {
    try {
        const pet = await OneUserPet.getPetById(req.params.petId);
        console.log('b 144| pet:', pet);
        return res.json({ pet });
    } catch (err) {
        return next(err);
    }
  });

// Define the route for interacting with the pet
router.post("/:petId/interact", async function (req, res, next) {
    const { petId } = req.params;
    const { interactionType } = req.body;
    
  
    try {
      // Get the current pet data using Mongoose
      const pet = await OneUserPet.getPetById(petId);
  
      // Determine how much to modify hunger, happiness, and health based on the interaction type
      let hungerChange = 0;
      let happinessChange = 0;
      let healthChange = 0;
  
      switch (interactionType) {
        case "feed":
          hungerChange = -5; // Decrease hunger when feeding
          happinessChange = 2; // Increase happiness when feeding
          healthChange = 5; // Increase health when feeding
          break;
        case "play":
          hungerChange = 1; // Increase hunger slightly when playing
          happinessChange = 5; // Increase happiness when playing
          healthChange = 1; // Increase health slightly when playing
          break;
        case "scold":
          happinessChange = -3; // Decrease happiness when scolding
          healthChange = -2; // Decrease health when scolding
          break;
        // STRETCH GOAL: Implement the abandon interaction
        // case "abandon":
          // delete pet from database
          // await OneUserPet.remove(userId, petId);
          // return res.status(200).json({ message: "Pet has been abandoned" });
        default:
          return res.status(400).json({ message: "Invalid interaction type" });
      }
  
      // Update pet attributes based on the changes calculated above. 
      // Ensure that the values are within the range of 0 to 100.
      pet.hunger = Math.min(100, Math.max(0, pet.hunger + hungerChange)); 
      pet.happiness = Math.min(100, Math.max(0, pet.happiness + happinessChange)); 
      pet.health = Math.min(100, Math.max(0, pet.health + healthChange)); 
  
      // STRETCH GOAL Check if health reaches 0, if so, the pet dies
        //   if (pet.health === 0) {
        //     pet.isAlive = false;
        //   }
  
      // Save the updated pet data to the database
        await OneUserPet.saveInteraction(pet, petId);

      // Return the updated pet data as response
      return res.json(pet);
    } catch (err) {
      return next(err);
    }
  });
  
  

  module.exports = router;