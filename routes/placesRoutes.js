const mongoose = require('mongoose');

const Place = mongoose.model('Place');
const User = mongoose.model('users');

module.exports = app =>{



  // All places
  // app.get('/api/places', (req, res)=>{
  //   Place.find({}, (err, places)=>{
  //     err ? console.log(err) : res.send(places)
  //   });
  // });


  // All places and filter
  app.get('/api/places/filter/:term', (req, res)=>{
    if (req.params.term === 'all'){
      Place.find({}, (err, places)=>{
        err ? console.log(err) : res.send(places)
      });
    } else {
      Place.find({country : req.params.term}, (err, places)=>{
        err ? console.log(err) : res.send(places);
      });
    }    
  });

  // Post new place
  app.post('/api/places', (req, res)=>{

    let author = {
      id: req.body.UserId,
      userName: req.body.userName,
      userDp: req.body.userDp
    }

    let place = new Place({
      name: req.body.name,
      detail: req.body.detail,
      type: req.body.type,
      image:req.body.image,
      about: req.body.about,
      activity: req.body.activity,
      country: req.body.country,
      state: req.body.state,
      lat: req.body.lat,
      lng: req.body.lng,
      author: author
    })
    
    place.save((err)=>{
      err ? res.send(err) : res.send(req.body);
    })
  })
  

  // Get single place
  app.get('/api/places/:id', (req, res)=>{
    Place.findById(req.params.id, (err, place)=>{
      err ? console.log(err) : res.send(place)
    })
  })

  // Update Route
  app.put('/api/places/:id', (req, res)=>{

    Place.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      detail: req.body.detail,
      type: req.body.type,
      image:req.body.image,
      about: req.body.about,
      activity: req.body.activity
    }, (err)=>{
      err ? res.send(err) : res.send('Update success')
    })
  })
  
  // Delete Route
  app.delete('/api/places/:id', (req, res)=>{
    Place.findByIdAndRemove(req.params.id, (err)=>{
      err ? res.send(err) : res.send('Delete Success')
    })
  })


  app.put('/api/place/save', (req, res)=>{
    User.findByIdAndUpdate(req.body.userId, {
      "$addToSet" : { savedPlace: req.body.placeId}
    }, (err, user)=>{
      err ? res.send(err) : res.send(user)
    })
  })

  app.post('/api/place/saved', (req, res)=>{
    User
      .findById(req.body._id)
      .populate('savedPlace')
      .exec((err, savedPlaces) =>{
        res.send(savedPlaces)
      })
  })




};


