let mongoose = require('mongoose');

//artist scheme
let artistSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    author:{
        type: String,
        required:true
    },
    body:{
        type: String,
        required:true
    }
});

let Artists = module.exports = mongoose.model('Artists', artistSchema);