
const express = require("express");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const OneUserPet = require("../models/userPet");

const userPetNewSchema = require("../schemas/petNew.json");
const userPetUpdateSchema = require("../schemas/petUpdate.json");

const router = new express.Router();

router.get("/:petId", async function (req, res, next) {
    console.log('b 14| req.params:', req.params.petId);
    try {
        const pet = await OneUserPet.getPetById(req.params.petId);
        console.log('b 144| pet:', pet);
        return res.json({ pet });
    } catch (err) {
        return next(err);
    }
  });


  module.exports = router;