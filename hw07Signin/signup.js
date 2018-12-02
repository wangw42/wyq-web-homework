jQuery(document).ready(function($) {
	$('input:not(.button)').blur(function(){
		if(validator.isFieldValid(this.id, $(this).val())){
			$(this).parent().find('.error').text('').hide();
		}else{
			$(this).parent().find('.error').text(validator.form[this.id].errorMessage).show();
		}
	});

	$('.reset').click(function(){
		$('.error').hide();
	});

	
});