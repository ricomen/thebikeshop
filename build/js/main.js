(function() {
  $(document).ready(function(){

    //scroll to need section
    $(".btn--toCategory").on("click", function(){
      var target = $(".categories").offset().top;
        $('html, body').animate({scrollTop: target}, 400);
    });

    //main-navigation
    $(".main-nav").removeClass('main-nav--nojs');

    $(".main-nav__toggle").on("click", function() {

      $(".main-nav").toggleClass('main-nav--closed');

      if( $(".main-nav").hasClass('main-nav--closed')) {
        $(".main-nav__list").animate({
          left: "-100%"
        }, 300);
      } else {
         $(".main-nav__list").animate({
          left: "0"
        }, 300);
      }

      $(this).toggleClass('main-nav__toggle--close');
    });
  })

})(jQuery);