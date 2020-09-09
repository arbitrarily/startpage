jQuery(function($) {
  $(".search").on("click", function() {
    if ($("#searchform").attr('action') === 'https://google.com/search') {
      var action = 'https://duckduckgo.com',
          logo = 'duckduckgo.svg';
    } else if ($("#searchform").attr('action') === 'https://duckduckgo.com') {
      var action = 'https://youtube.com/results?search_query=',
          logo = 'youtube.svg';
    } else {
      var action = 'https://google.com/search',
          logo = 'google.svg';
    }
    $("#searchform").attr('action', action);
    $(".search").attr('src', logo);
  });
  $("input").focus(function() {
    $("form").addClass("focus");
  });
  $("input").focusout(function() {
    $("form").removeClass("focus");
  });
});
