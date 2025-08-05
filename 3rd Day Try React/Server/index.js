const express = require('express')
const mongoose = require('mongoose')
const cors= require("cors")
const port = 3020

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/students')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb is connected..")
})
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const Users = mongoose.model('detail',userSchema)

app.post('/register',(req,res)=>{
    Users.create(req.body)
    .then(detail => res.json(detail))
    .catch(err => res.json(err))  
})

app.post('/login',(req,res)=>{
    const {email,password} = req.body
    Users.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect.")
            }
        }else{
            res.json("No record exists")
        }
    })
})

app.listen(port,()=>{
    console.log("Server is started..")
})