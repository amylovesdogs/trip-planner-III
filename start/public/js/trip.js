'use strict';
/* global $ dayModule */
/* global $ dayButton */


/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var tripModule = (function () {

  // application state

  var currentDay;
  var dayButtons = [{}];

  // jQuery selections

  var $addButton, $removeButton;
  $(function () {
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
  });

  // method used both internally and externally

  function switchTo (newCurrentDay) {
    if (currentDay) currentDay.hide();
    dayButtons[currentDay.number].deactivate();
    currentDay = newCurrentDay;
    currentDay.show();
    dayButtons[currentDay.number].activate();
  }

  // jQuery event binding

  $(function () {
    $addButton.on('click', addDay);
    $removeButton.on('click', deleteCurrentDay);
  });

  function addDay () {
    if (this && this.blur) this.blur(); // removes focus box from buttons
    var newDay = dayModule.create({ number: dayButtons.length }); // dayModule
    if (dayButtons.length === 1) {
      currentDay = newDay;
    }
    // save to database
    $.post('/api/days/'+newDay.number)
    .then (function(){
      dayButtons.push(new dayButton(newDay.number));
      switchTo(newDay);
    })
    .catch( console.error.bind(console) );
  }

  function deleteCurrentDay () {
    // // prevent deleting last day
    // if (numDays < 2 || !currentDay) return;
    // // remove from the collection
    // var index = days.indexOf(currentDay),
    //   previousDay = days.splice(index, 1)[0],
    //   newCurrent = days[index] || days[index - 1];
    // // fix the remaining day numbers
    // days.forEach(function (day, i) {
    //   day.setNumber(i + 1);
    var perviousDay = currentDay;
    var url = '/api/days/' + currentDay.number;
    $.ajax({
        url: url,
        type: 'DELETE',
        })
    .then (function(day){
      if (!day) {
        addDay();
      }
      else {
        newDay = dayModule.create(day);
        switchTo(newDay);
     }
     previousDay.hideButton();
    })
    .catch( console.error.bind(console) );
  }

  // globally accessible module methods
  var publicAPI = {

    load: function () {
      $.get('/api/days/')
      .then (function(returnedDays){
        if (returnedDays) {
          console.log("Returned days: ",returnedDays);
          returnedDays.forEach(function(curVal, index) {
              dayButtons.push(new dayButton(index+1));
          })
          currentDay = dayModule.create(returnedDays[0]);
          switchTo(currentDay);
        }
        else {
          $(addDay);
        }
      })
      .catch( console.error.bind(console) );
    },

    switchTo: switchTo,

    addToCurrent: function (attraction) {
      currentDay.addAttraction(attraction);
      $.post('/api/days/'+ currentDay.number + '/add/' + attraction.type, {id: attraction.id});
      console.log("In addToCurrent. Attraction is: ", attraction);
    },

    removeFromCurrent: function (attraction) {
      currentDay.removeAttraction(attraction);
    }

  };

  return publicAPI;

}());
