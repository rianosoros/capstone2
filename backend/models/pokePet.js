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

    // find pokePets by search term
    static async find(search) {
        const pokePetRes = await db.query(
            `SELECT *

             FROM pokePets
             WHERE Name ILIKE $1
             ORDER BY Name`,
            [`%${search}%`],
        );
        return pokePetRes.rows;
    }

        // Adopt a pokePet: update db, return updated pokePet.
        // Returns { userId, pokePetId, name, image } 
        // where pokePet is [{ userId, pokePetId, name, image }] 
        // 
        // Throws NotFoundError if not found. 
        // 
        static async adopt(userId, pokePetId) {
        console.log('adopting pokePet', pokePetId, 'for user', userId);
        const result = await db.query(
        `INSERT INTO userPet (userId, pokePetId, name, image)
            SELECT $1, $2, name, image FROM pokePets WHERE id = $2
            RETURNING userId, pokePetId, name, image;`,
        [userId, pokePetId],
        );
        const pokePet = result.rows[0];
        if (!pokePet) throw new NotFoundError(`No pokePet: ${userId}, ${pokePetId}`);
        return pokePet;
        }
    
    /** Find all pokePets
     *
        * Returns [{ Id, pokemonId }, ...]
        * */
    static async findAll() {
        const pokePetRes = await db.query(
            `SELECT *
             FROM pokePets
             ORDER BY Name`,
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