(function(){

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
        header.style.backgroundImage = "url('../img/slider/slide-" + numb + ".jpg')"
        sliderIndicator.style.left = sliderIndicator.offsetWidth *(numb-1) + "px";
        for (var i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";          
        }; 
        slides[numb-1].style.display = "block";
    }
  }
  
})(window);