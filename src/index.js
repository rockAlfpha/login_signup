const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('hbs');
const app = express();
const collection = require('./mongodb');
const { urlencoded } = require('body-parser');

app.use(express.json());
app.set('view engine', 'hbs');
app.use(express.urlencoded({
    extended:false
}))

const templatePath = path.join(__dirname, "../templates");
app.set('views', templatePath);

app.get('/', (req, res)=>{
    res.render('login');
})

app.get('/signup', (req, res)=>{
    res.render('signup')
})

app.post('/signup', async (req, res) =>{
    const data = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }

    await collection.insertMany([data]);
    res.render('./home');

})

app.post('/login', async (req, res) =>{
    try{
        const check = await collection.findOne({name:req.body.name});
        if(check.password===req.body.password){
            res.render('home')
        }else{
            res.send("Wrong password");
        }
    }catch{
        res.send("Wrong credentials");
    }
})







app.listen(9000, () =>{
    console.log('Server started at 9000')
});