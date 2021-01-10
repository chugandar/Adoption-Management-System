const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
const Db = require('./db');
const Sqldb = require('./sqldb');
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//create

app.post('/child',async(req,res)=>{
    try {
        const {rid} = req.body;
        res.json({response: await (new Sqldb().getChild(rid))});
    } catch (error) {
        console.log(error);
    }
})

app.post('/add-appointment',async(req,res)=>{
    try {
        const {cid,rid,oname} = req.body;
        res.json({response: await (new Db().add_appointment(cid,rid,oname))});
    } catch (error) {
        console.log(error);
    }
})

app.post('/getlogin',async(req,res)=>{
    try {
        const {uid,pwd} = req.body;
        res.json({response: await (new Db().login(uid,pwd))});
    } catch (error) {
        console.log(error);
    }
})

//read
//get all appointments
app.get('/appointments', async (req,res)=>{
    try {
        res.json({response: await (new Db().getAnnouncements())});
    } catch (error) {
        res.json({error})
    }
})

app.get('/organisation',async(req,res)=>{
    try {
        res.json({response: await (new Sqldb().getOrganisation())});
    } catch (error) {
        console.log(error);
    }
})


//update




//delete






app.listen(process.env.PORT,()=>{
    console.log('Ready');
});