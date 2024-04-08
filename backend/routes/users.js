"use strict";

/**
 * Routes for Users.
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users
 */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

/**
 * @swagger
 * /users:
 * 
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user.
 *     description: Adds a new user. This is only for admin users to add new users.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserNew'
 *     responses:
 *       '201':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       '400':
 *         description: Bad request. Invalid user data.
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users.
 *     description: Retrieves list of all users.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
router.get("/", ensureAdmin, async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user by username.
 *     description: Retrieves a user by username.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         description: Username of the user to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /users/{username}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update a user by username.
 *     description: Updates a user with the provided data.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         description: Username of the user to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       '200':
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request. Invalid user data.
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /users/{username}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by username.
 *     description: Deletes a user with the provided username.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         description: Username of the user to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: string
 *                   description: Username of the deleted user.
 *       '401':
 *         description: Unauthorized. Authentication token missing or invalid.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
