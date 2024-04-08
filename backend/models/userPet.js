const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class OneUserPet {

    //Create a pet for a user
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

    //Find all pets for a user
    static async findAll(userId) {
        const petRes = await db.query(
            `SELECT userid, pokepetid
             FROM userpet
             WHERE userid = $1`,
            [userId],
        );
    
        return petRes.rows;
    }

    //Find a pet by its id
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

    //save a pet interaction
    static async saveInteraction(pet, petId) {
        const result = await db.query(
            `UPDATE userpet
             SET hunger = $1, happiness = $2, health = $3
             WHERE id = $4
             RETURNING id, hunger, happiness, health`,
            [pet.hunger, pet.happiness, pet.health, petId],
        );
        const interaction = result.rows[0];
        if (!interaction) throw new NotFoundError(`No pet found`);
        return interaction;
    }

    //delete a pet
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