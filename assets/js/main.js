$( document ).ready(function() {
    console.log( "ready! hallalla" );

    $('.nav-tabs a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		});

		$('.gallery').colorbox({rel:'gal'});
});