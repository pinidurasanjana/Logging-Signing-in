const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3020

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
mongoose.connect('mongodb://localhost:27017/user')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb is started.")
})

const userShema = new mongoose.Schema({
    name:String,
    id_no:String,
    age:String
})

const Users = mongoose.model('collection',userShema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})

app.post('/post',async(req,res)=>{
    const {name,id_no,age} = req.body
    const user = new Users({
        name,
        id_no,
        age
    })
    await user.save()
    console.log(user)
    res.send("Form Submitted..")
})

app.get('/userlist',async(req,res)=>{
    try{
        const users = await Users.find()
        res.render('form1',{users})
    }catch(err){
        console.log("Error fetching data")
    }
})

app.listen(port,()=>{
    console.log("Server is running...")
})
