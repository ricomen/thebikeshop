(function(){

  var cart = {};

  $.getJSON("products.json", function(json){
    var product = json;//все товары    
    checkCart();       //проверяем корзину
    
    // console.log(cart);
    showCart();
    function showCart() {
      var out = "";
      if ($.isEmptyObject(cart)) {
        $(".cart").html("Корзина пуста");
      } else {

      for(var key in cart) {
        out += "<article class=\"cart__item\"><div class=\"cart__item-img\">";
        out += "<img src=\"" + product[key].img + "\"/></div>";
        out += "<button class=\"btn btn--delete\" data-art=\"" + key + "\">x</button>";
        out += "<p class=\"cart__item-name\">" + product[key].name + "</p>";
        out += "<button class=\"btn btn--decrement\" data-art=\"" + key + "\">-</button>";
        out += "<span> - " +cart[key] + "<br></span>";
        out += "<button class=\"btn btn--increment\" data-art=\"" + key + "\">+</button>";
        out +=  cart[key] * product[key].cost;
        out += "<br>";
        out += "</article>";        
      }
        $(".cart").html(out);
        $(".btn--increment").on("click", plusGoods);
        $(".btn--decrement").on("click", minusGoods);
        $(".btn--delete").on("click", deleteGood);
    }
  }

    function plusGoods() {//добавляем товар
      var articul = $(this).attr("data-art");
      cart[articul]++;
      LocStorage();
      showCart();
    }
    function minusGoods() {//удаляем товар
      var articul = $(this).attr("data-art");
      cart[articul]--;
      if(cart[articul] < 1) delete cart[articul];
      locStorage();
      showCart();
    }
    function deleteGood() {//удаляем товар
      var articul = $(this).attr("data-art");
      delete cart[articul];
      console.log(cart);
      locStorage();
      showCart();
    }
  });
  function checkCart() { //проеверяем корзину
    if (localStorage.getItem("cart") != null) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
  }
  function locStorage() {//сохраняем состояние корзины в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

})(jQuery);