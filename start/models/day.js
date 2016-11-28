var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = require('./hotel');
var Activity = require('./activity');
var Restaurant = require('./restaurant');

var Day = db.define('day', {
  number: Sequelize.INTEGER
}, {

});

Day.belongsTo(Hotel);
Day.belongsToMany(Restaurant, {through: 'DayRestaurant'});
Day.belongsToMany(Activity, {through: 'DayActivity'});

module.exports = Day;
