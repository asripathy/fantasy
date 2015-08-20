var main = function() {
  $('.nextArrow').click(function() {
    var currentSlide = $('.active');
    var nextSlide = currentSlide.next();
    
    var currentDot = $('.active-dot');
    var nextDot = currentDot.next();

    if(nextSlide.length === 0) {
      nextSlide = $('.slide').first();
      nextDot = $('.dot').first();
    }
    
    currentSlide.fadeOut(600).removeClass('active');
    nextSlide.fadeIn(600).addClass('active');
    
    currentDot.removeClass('active-dot');
    nextDot.addClass('active-dot');
  });


  $('.prevArrow').click(function() {
    var currentSlide = $('.active');
    var prevSlide = currentSlide.prev();
    
    var currentDot = $('.active-dot');
    var prevDot = currentDot.prev();

    if(prevSlide.length === 0) {
      prevSlide = $('.slide').last();
	  prevDot = $('.dot').last();
    }
    
    currentSlide.fadeOut(600).removeClass('active');
    prevSlide.fadeIn(600).addClass('active');
    
    currentDot.removeClass('active-dot');
    prevDot.addClass('active-dot');
  });
  

}

$(document).ready(main);