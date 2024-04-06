"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for interactions. */

class Interaction {
    /** Create an interaction (from data), update db, return new interaction data.
     *
     * data should be { userId, pokePetId, interactionType }
     *
     * Returns { userId, pokePetId, interactionType }
     *
     * Throws BadRequestError if interaction already exists in database.
     **/
    static async create({ userId, pokePetId, interactionType }) {
        const duplicateCheck = await db.query(
            `SELECT userId, pokePetId, interactionType
             FROM interactions
             WHERE userId = $1 AND pokePetId = $2 AND interactionType = $3`,
            [userId, pokePetId, interactionType],
        );
    
        if (duplicateCheck.rows[0])
        throw new BadRequestError(`Interaction already exists for user: ${userId}`);
    
        const result = await db.query(
            `INSERT INTO interactions (userId, pokePetId, interactionType)
             VALUES ($1, $2, $3)
             RETURNING userId, pokePetId, interactionType`,
            [
            userId,
            pokePetId,
            interactionType,
            ],
        );
        const interaction = result.rows[0];
    
        return interaction;
    }

    /** Find all interactions for a user.
     *
     * Returns [{ userId, pokePetId, interactionType }, ...]
     **/
    static async findAll(userId) {
        const interactionRes = await db.query(
            `SELECT userId, pokePetId, interactionType
             FROM interactions
             WHERE userId = $1`,
            [userId],
        );
    
        return interactionRes.rows;
    }

    /** Given a userId, pokePetId, and interactionType, return data about interaction.
     *
     * Returns { userId, pokePetId, interactionType }
     *
     * Throws NotFoundError if not found.
     **/
    static async get(userId, pokePetId, interactionType) {
        const interactionRes = await db.query(
            `SELECT userId, pokePetId, interactionType
             FROM interactions
             WHERE userId = $1 AND pokePetId = $2 AND interactionType = $3`,
            [userId, pokePetId, interactionType],
        );
    
        const interaction = interactionRes.rows[0];
    
        if (!interaction) throw new NotFoundError(`No interaction found`);
    
        return interaction;
    }

    /** Delete an interaction from the database. */
    static async remove(userId, pokePetId, interactionType) {
        let result = await db.query(
            `DELETE
             FROM interactions
             WHERE userId = $1 AND pokePetId = $2 AND interactionType = $3
             RETURNING userId, pokePetId, interactionType`,
            [userId, pokePetId, interactionType],
        );
        const interaction = result.rows[0];
    
        if (!interaction) throw new NotFoundError(`No interaction found`);
    }
}

module.exports = Interaction;