import * as mongodb from 'mongodb'

export interface Team {
    name: string;
    description?: string;
    members: string[];
    projects: string[];
    _id?: mongodb.ObjectId;
}