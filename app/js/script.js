$(document).ready(function(){
  //$('.overlayc').fadeIn(2000);

  // Typewriter animation
  var i = 0;
  var text = 'Hello, my name is Maureen and I am a';

  function typeWriter() {
    if ( i < text.length ) {
      document.querySelector('.intro h2').innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 60);
    }
  }

  typeWriter();
  setTimeout(slideRight, 1700);

  // Typewriter animation
  var wordIndex = 0;

  function slideRight() {
    var words = $('.intro h1');
    if ( wordIndex < words.length ) {
      $('.intro h1:eq(' + wordIndex + ')').addClass('zero-margin-left');
      wordIndex ++;
      setTimeout(slideRight, 1000);
    }
  }





  //// navbar scroll to link effect
  $('a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
      window.location.hash = target;
    });
  });

  var s = skrollr.init({
        render: function(data) {
            //Debugging - Log the current scroll position.
            //console.log(data.curTop);
        }
    });

});
