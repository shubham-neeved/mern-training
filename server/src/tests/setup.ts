import mongoose from "mongoose";

import {MongoMemoryServer} from "mongodb-memory-server";    





let mongodbServer:MongoMemoryServer;

beforeAll(async ()=>{
    mongodbServer=await MongoMemoryServer.create();

    const uri=mongodbServer.getUri();
    await mongoose.connect(uri);
    
});
afterEach(async()=>{
    const collection = mongoose.connection.collections;
    for (const key in collection){
        await collection[key].deleteMany({});
    }
});

afterAll(async ()=>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongodbServer.stop();
})


