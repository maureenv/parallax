$(document).ready(function(){
  function checkSize() {
    if ($(".device-small-screen").css("display") !== "block" ) {
      var s = skrollr.init({
            render: function(data) {
                //Debugging - Log the current scroll position.
                //console.log(data.curTop);
            }
        });

      // Typewriter animation
      var i = 0;
      var text = 'Hello, my name is Maureen and I am a';

      function typeWriter() {
        if ( i <= text.length ) {
          document.querySelector('.intro h2').innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, 30);
        }
      }

      // Animation for text slide
      var wordIndex = 0;

      function slideRight() {
        var words = $('.intro h1');
        if ( wordIndex < words.length ) {
          $('.intro h1:eq(' + wordIndex + ')').addClass('zero-margin-left');
          wordIndex ++;
          setTimeout(slideRight, 1000);
        }
      }


      typeWriter();
      setTimeout(slideRight, 1700);
    }
    else {
      document.querySelector('.intro h2').innerHTML = "Hello, my name is Maureen and I am a"
    }
  }

  // run on initial page load
  checkSize();
  // run on window resize
  $(window).resize(checkSize);




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

});
