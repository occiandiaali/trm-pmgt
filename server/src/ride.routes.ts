import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const rideRouter = express.Router();
rideRouter.use(express.json());
 
rideRouter.get("/", async (_req, res) => {
   try {
       const rides = await collections.rides.find({}).toArray();
       res.status(200).send(rides);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

rideRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const ride = await collections.rides.findOne(query);
  
        if (ride) {
            res.status(200).send(ride);
        } else {
            res.status(404).send(`Failed to find a ride: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find a ride: ID ${req?.params?.id}`);
    }
 });

 rideRouter.post("/", async (req, res) => {
    try {
        const ride = req.body;
        const result = await collections.rides.insertOne(ride);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new ride: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new ride.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 rideRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const ride = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.rides.updateOne(query, { $set: ride });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated entry ride: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find ride: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update ride: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 rideRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.rides.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed ride: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove ride: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find ride: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });