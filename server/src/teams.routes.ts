import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const teamsRouter = express.Router();
teamsRouter.use(express.json());

teamsRouter.get("/", async (_req, res) => {
    try {
        const teams = await collections.teams.find({}).toArray();
        res.status(200).send(teams);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

teamsRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const team = await collections.teams.findOne(query);

        if (team) {
            res.status(200).send(team);
        } else {
            res.status(404).send(`Failed to find a team: ID ${id}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find a team: ID ${req?.params?.id}`);
    }
});

teamsRouter.post("/", async (req, res) => {
    try {
        const team = req.body;
        const result = await collections.teams.insertOne(team);

        if (result.acknowledged) {
            res.status(201).send(`Created a new team: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new team.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

teamsRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const team = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.teams.updateOne(query, { $set: team });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated entry team: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find team: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update team: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

teamsRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.teams.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed team: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove team: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find team: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});