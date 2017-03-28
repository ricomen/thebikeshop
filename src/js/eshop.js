(function(){

  //ajax
    var catalog = $(".popular-bikes__gallery");
    var cart = {};//Корзина

    loadProducts();//загружаю продукты на страницу
    

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
            out += "<form class=\"popular-bikes__form\" action=\"/\" method=\"get\"><select name=\"Опции\"><option selected disabled>Опции</option><option value=\"1\">" + json[i].option + "</option><option value=\"2\">Крокодил Гена</option><option value=\"3\">Шапокляк</option><option value=\"4\">Крыса Лариса</option></select><button class=\"btn btn--buy\" type=\"button\" data-art=\"" + i + "\" >Купить</button></form></footer>";
            out += "</article>";
          }
          catalog.append(out);
          $(".btn--buy").on("click", addToCart);
      });

      function addToCart() {//add to cart
        var product = $(this).attr('data-art');
        if(cart[product] !== undefined) {
          cart[product]++;              
        } else cart[product] = 1;
        localStorage.setItem("cart", JSON.stringify(cart));        
      }

      function checkCart() {
        if (localStorage.getItem("cart") != null) {
          cart = JSON.parse(localStorage.getItem("cart"));          
        }
      }
      checkCart();//проверяю корзину
    }
  

})(jQuery);