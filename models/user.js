const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  googleId:String,
  userName:String,
  userDp:String, 
  savedPlace: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }]
});

mongoose.model('users', userSchema);