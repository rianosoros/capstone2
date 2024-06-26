const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const PokePet = require("../models/pokePet");

const pokePetNewSchema = require("../schemas/pokePetNew.json");
const pokePetUpdateSchema = require("../schemas/pokePetUpdate.json");

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