"use strict";

/**
 * Routes for UserPets.
 * @swagger
 * tags:
 *   name: UserPets
 *   description: Endpoints for managing UserPets
 */

const express = require("express");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Pet = require("../models/pet");

const userPetNewSchema = require("../schemas/petNew.json");
const userPetUpdateSchema = require("../schemas/petUpdate.json");

const router = new express.Router();

/**
 * @swagger
 * /userPets/createUserPet:
 *   post:
 *     tags:
 *       - UserPets
 *     summary: Create a new UserPet.
 *     description: Creates a new UserPet with the provided data.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPetNew'
 *     responses:
 *       '201':
 *         description: UserPet created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userPet:
 *                   $ref: '#/components/schemas/UserPet'
 *       '400':
 *         description: Bad request. Invalid UserPet data.
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
router.post("/createUserPet", ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, userPetNewSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const userPet = await Pet.create(req.body);
  return res.status(201).json({ userPet });
});

/**
 * @swagger
 * /userPets:
 *   get:
 *     tags:
 *       - UserPets
 *     summary: Get all UserPets.
 *     description: Retrieves all UserPets.
 *     responses:
 *       '200':
 *         description: UserPets retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userPets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserPet'
 *       '500':
 *         description: Internal server error.
 */
router.get("/", async function (req, res, next) {
  const userPets = await Pet.findAll();
  return res.json({ userPets });
});

/**
 * @swagger
 * /userPets/pets/{username}/{userId}:
 *   get:
 *     tags:
 *       - UserPets
 *     summary: Get UserPets by User ID.
 *     description: Retrieves UserPets associated with a specific User ID.
 *     parameters:
 *       - in: path
 *         name: username
 *         description: Username of the user.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         description: ID of the user.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: UserPets retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserPet'
 *       '404':
 *         description: No pets found for the user ID.
 *       '500':
 *         description: Internal server error.
 */
router.get("/:userId", async function (req, res, next) {
  try {
      const userPet = await Pet.getAllUserPetsByUserId(req.params.userId);
      return res.json({ userPet });
  } catch (err) {
      return next(err); 
  }
});


/**
 * @swagger
 * /userPets/{username}/{userPetId}:
 *   get:
 *     tags:
 *       - UserPets
 *     summary: Get a UserPet by username and UserPet ID.
 *     description: Retrieves a UserPet by its username and UserPet ID.
 *     parameters:
 *       - in: path
 *         name: username
 *         description: Username of the user.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userPetId
 *         description: ID of the UserPet.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: UserPet retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPet'
 *       '404':
 *         description: UserPet not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/:userId/:userPetId", async function (req, res, next) {
  try {
    const userPet = await Pet.get(req.params.userId, req.params.userPetId);
    return res.json({ userPet });
  } catch (err) {
    return next(err); 
  }
});

/**
 * @swagger
 * /userPets/id/{id}:
 *   get:
 *     tags:
 *       - UserPets
 *     summary: Get a UserPet by ID.
 *     description: Retrieves a UserPet by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the UserPet.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: UserPet retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPet'
 *       '404':
 *         description: UserPet not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/id/:id", async function (req, res, next) {
  try {
    const userPet = await Pet.get(req.params.id);
    return res.json({ userPet });
  } catch (err) {
    return next(err); 
  }
});


/**
 * @swagger
 * /userPets/{id}:
 *   patch:
 *     tags:
 *       - UserPets
 *     summary: Update a UserPet by ID.
 *     description: Updates a UserPet with the provided data.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the UserPet to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPetUpdate'
 *     responses:
 *       '200':
 *         description: UserPet updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPet'
 *       '400':
 *         description: Bad request. Invalid UserPet data.
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '404':
 *         description: UserPet not found.
 *       '500':
 *         description: Internal server error.
 */
router.patch("/:id", ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, userPetUpdateSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const userPet = await Pet.update(req.params.id, req.body);
  return res.json({ userPet });
});

/**
 * @swagger
 * /userPets/{id}:
 *   delete:
 *     tags:
 *       - UserPets
 *     summary: Delete a UserPet by ID.
 *     description: Deletes a UserPet with the provided ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the UserPet to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: UserPet deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: integer
 *                   description: ID of the deleted UserPet
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '404':
 *         description: UserPet not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete("/:id", ensureAdmin, async function (req, res, next) {
  await Pet.remove(req.params.id);
  return res.json({ deleted: req.params.id });
});

module.exports = router;
