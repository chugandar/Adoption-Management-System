const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017";
const ip = require("./input.json")
// MongoClient.connect(url,{useUnifiedTopology: true},(err, client) => {
//     if(err) throw err;
//     console.log("Database connected");
//     const db = client.db('mydb');
//     // db.collection('user').find().toArray().then(results => {
//     //     console.log(results);
//     //     client.close();
//     // }).catch(err => console.error(err));

// });

// let instance=null;

class Db{
    // instance: Db
    static getDbInstance(){
        return instance ? instance : new Db();
    }
    /**
     * Return announcements
     */
    async getAnnouncements(){
        try {
            const conn = await MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true});
            const db = conn.db('mydb');
            const results = await db.collection('user').find({_id:2}).project({announcements: 1, _id:0}).toArray()//.then();
            await conn.close();
            return results;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Return all announcements
     */
    async getAll(){
        try {
            const conn = await MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true});
            const db = conn.db('mydb');
            const results = await db.collection('user').find().toArray()
            await conn.close();
            return results;
        } catch (error) {
            throw Error('could not connect db');
            // console.log(error);
        }
    }
    async insert(){
        try {
            const conn = await MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true});
            const db = conn.db('mydb');
            await db.collection('user').insertOne(ip);
            await conn.close();
        } catch (error) {
            console.log(error);
        }
    }
}
// const ins = new Db();
// ins.insert();
// console.log("hi");
// // console.log(ins.getAnnouncements());
// ins.getAnnouncements().then(results=>{
//     console.log(results);
// }).catch(err=>{console.log(err);})
module.exports = Db;