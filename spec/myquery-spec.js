describe("myQuery", function () {

  beforeEach(function () {
    // `setFixtures` comes from the jasmine-jquery plugin.
    // Although *you* are not using jQuery, we use this plugin to
    // help us create HTML elements for testing.
    //
    // Key point: The HTML elements we create here are available
    // for our tests to select. They also get destroyed after each test.
    setFixtures(
      '<div id="profile" class="noice">' +
        '<div class="button first"></div>' +
        '<img class="avatar" />' +
        '<a class="button second"></a>' +
        '<a class="straggler"><label>Click meh</label></a>' +
      '</div>'
    );
  });

  it("has a version of value 'beta'", function() {
    expect($.version).toEqual('beta');
  });

  describe("General each function", function () {
    it("iterates through an array", function () {
      var testResult = [];
      var someArray = [10, 20, 30];
      $.each(someArray, function (number) {
        testResult.push(number * number);
      });

      expect(testResult.length).toEqual(3);
      expect(testResult[0]).toEqual(100);
      expect(testResult[1]).toEqual(400);
      expect(testResult[2]).toEqual(900);
    });
  });

  describe("Selectors", function () {

    it("selects an element by id", function() {
      var elem = $('#profile').get(0);
      expect(elem.className).toEqual('noice');
    });

    it("selects elements by class name", function() {
      var buttons = $('.button');
      expect(buttons.get(0).className).toMatch(/first/);
      expect(buttons.get(1).className).toMatch(/second/);
    });

    it("selects elements by tag name", function() {
      var anchors = $('a');
      expect(anchors.length).toEqual(2)
      expect(anchors.get(0).className).toEqual("button second");
      expect(anchors.get(1).className).toEqual("straggler");

      var images = $('img');
      expect(images.length).toEqual(1)
      expect(images.get(0).className).toEqual("avatar");
    });
  });

  describe("Selected elements each function", function () {
    it("iterates through all selected elements", function() {
      var testResult = [];
      $('.button').each(
        function (elem, i) {
          testResult.push(elem.className + ' ' + i);
        }
      );

      expect(testResult.length).toEqual(2);
      expect(testResult[0]).toEqual("button first 0");
      expect(testResult[1]).toEqual("button second 1");
    });
  });

  describe("Show and Hide", function () {
    it("Hide hides the selected property", function(){
      expect( $('.button').get(0).hide().style.display ).toEqual("none");
    });

    it("Show shows the selected property", function(){
      expect( $('.button').get(0).show().style.display ).toEqual("");
    });
  });

  describe("addClass", function () {
    it("adds the given class to the object", function(){
      var klass = 'myKlass';
      var button = $('.button').get(0);
      expect( button.addClass(klass).className ).toMatch(/myKlass/);
    });
  });

  describe("removeClass", function () {
    it("removes the given class from the object", function(){
      var klass = 'myKlass';
      var button = $('.button').get(0);
      button.addClass(klass);
      expect( button.className ).toMatch(/myKlass/);
      expect( button.removeClass(klass).className ).not.toMatch(/myKlass/);
    });
  });

  describe("Modifying CSS", function () {
    it("can set a single property", function() {
      // Ensure they're not already hidden
      expect( $('.button').get(0).style.display ).toEqual('');
      expect( $('.button').get(1).style.display ).toEqual('');

      // Now make sure displays have updated
      $('.button').css('display', 'none');
      expect( $('.button').get(0).style.display ).toEqual('none');
      expect( $('.button').get(1).style.display ).toEqual('none');
    });

    it("can set multiple properties in one call", function(){
      $('#profile').css({'height': '200px', 'width': '300px'});

      expect( $('#profile').style.height ).toEqual('200px');
      expect( $('#profile').style.width ).toEqual('300px');
    });
  });

});
