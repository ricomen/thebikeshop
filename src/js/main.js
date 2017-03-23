/**
 * Created by RicOmen on 21.03.2017.
 */
$(document).ready(function () {
  var catpos = $(".categories").position();
  $("#to-category").on("click", function () {
    console.log(Math.floor(catpos.top));
    $("html, body").animate({
      scrollTop: catpos.top
    }, 700);
  });
});
