jQuery(function($) {
  $(".search").on("click", function() {
  	console.log($("#searchform").attr('action'));
  	if ($("#searchform").attr('action') === 'https://www.google.com/search') {
  		var action = 'https://duckduckgo.com/',
  			logo = 'duckduckgo.svg';
  	} else {
  		var action = 'https://www.google.com/search',
  			logo = 'google.svg';
  	}
  	$("#searchform").attr('action', action);
  	$(".search").attr('src', logo);
  });
});
