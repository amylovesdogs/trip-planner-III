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
      tripModule.switchTo(self);
    });
    return this;
  };

  dayButton.prototype.deactivate() {
    this.$button.removeClass('current-day');
  }

  dayButton.prototype.activate() {
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
