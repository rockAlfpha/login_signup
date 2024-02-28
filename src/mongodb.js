const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/student').then(() =>{
    console.log('MongoDb Connected')
}).catch(()=>{
    console.log("Failed to connect")
})

const loginSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
})

const collection = new mongoose.model("collection1", loginSchema);

module.exports = collection;