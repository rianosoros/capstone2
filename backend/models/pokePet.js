"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for pokePets. */

class PokePet {
    // Create a pokePet (from data), update db, return new pokePet data.
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
    static async adopt(data) {
        console.log('M 59| adopt data:', data);
        try {
        const result = await db.query(
            `INSERT INTO userpet (userid, pokepetid, name, image)
            SELECT $1, $2, $3, $4
            RETURNING userid, pokepetid, name, image;`,
            [data.userid, data.pokepetid, data.name, data.image]
        );
        const pokePet = result.rows[0];
        if (!pokePet) throw new NotFoundError(`No pokePet: ${userId}, ${pokePetId}`);
        return pokePet;
        } catch (error) {
        console.error('Error adopting pokePet:', error);
        throw new Error('Error adopting pokePet');
        }
    }
  
    // Find all pokePets
    static async findAll() {
        const pokePetRes = await db.query(
            `SELECT *
             FROM pokePets
             ORDER BY Name`,
        );
        return pokePetRes.rows;
    }

    

    // Given a userId and pokePetId, return data about pokePet.
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

    // Update pokePet data with `data`.
    static async update(userId, pokePetId, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
            userId: "user_id",
            pokePetId: "pokePet_id",
            },
        );
        const userIdVarIdx = "$" + (values.length + 1);
        const pokePetIdVarIdx = "$" + (values.length + 2);
    
        const querySql = `UPDATE pokePets
                      SET ${setCols}
                      WHERE userId = ${userIdVarIdx}
                      AND pokePetId = ${pokePetIdVarIdx}
                      RETURNING userId, pokePetId`;
        const result = await db.query(querySql, [...values, userId, pokePetId]);
        const pokePet = result.rows[0];
    
        if (!pokePet) throw new NotFoundError(`No pokePet: ${userId}, ${pokePetId}`);
    
        return pokePet;
    }


    // Delete pokePet from database; returns undefined.
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