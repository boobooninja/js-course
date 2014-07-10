(function () {

  var ListItem = function () {
    // The "private" data
    var items = [];

    // Add the .on and .trigger methods to the new object being created
    Robin.extend(this, Robin.Events);

    this.create = function (listItem) {
      items.push(listItem);
      this.trigger('create', listItem);
    };

    this.destroy = function (index) {
      var item = items.splice(index,1);
      this.trigger('destroy', index);
    };

    this.update = function (index, name, priority) {
      console.log('in the list-item update');
      // TODO EXTENSION
      var item = items[index];
      item.name = name;
      item.priority = priority;
      items[index] = item;

      this.trigger('update', item, index);
    };

  };

  // Create a global modal instance. Later we'll learn a better place to put this
  window.listItems = new ListItem();

})();
