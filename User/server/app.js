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

app.post('/uploadimage',async(req,res)=>{
    try {
        const {pwd,url} = req.body;
        res.json({response: await (new Db().uploadurl(pwd,url))});
    } catch (error) {
        console.log(error);
    }
})

app.post('/getmail',async(req,res)=>{
    try {
        const {id} = req.body;
        res.json({response: await (new Db().getmail(id))});
    } catch (error) {
        console.log(error);
    }
})

app.post('/getimgdetails',async(req,res)=>{
    try {
        const {pwd} = req.body;
        res.json({response: await (new Db().getimgdetails(pwd))});
    } catch (error) {
        console.log(error);
    }
})

app.post('/add-appointment',async(req,res)=>{
    try {
        const {cid,rid,oname,id} = req.body;
        res.json({response: await (new Db().add_appointment(cid,rid,oname,id))});
    } catch (error) {
        console.log(error);
    }
})

app.post('/add-appointmentsql',async(req,res)=>{
    try {
        const {cid,id,uname,email} = req.body;
        res.json({response: await (new Sqldb().add_appointment(cid,id,uname,email))});
    } catch (error) {
        console.log(error);
    }
})

app.post('/adoption',async(req,res)=>{
    try {
        const {id} = req.body;
        res.json({response: await (new Sqldb().getadoptions(id))});
    } catch (error) {
        console.log(error);
    }
})

app.post('/getlogin',async(req,res)=>{
    try {
        const {uid,pwd} = req.body;
        console.log(uid+" "+pwd);
        res.json({response: await (new Db().login(uid,pwd))});
    } catch (error) {
        console.log(error);
    }
})

app.post('/appointments', async (req,res)=>{
    try {
        const {id} = req.body;
        console.log(id);
        res.json({response: await (new Db().getAppointments(id))});
    } catch (error) {
        res.json({error})
    }
})

app.post('/register',async(req,res)=>{
    try {
        res.json({response: await (new Db().insert(req.body))});
    } catch (error) {
        console.log(error);
    }
})

//read
//get all appointments

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