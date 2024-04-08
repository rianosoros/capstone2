"use strict";

/**
 * Routes for PokePets.
 * @swagger
 * tags:
 *   name: PokePets
 *   description: Endpoints for managing PokePets
 */

const express = require("express");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const PokePet = require("../models/pokePet");

const pokePetNewSchema = require("../schemas/pokePetNew.json");
const pokePetUpdateSchema = require("../schemas/pokePetUpdate.json");
const petNewSchema = require("../schemas/petNew.json");

const router = new express.Router();

/**
 * @swagger
 * /pokePets/createPokePet:
 *   post:
 *     tags:
 *       - PokePets
 *     summary: Create a new PokePet.
 *     description: Creates a new PokePet with the provided data.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PokePetNew'
 *     responses:
 *       '201':
 *         description: PokePet created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pokePet:
 *                   $ref: '#/components/schemas/PokePet'
 *       '400':
 *         description: Bad request. Invalid PokePet data.
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
router.post("/createPokePet", ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, pokePetNewSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const pokePet = await PokePet.create(req.body);
  return res.status(201).json({ pokePet });
});

/**
 * @swagger
 * /pokePets/search:
 *   get:
 *     tags:
 *       - PokePets
 *     summary: Search for PokePets.
 *     description: Retrieves PokePets matching the provided search term.
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Term to search for PokePets.
 *     responses:
 *       '200':
 *         description: PokePets retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pokePets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PokePet'
 *       '500':
 *         description: Internal server error.
 */
router.get('/search', async (req, res) => {
  const searchTerm = req.query.searchTerm; 
  try {
    const searchResults = await PokePet.find(searchTerm); 
    res.json({ pokePets: searchResults }); 
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /pokePets/adopt:
 *   post:
 *     tags:
 *       - PokePets
 *     summary: Adopt a PokePet.
 *     description: Adopts a PokePet with the provided data.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PetNew'
 *     responses:
 *       '201':
 *         description: PokePet adopted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pokePet:
 *                   $ref: '#/components/schemas/PokePet'
 *       '400':
 *         description: Bad request. Invalid Pet data.
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
router.post('/adopt', ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, petNewSchema);
  if (!validator.valid) {
     const errs = validator.errors.map(e => e.stack);
     throw new BadRequestError(errs);
  }

  try {
    const pokePet = await PokePet.adopt(req.body);
    return res.status(201).json({ pokePet });
  } catch (error) {
    console.error('Error adopting PokePet:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /pokePets:
 *   get:
 *     tags:
 *       - PokePets
 *     summary: Get all PokePets.
 *     description: Retrieves all PokePets.
 *     responses:
 *       '200':
 *         description: PokePets retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pokePets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PokePet'
 *       '500':
 *         description: Internal server error.
 */
router.get("/", async function (req, res, next) {
  const pokePets = await PokePet.findAll();
  return res.json({ pokePets });
});

/**
 * @swagger
 * /pokePets/{id}:
 *   patch:
 *     tags:
 *       - PokePets
 *     summary: Update a PokePet by ID.
 *     description: Updates a PokePet with the provided data.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the PokePet to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PokePetUpdate'
 *     responses:
 *       '200':
 *         description: PokePet updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PokePet'
 *       '400':
 *         description: Bad request. Invalid PokePet data.
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '404':
 *         description: PokePet not found.
 *       '500':
 *         description: Internal server error.
 */
router.patch("/:id", ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, pokePetUpdateSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const pokePet = await PokePet.update(req.params.id, req.body);
  return res.json({ pokePet });
});

/**
 * @swagger
 * /pokePets/{id}:
 *   delete:
 *     tags:
 *       - PokePets
 *     summary: Delete a PokePet by ID.
 *     description: Deletes a PokePet by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the PokePet to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: PokePet deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: integer
 *                   description: ID of the deleted PokePet
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '404':
 *         description: PokePet not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete("/:id", ensureAdmin, async function (req, res, next) {
  await PokePet.remove(req.params.id);
  return res.json({ deleted: req.params.id });
});

module.exports = router;
