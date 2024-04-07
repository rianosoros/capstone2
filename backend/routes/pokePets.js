const express = require("express");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const PokePet = require("../models/pokePet");

const pokePetNewSchema = require("../schemas/pokePetNew.json");
const pokePetUpdateSchema = require("../schemas/pokePetUpdate.json");
const petNewSchema = require("../schemas/petNew.json");

const router = new express.Router();

//post - create pokePet
router.post("/createPokePet", ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, pokePetNewSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const pokePet = await PokePet.create(req.body);
  return res.status(201).json({ pokePet });
});

//search
router.get('/search', async (req, res) => {
  const searchTerm = req.query.searchTerm; 
  try {
    const searchResults = await PokePet.find(searchTerm); 
    res.json({ pokePets: searchResults }); 
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// adopt
router.post('/adopt', ensureAdmin, async function (req, res, next) {
  console.log('b routes 38| request.body:', req.body);
  const validator = jsonschema.validate(req.body, petNewSchema);
  if (!validator.valid) {
     const errs = validator.errors.map(e => e.stack);
     throw new BadRequestError(errs);
  }
  console.log('b routes 37| request.body:', req.body);

  try {
    const pokePet = await PokePet.adopt(req.body);
    console.log('b route 46| adopt post pokePet:', res.pokePet);
    return res.status(201).json({ pokePet });
  } catch (error) {
    console.error('Error adopting pokePet:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.post("/createUserPet", ensureAdmin, async function (req, res, next) {
//   const validator = jsonschema.validate(req.body, userPetNewSchema);
//   if (!validator.valid) {
//     const errs = validator.errors.map(e => e.stack);
//     throw new BadRequestError(errs);
//   }

//   const userPet = await UserPet.create(req.body);
//   return res.status(201).json({ userPet });
// });

//get
router.get("/", async function (req, res, next) {
  const pokePets = await PokePet.findAll();
  return res.json({ pokePets });
});

//get by id
router.get("/:id", async function (req, res, next) {
  const pokePet = await PokePet.get(req.params.id);
  return res.json({ pokePet });
});

//patch by id
router.patch("/:id", ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, pokePetUpdateSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const pokePet = await PokePet.update(req.params.id, req.body);
  return res.json({ pokePet });
});

//delete by id
router.delete("/:id", ensureAdmin, async function (req, res, next) {
  await PokePet.remove(req.params.id);
  return res.json({ deleted: req.params.id });
});

module.exports = router;