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
    async getAppointments(id){
        try {
            const conn = await MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true});
            const db = conn.db('mydb');
            const results = await db.collection('user').find({_id:parseInt(id)}).project({announcements: 1, _id:0}).toArray()//.then();
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
    async login(uid,pwd){
        try {
            const conn = await MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology: true});
            const db = conn.db('mydb');
            const results = await db.collection('user').find({_id:pwd, "name": uid}).toArray();
            await conn.close();
            return results;
        } catch (error) {
            console.log(error);
        }
    }
    async add_appointment(cid,rid,oname,id){
        try {
            const conn = await MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true});
            const db = conn.db('mydb');
            var newquery = {$push:{"announcements":{"childid":cid,"orgid":rid,"organame":oname,"status":0}}};
            const results = await db.collection('user').updateOne({_id:parseInt(id)},newquery,{upsert: true});
            await conn.close();
            return results;
        } catch (error) {
            console.log(error);
        }
    }
    async insert(body){
        try {
            const conn = await MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true});
            const db = conn.db('mydb');
            const result = await db.collection('user').insertOne(body);
            await conn.close();
            console.log(result);
            return result;
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