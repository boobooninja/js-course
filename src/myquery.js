(function () {

  var QueryWrapper = function (elems) {
    this.get = function(index) {
      console.log("index: " + index);
      console.log("elems: " + elems);
      console.log("what is elems[index]", elems[index]);
      return elems[index];
    };
    this.length = elems.length;
    this.each = function(func) {
      for(var i = 0; i < elems.length; i++) {
        func(elems[i],i);
      }
      return elems;
    };
  };

  var myQuery = function (selector) {
    var operator = selector.slice(0, 1);
    var option = selector.slice(1, selector.length);
    var elems;
console.log("operator: " + operator);
console.log("option: " + option);

    switch(operator) {
      case '.':
        // code (use option)
        elems = document.getElementsByClassName(option);
        console.log(". elems: " + elems);
        break;
      case '#':
        // code (use option)
        item = document.getElementById(option);
        if(item === null) {elems = [];} else {elems = [item];}
        console.log("# elems: " + elems);
        break;
      default:
        // code (use selector)
        elems = document.getElementsByTagName(selector);
        console.log("? elems: " + elems);
    }
    return new QueryWrapper(elems);
  };

  myQuery.version = 'beta';
  myQuery.each = function(array, func){
    for(var i = 0; i < array.length; i++) {
      func(array[i]);
    }
    return array;
  };

  window.$ = myQuery;

})();
