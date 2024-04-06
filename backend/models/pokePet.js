"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for pokePets. */

class PokePet {
    /** Create a pokePet (from data), update db, return new pokePet data.
     *
     * data should be { userId, pokePetId }
     *
     * Returns { userId, pokePetId }
     *
     * Throws BadRequestError if pokePet already exists in database.
     **/
    static async create({ userId, pokePetId }) {
        const duplicateCheck = await db.query(
            `SELECT userId, pokePetId
             FROM pokePets
             WHERE userId = $1 AND pokePetId = $2`,
            [userId, pokePetId],
        );
    
        if (duplicateCheck.rows[0])
        throw new BadRequestError(`PokePet already exists for user: ${userId}`);
    
        const result = await db.query(
            `INSERT INTO pokePets (userId, pokePetId)
             VALUES ($1, $2)
             RETURNING userId, pokePetId`,
            [
            userId,
            pokePetId,
            ],
        );
        const pokePet = result.rows[0];
    
        return pokePet;
    }

    /** Find all pokePets for a user.
     *
     * Returns [{ userId, pokePetId }, ...]
     **/
    static async findAll(userId) {
        const pokePetRes = await db.query(
            `SELECT userId, pokePetId
             FROM pokePets
             WHERE userId = $1`,
            [userId],
        );
    
        return pokePetRes.rows;

    }

    /** Given a userId and pokePetId, return data about pokePet.
     *
     * Returns { userId, pokePetId }
     *   where pokePet is [{ userId, pokePetId }]
     *
     * Throws NotFoundError if not found.
     **/
    static async get(userId, pokePetId) {
        const pokePetRes = await db.query(
            `SELECT userId, pokePetId
             FROM pokePets
             WHERE userId = $1 AND pokePetId = $2`,
            [userId, pokePetId],
        );
    
        const pokePet = pokePetRes.rows[0];
    
        if (!pokePet) throw new NotFoundError(`No pokePet: ${userId}, ${pokePetId}`);
    
        return pokePet;
    }

    /** Delete pokePet from database; returns undefined.
     *
     * Throws NotFoundError if pokePet not found.
     **/
    static async remove(userId, pokePetId) {
        const result = await db.query(
            `DELETE
             FROM pokePets
             WHERE userId = $1 AND pokePetId = $2
             RETURNING userId, pokePetId`,
            [userId, pokePetId],
        );
        const pokePet = result.rows[0];
    
        if (!pokePet) throw new NotFoundError(`No pokePet: ${userId}, ${pokePetId}`);
    }
}

module.exports = PokePet;