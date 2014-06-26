(function () {

  var QueryWrapper = function (elems) {
    this.elems = elems;
    this.get = function(index) {
      return new QueryWrapper( [ this.elems[index] ] );
    };
    this.length = this.elems.length;
    this.each = function(func) {
      for(var i = 0; i < this.elems.length; i++) {
        func(this.elems[i],i);
      }
      return this.elems;
    };
    this.hide = function() {
      this.each(function(element, i){
        element.style.display = "none";
      });
      return this;
    };
    this.show = function() {
      this.each(function(element, i){
        element.style.display = "";
      });
      return this;
    };
    this.addClass = function(someClass) {
      thisQW = this;
      thisQW.each(function(element,i){
        element.classList.add(someClass);
        thisQW.className = element.className;
      });
      return this;
    };
    this.removeClass = function(someClass) {
      thisQW = this;
      thisQW.each(function(element,i){
        element.classList.remove(someClass);
        thisQW.className = element.className;
      });
      return this;
    };
    this.css = function(property, value) {
      this.each(function(element, i){
        if(typeof(property) === 'object') {
          for (var attrname in property) {
            element.style[attrname] = property[attrname];
          }
        } else {
          element.style[property] = value;
        }
      });
      return this;
    };
    this.getStyle = function(length){
      if (length === 1) {
        return this.elems[0].style;
      } else {
        return undefined;
      }
    };
    this.style = this.getStyle(this.length);
    this.getClassName = function(length){
      if (length === 1) {
        return this.elems[0].className;
      } else {
        return undefined;
      }
    };
    this.className = this.getClassName(this.length);
  };

  var myQuery = function (selector) {
    var operator = selector.slice(0, 1);
    var option = selector.slice(1, selector.length);
    var elems;

    switch(operator) {
      case '.':
        elems = document.getElementsByClassName(option);
        break;
      case '#':
        item = document.getElementById(option);
        if(item === null) {elems = [];} else {elems = [item];}
        break;
      default:
        elems = document.getElementsByTagName(selector);
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
