var scrollFireEventsHandled = false;

// Input: Array of JSON objects {selector, offset, callback}
Materialize.scrollFireEnhanced = function(options) {
  var onScroll = function() {
    for (var windowScroll = window.pageYOffset, c = 0; c < options.length; c++) {
      // saque + window.innerHeight

      // Get options from each line
      var value = options[c];
      var selector = value.selector,
        offset = value.offset;

      currentElement = document.querySelector(selector)

      if (currentElement !== null) {
        var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;
        if (windowScroll > (elementOffset + offset)) {
          if (value.done !== true) {
            $('#main-header').removeClass('nav-up').addClass('nav-down');
            $('#main-header nav').removeClass('fixed')
            value.done = true;
          }
        } else if (windowScroll < (elementOffset + offset) && value.done) {

          $('#main-header').removeClass('nav-down').addClass('nav-up')
          $('#main-header nav').addClass('fixed')
          value.done = false;
        }
      }

    }
  };

  var throttledScroll = Materialize.throttle(function() {
    onScroll();
  }, options.throttle || 100);

  if (!scrollFireEventsHandled) {
    window.addEventListener("scroll", throttledScroll);
    window.addEventListener("resize", throttledScroll);
    scrollFireEventsHandled = true;
  }

  // perform a scan once, after current execution context, and after dom is ready
  setTimeout(throttledScroll, 0);
};
