import * as mongodb from 'mongodb'

export interface Ride {
    name: string;
    model: string;
    year: string;
    cost: number;
    available: "yes" | "no";
    _id?: mongodb.ObjectId;
}