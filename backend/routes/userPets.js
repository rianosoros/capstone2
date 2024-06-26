//routes for userPets

const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const UserPet = require("../models/pet");

const userPetNewSchema = require("../schemas/petNew.json");
const userPetUpdateSchema = require("../schemas/petUpdate.json");

const router = new express.Router();

//post - create userPet
router.post("/createUserPet", ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, userPetNewSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const userPet = await UserPet.create(req.body);
  return res.status(201).json({ userPet });
});

//get
router.get("/", async function (req, res, next) {
  const userPets = await UserPet.findAll();
  return res.json({ userPets });
});

//get by id
router.get("/:id", async function (req, res, next) {
  const userPet = await UserPet.get(req.params.id);
  return res.json({ userPet });
});

//patch by id
router.patch("/:id", ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, userPetUpdateSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const userPet = await UserPet.update(req.params.id, req.body);
  return res.json({ userPet });
});

//delete by id
router.delete("/:id", ensureAdmin, async function (req, res, next) {
  await UserPet.remove(req.params.id);
  return res.json({ deleted: req.params.id });
});

module.exports = router;