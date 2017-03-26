(function(){
  //slider begin
  var header = document.querySelector(".page-header");
  var btns = header.querySelectorAll(".slider__btn");
  var sliderNav = header.querySelector(".slider__nav");
  var sliderIndicator = sliderNav.querySelector(".slider__indicator");
  var slides = header.querySelectorAll(".slider__item");
  
  for (var i = 0; i <btns.length; i++) {
    var count = 1;

    btns[i].onclick = function() {   

      if(this.getAttribute("data-direction") == "next") {        
        count++;
        if(count == 4) {
          count = 1
        };
        slideShow(count);
        

      } else if (this.getAttribute("data-direction") == "prev" &&  count != 0 ) {        
        count--;
        if(count == 0) {
          count = 3
        };
        slideShow(count);
      }
    }

    sliderIndicator.style.left = "0px";

    function slideShow(numb) {
        header.style.backgroundImage = "url('img/slider/slide-" + numb + ".jpg')"
        sliderIndicator.style.left = sliderIndicator.offsetWidth *(numb-1) + "px";
        for (var i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";          
        }; 
        slides[numb-1].style.display = "block";
    }
  }
//slider end
})(window);

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

    //ajax
    var catalog = $(".popular-bikes__gallery");

    loadProducts();

    //load products on page
    function loadProducts() {
      $.getJSON('products.json', {param1: 'value1'}, function(json) {
          // console.log(json);
          var out = "";
          for (var i in json) {
            out += "<article class=\"popular-bikes__item\"><div class=\"popular-bikes__item-img\">";
            out += "<img src=\"" + json[i].img + "\" width=\"430\" height=\"290\"/></div>";
            out += "<footer class=\"popular-bikes__item-footer\"><div class=\"popular-bikes__label\">";
            out += "<h3 class=\"popular-bikes__item-title\">" +json[i].name + "</h3>";
            out += "<p class=\"popular-bikes__item-price\">" + json[i].cost + "т.рублей</p></div>";
            out += "<form class=\"popular-bikes__form\" action=\"/\" method=\"get\"><select name=\"Опции\"><option selected disabled>Опции</option><option value=\"1\">" + json[i].option + "</option><option value=\"2\">Крокодил Гена</option><option value=\"3\">Шапокляк</option><option value=\"4\">Крыса Лариса</option></select><button class=\"btn btn--buy\" type=\"submit\">Купить</button></form></footer>";
            out += "</article>";
          }          
          catalog.append(out);
      });
    };
  })
})(jQuery);