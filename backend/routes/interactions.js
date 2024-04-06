const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Interaction = require("../models/interactionLog");

const interactionNewSchema = require("../schemas/interactionLogNew.json");
const interactionUpdateSchema = require("../schemas/interactionLogUpdate.json");

const router = new express.Router();

//post - create interaction
router.post("/createInteraction", ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, interactionNewSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const interaction = await Interaction.create(req.body);
  return res.status(201).json({ interaction });
});

//get
router.get("/", async function (req, res, next) {
  const interactions = await Interaction.findAll();
  return res.json({ interactions });
});

//get by id
router.get("/:id", async function (req, res, next) {
  const interaction = await Interaction.get(req.params.id);
  return res.json({ interaction });
});

//patch by id
router.patch("/:id", ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, interactionUpdateSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const interaction = await Interaction.update(req.params.id, req.body);
  return res.json({ interaction });
});

//delete by id
router.delete("/:id", ensureAdmin, async function (req, res, next) {
  await Interaction.remove(req.params.id);
  return res.json({ deleted: req.params.id });
});

module.exports = router;