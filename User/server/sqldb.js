const mysql = require('mysql');
const dotenv = require('dotenv');
const e = require('express');
let instance = null;
dotenv.config();
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err)=>{
    if(err) console.log(err);
    else console.log("DB Connected!");
});

class Sqldb{
    static getDbInstance(){
        return instance ? instance : new Sqldb();
    }
    async getOrganisation(){
        try {
            const response = await new Promise((resolve,reject)=>{
                const query = "SELECT REGID, NAME, PHONE_NUMBER,ADDRESS FROM organisation;";
                connection.query(query,(err,results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getadoptions(id){
        try {
            const response = await new Promise((resolve,reject)=>{
                const query = `SELECT CHILD_ID,CHILD_NAME,REG_ID FROM adopted WHERE PARENT_ID=${id};`;
                connection.query(query,(err,results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async add_appointment(cid,id,uname,email){
        try {
            const response = await new Promise((resolve,reject)=>{
                const query = `INSERT INTO shortlisted VALUES(${parseInt(id)},${parseInt(cid)},'${uname}',1,'${email}');`;
                connection.query(query,(err,results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getChild(rid){
        try {
            const response = await new Promise((resolve,reject)=>{
                const query = `SELECT CHILD_ID, NAME, DOB, AGE, GENDER, WEIGHT, HEIGHT, BLOOD_GROUP, REG_ID FROM child WHERE REG_ID=${rid};`;
                connection.query(query,(err,results)=>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = Sqldb;