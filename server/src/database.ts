import * as mongodb from "mongodb";
import { Ride } from "./ride";
import { Team } from "./team";

export const collections: {
    rides?: mongodb.Collection<Ride>;
    teams?: mongodb.Collection<Team>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("rideRental");
    await applySchemaValidation(db);

    const ridesCollection = db.collection<Ride>("rides");
    const teamsCollection = db.collection<Team>("teams");
    collections.rides = ridesCollection;
    collections.teams = teamsCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "model", "year", "cost", "available"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                model: {
                    bsonType: "string",
                    description: "'model' is required and is a string",
                    minLength: 3
                },
                year: {
                    bsonType: "string",
                    description: "'year' is required and is a string",
                },
                cost: {
                    bsonType: "number",
                    description: "'cost' is required and is a number",
                    minLength: 3
                },
                available: {
                    bsonType: "string",
                    description: "'available' is required and is one of 'yes', or 'no'",
                    enum: ["yes", "no"],
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "rides",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("rides", { validator: jsonSchema });
        }
    });
}