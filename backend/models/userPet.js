const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for pets. */
class OneUserPet {

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
            `SELECT userid, pokepetid
             FROM userpet
             WHERE userid = $1 AND pokepetid = $2`,
            [userId, pokePetId],
        );
    
        if (duplicateCheck.rows[0])
        throw new BadRequestError(`Pet already exists for user: ${userId}`);
    
        const result = await db.query(
            `INSERT INTO userpet (userid, pokepetid)
             VALUES ($1, $2)
             RETURNING userid, pokepetid`,
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
            `SELECT userid, pokepetid
             FROM userpet
             WHERE userid = $1`,
            [userId],
        );
    
        return petRes.rows;
    }

    /** Given a userId and pokePetId, return data about pet.
     *
     * Returns { userId }
     *
     * Throws NotFoundError if not found.
     **/
    static async getPetById(petid) {
        console.log('b 63| petid:', petid);
        const petRes = await db.query(
            `SELECT *
            FROM userpet
            WHERE id = $1`,
            [petid]
        );
        const pet = petRes.rows[0];
        if (!pet) throw new NotFoundError(`No pet found`);
        return pet;
    }

    /** Delete pet with given userId and pokePetId.
     *
     * Returns { userId, pokePetId }
     *
     * Throws NotFoundError if pet not found.
     **/
    static async remove(userId, pokePetId) {
        const result = await db.query(
            `DELETE
             FROM userpet
             WHERE userid = $1 AND pokepetid = $2
             RETURNING userid, pokepetid`,
            [userId, pokePetId],
        );
        const pet = result.rows[0];
    
        if (!pet) throw new NotFoundError(`No pet: ${userId}, ${pokePetId}`);
    
        return pet;
    }
}

module.exports = OneUserPet;