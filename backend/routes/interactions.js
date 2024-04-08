"use strict";

/**
 * Routes for interaction logs.
 * @swagger
 * tags:
 *   name: Interaction Logs
 *   description: Endpoints for managing interaction logs
 */

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Interaction = require("../models/interactionLog");
const jsonschema = require("jsonschema");

const interactionNewSchema = require("../schemas/interactionLogNew.json");
const interactionUpdateSchema = require("../schemas/interactionLogUpdate.json");

const router = new express.Router();

/**
 * @swagger
 * /interactions/createInteraction:
 *   post:
 *     tags:
 *       - Interaction Logs
 *     summary: Create a new interaction log.
 *     description: Creates a new interaction log with the provided data.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InteractionLogNew'
 *     responses:
 *       '201':
 *         description: Interaction log created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 interaction:
 *                   $ref: '#/components/schemas/InteractionLog'
 *       '400':
 *         description: Bad request. Invalid interaction log data.
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
router.post("/createInteraction", ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, interactionNewSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const interaction = await Interaction.create(req.body);
  return res.status(201).json({ interaction });
});

/**
 * @swagger
 * /interactions:
 *   get:
 *     tags:
 *       - Interaction Logs
 *     summary: Get all interaction logs.
 *     description: Retrieves all interaction logs.
 *     responses:
 *       '200':
 *         description: Interaction logs retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 interactions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InteractionLog'
 *       '500':
 *         description: Internal server error.
 */
router.get("/", async function (req, res, next) {
  const interactions = await Interaction.findAll();
  return res.json({ interactions });
});

/**
 * @swagger
 * /interactions/{id}:
 *   get:
 *     tags:
 *       - Interaction Logs
 *     summary: Get an interaction log by ID.
 *     description: Retrieves an interaction log by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the interaction log to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Interaction log retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InteractionLog'
 *       '404':
 *         description: Interaction log not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/:id", async function (req, res, next) {
  const interaction = await Interaction.get(req.params.id);
  return res.json({ interaction });
});

/**
 * @swagger
 * /interactions/{id}:
 *   patch:
 *     tags:
 *       - Interaction Logs
 *     summary: Update an interaction log by ID.
 *     description: Updates an interaction log with the provided data.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the interaction log to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InteractionLogUpdate'
 *     responses:
 *       '200':
 *         description: Interaction log updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InteractionLog'
 *       '400':
 *         description: Bad request. Invalid interaction log data.
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '404':
 *         description: Interaction log not found.
 *       '500':
 *         description: Internal server error.
 */
router.patch("/:id", ensureAdmin, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, interactionUpdateSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const interaction = await Interaction.update(req.params.id, req.body);
  return res.json({ interaction });
});

/**
 * @swagger
 * /interactions/{id}:
 *   delete:
 *     tags:
 *       - Interaction Logs
 *     summary: Delete an interaction log by ID.
 *     description: Deletes an interaction log by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the interaction log to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Interaction log deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: integer
 *                   description: ID of the deleted interaction log
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '404':
 *         description: Interaction log not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete("/:id", ensureAdmin, async function (req, res, next) {
  await Interaction.remove(req.params.id);
  return res.json({ deleted: req.params.id });
});

module.exports = router;
