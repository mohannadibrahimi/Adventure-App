const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name:String,
  detail: String,
  type:String,
  image:String,
  about:String,
  country:{type: String, lowercase:true},
  state:String,
  lat:String,
  lng:String,
  activity: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    userName: String,
    userDp: String
  }
});

const Place = mongoose.model('Place', placeSchema);