const { MongoClient } = require("mongodb");

let db;

async function connectDB() {
    if (db) return db; // Avoid reconnecting

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log("MongoDB Connected");

    db = client.db(process.env.DB_NAME);
    return db;
}

module.exports = connectDB;
