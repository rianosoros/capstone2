"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for pets. */

class Pet {
    /** Create a pet (from data), update db, return new pet data.
     *
     * data should be { userId, pokePetId }
     *
     * Returns { userId, pokePetId }
     *
     * Throws BadRequestError if pet already exists in database.
     **/
    static async create({ userId, pokePetId }) {
        const duplicateCheck = await db.query(
            `SELECT userId, pokePetId
             FROM userPet
             WHERE userId = $1 AND pokePetId = $2`,
            [userId, pokePetId],
        );
    
        if (duplicateCheck.rows[0])
        throw new BadRequestError(`Pet already exists for user: ${userId}`);
    
        const result = await db.query(
            `INSERT INTO userPet (userId, pokePetId)
             VALUES ($1, $2)
             RETURNING userId, pokePetId`,
            [
            userId,
            pokePetId,
            ],
        );
        const pet = result.rows[0];
    
        return pet;
    }

    /** Find all pets for a user.
     *
     * Returns [{ userId, pokePetId }, ...]
     **/

    static async findAll(userId) {
        const petRes = await db.query(
            `SELECT userId, pokePetId
             FROM userPet
             WHERE userId = $1`,
            [userId],
        );
    
        return petRes.rows;

    }

    /** Given a userId and pokePetId, return data about pet.
     *
     * Returns { userId, pokePetId }
     *
     * Throws NotFoundError if not found.
     **/
    static async get(userId, pokePetId) {
        const petRes = await db.query(
            `SELECT userId, pokePetId
             FROM userPet
             WHERE userId = $1 AND pokePetId = $2`,
            [userId, pokePetId],
        );
    
        const pet = petRes.rows[0];
    
        if (!pet) throw new NotFoundError(`No pet found`);
        
        return pet;
    }    
    
    // find userPet by userId
    static async findUserPetByUserId(userId) {
        const petRes = await db.query(
            `SELECT *
             FROM pokePets
             WHERE userId = $1
             ORDER BY Name`,
            [userId],
        );
        return petRes.rows;
    }

    /** Update pet data with `data`.
     *
     * This is a "partial update" --- it only changes provided fields.
     *
     * data can include: { userId, pokePetId }
     *
     * Returns { userId, pokePetId }
     *
     * Throws NotFoundError if not found.
     */

    static async update(userId, pokePetId, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                userId: "user_id",
                pokePetId: "poke_pet_id",
            });
        const userIdVarIdx = "$" + (values.length + 1);
        const pokePetIdVarIdx = "$" + (values.length + 2);
    
        const querySql = `UPDATE userPet
                          SET ${setCols}
                          WHERE userId = ${userIdVarIdx} AND pokePetId = ${pokePetIdVarIdx}
                          RETURNING userId, pokePetId`;
        const result = await db.query(querySql, [...values, userId, pokePetId]);
        const pet = result.rows[0];
    
        if (!pet) throw new NotFoundError(`No pet: ${pokePetId}`);
    
        return pet;
    }

    /** Delete pet from database; returns undefined.
     *
     * Throws NotFoundError if pet not found.
     **/
    static async remove(userId, pokePetId) {
        const result = await db.query(
            `DELETE
             FROM userPet
             WHERE userId = $1 AND pokePetId = $2
             RETURNING userId, pokePetId`,
            [userId, pokePetId],
        );
        const pet = result.rows[0];
    
        if (!pet) throw new NotFoundError(`No pet: ${pokePetId}`);
    }
}

module.exports = Pet;