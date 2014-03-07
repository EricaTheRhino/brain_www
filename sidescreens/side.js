$(function(){
	
	
	
});

function change_page(dest){

	$(".container").fadeOut();
	$("#"+dest).fadeIn();
	return false;
	
}

function about_text(key){
	
	var title, text;
	switch(key){
		case "eyes":
			title = 'Eyes';
			text = 'I use my eyes to see the world, I can regonise peoples faces or special QR Codes';
			break;
		case "ears":
			title = 'Ears';
			text = 'My ears let me hear things arround me and let you know when I when am interesting in something';
			break;
		case "horn":
			title = 'Horn';
			text = 'I have LEDs in my horn that show you my mood and how I am feeling';
			break;
		case "brain":
			title = 'Brain';
			text = 'Like you I have a brain, which controls everything. Mine is made from a raspberry Pi';
			break;
		case "cheek":
			title = 'Cheek';
			text = 'I am quite ticklish, so if you stroke my cheek I might giggle';
			break;
		case "mouth":
			title = 'Mouth';
			text = 'I need energy to survive, so to feed me touch my mouth';
			break;
		default:
			title = 'About Me';
			text = 'Click on the circles to find out more about me.';
		return false;
	}
	$("#about_info h3").html(title);
	$("#about_info p").html(text);
	$("#about_info").fadeIn();
	
}

function getScreenRes(){
	var resolution = $( window ).width() + " x " + $( window ).height();
	$('#screenres').html('Screen Res: '+resolution);
	return false;
}

function scroll(element,dir){
	var dirp= 50;
	if(dir=='up')
		dirp *= -1;
	var cur = $('#'+element).scrollTop();
	 $('#'+element).scrollTop( cur + dirp );
}