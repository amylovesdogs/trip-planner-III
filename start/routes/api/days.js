var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day');


router.get('/', function(req,res,next) {
  Day.findAll()
  .then (function (days) {
           res.json(days)
  })
  .catch(next)
  // console.log("In get all days");
});

router.get('/:id', function(req,res,next) {
  Day.findOne({where: {number: req.params.id}})
  .then (function (day) {
           res.json(day)
  })
  .catch(next)
});

// add day
router.post('/:id', function(req,res,next) {
  Day.create({number: req.params.id})
  .then (function (day) {
           res.json(day)
  })
  .catch(next)
});

// // update day number
// router.put('/:id', function(req,res,next) {
//   Day.update({number: req.params.id})
//   .then (function (day) {
//            res.json(day)
//   })
//   .catch(next)
// });

// delete day
router.delete('/:id', function(req,res,next) {
  Day.destroy({where: {number: req.params.id}})
  .then (function () {
           res.status(200).end();
  })
  .catch(next)
});

// add a hotel
router.post('/:id/hotel', function(req,res,next) {
  Day.findOne({where: {number: req.params.id}})
  .then (function(day){
          // return day.setHotel(req.body.hotel);
  })
  .catch(next)
});

// add retaurants
router.post('/:id/restaurants', function(req,res,next) {
  Day.findOne({where: {number: req.params.id}})
  .then (function(day){
          // return day.setHotel(req.body.hotel);
  })
  .catch(next)
});

// add activities
router.post('/:id/activities', function(req,res,next) {
  Day.findOne({where: {number: req.params.id}})
  .then (function(day){
          // return day.setHotel(req.body.hotel);
  })
  .catch(next)
});

// delete a hotel
router.delete('/:id/hotel', function(req,res,next) {
  Day.findOne({where: {number: req.params.id}})
  .then (function(day){
          // return day.setHotel(req.body.hotel);
  })
  .catch(next)
});

// delete retaurants
router.delete('/:id/restaurants', function(req,res,next) {
  Day.findOne({where: {number: req.params.id}})
  .then (function(day){
          // return day.setHotel(req.body.hotel);
  })
  .catch(next)
});

// delete activities
router.delete('/:id/activities', function(req,res,next) {
  Day.findOne({where: {number: req.params.id}})
  .then (function(day){
          // return day.setHotel(req.body.hotel);
  })
  .catch(next)
});



module.exports = router;
