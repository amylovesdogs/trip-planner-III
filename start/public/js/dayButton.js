var $dayButtons;
  $(function () {
    $dayButtons = $('.day-buttons');
  });

function dayButton(number) {
    this.number = number;
    this.buildButton().showButton();
}

dayButton.prototype.buildButton = function () {
    this.$button = $('<button class="btn btn-circle day-btn"></button>')
      .text(this.number);
    var self = this;
    this.$button.on('click', function (){
      this.blur(); // removes focus box from buttons
      $.get('/api/days/'+self.number)
      .then (function(returnedDay){
          console.log("Returned day: ",returnedDay);
          tripModule.switchTo(dayModule.create(returnedDay));
      })
      .catch( console.error.bind(console) );
    });
    return this;
  };

  dayButton.prototype.deactivate = function() {
    this.$button.removeClass('current-day');
  }

  dayButton.prototype.activate = function() {
    this.$button.addClass('current-day');
  }

  dayButton.prototype.showButton = function () {
    this.$button.appendTo($dayButtons);
    return this;
  };

  dayButton.prototype.hideButton = function () {
    this.$button.detach(); // detach removes from DOM but not from memory
    return this;
  };
