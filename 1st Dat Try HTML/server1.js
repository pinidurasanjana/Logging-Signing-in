const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const { send } = require('process');
const port = 3020

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true})) // 4th step
app.set('view engine', 'ejs');


// 1st Step
mongoose.connect('mongodb://localhost:27017/users')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection is successfully..")
})
app.listen(port,()=>{
    console.log("Server is running...")
})

// 2nd Step
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form1.html'))
})

// 3rd Step
const userSchema = new mongoose.Schema({
    id_no:String,
    name:String,
    age:String,
    gender:String
})
const Users = mongoose.model("collection",userSchema)

// 4th Step
app.post('/post',async(req,res)=>{
    const {id_no,name,age,gender} = req.body
    const user = new Users({
        id_no,
        name,
        age,
        gender
    })
    await user.save()
    console.log(user)
    res.send("Form submitted..")
})


app.get('/userlist', async(req,res)=>{
    try{
        const users = await Users.find()
        res.render('userlist',{users})
    }
    catch(err){
        res.status(500).send("Error fetching users")
    }
})





