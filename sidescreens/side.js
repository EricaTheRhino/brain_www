function change_page(dest){
	setLastPressTime();	
	$(".container").hide();
	$("#"+dest).show();
	return false;

}

function about_text(key){
	setLastPressTime();
	var title, text;
	switch(key){
		case "eyes":
			title = 'Eyes';
			text = 'I use my eyes to see the world. I can recognise people\'s faces and special QR Codes.';
			break;
		case "ears":
			title = 'Ears';
			text = 'My ears let me hear things around me. I\'ll let you know when I am interested in something.';
			break;
		case "horn":
			title = 'Horn';
			text = 'I have LEDs in my horn that show you my mood and how I am feeling.';
			break;
		case "brain":
			title = 'Brain';
			text = 'Like you I have a brain, which controls everything. Mine is made from a Raspberry Pi!';
			break;
		case "cheek":
			title = 'Cheek';
			text = 'I am quite ticklish, so if you stroke my cheek I might giggle.';
			break;
		case "mouth":
			title = 'Mouth';
			text = 'I need energy to survive, so to feed me touch my mouth!';
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

function loading(element, timeout){
	setLastPressTime();
	var text = element.innerHTML;
	var regexp=/<img/;
	if (!regexp.test(text)){
		element.innerHTML = '<img src="imgs/loading.gif" height="16px;" alt="Loading..."/>';
		setTimeout(function(){ element.innerHTML = text; }, timeout);
	}
}

function message(message){
	$('#debug_box').html($('#debug_box').html()+"<br/>"+message);
}
function change_cousin(direction){
	setLastPressTime();
	var cousin_name = $('#cousinname').html();
	var regexp = new RegExp(' ', 'g');
	var cousin = cousin_name.replace(regexp, "_");
	var cousins = ["Augustus","Beatrix","Beauty_and_the_Beast","Bunty","Cosmos_Rhino","Dock_Rhino","Enrhinomental","Fleur","Flossy","Glint","Kyma","Mechanico","Mrs_Hearty","Newton","NOT_a_Target","Planet_Rhino","Rafiki","Reggie","Reginald","Reveal","RhinOSeros","Rika","Ringo","Rita","Rohan","Rosie","Seymour","Stylo_Rhino","Sunny","The_Rhino_of_Life","Wheres_Ralph","Will","Wonderland"];
	var cousin_pos = cousins.indexOf(cousin);
	if (cousin_pos == 0 && direction == "previous") {
		cousin_pos = cousins.length - 1;
	}
	else if (cousin_pos == cousins.length - 1 && direction == "next") {
		cousin_pos = 0;
	}
	else if (direction == "previous") {
		cousin_pos--;
	}
	else {
		cousin_pos++;
	}
	cousin = cousins[cousin_pos];
	var regexp = new RegExp('_', 'g');
	cousin_name = cousin.replace(regexp, " ");
	$('#cousinpic').attr("src", "imgs/cousins/"+cousin+".jpg");
	$('#cousinpic').attr("alt", cousin_name);
	$('#cousinname').html(cousin_name);
}

function getScreenRes(){
	var resolution = $( window ).width() + " x " + $( window ).height();
	$('#screenres').html('Screen Res: '+resolution);
	return false;
}

function scroll(element,dir){
	setLastPressTime();
	var dirp= 50;
	if(dir=='up')
		dirp *= -1;
	var cur = $('#'+element).scrollTop();
	 $('#'+element).scrollTop( cur + dirp );
}

function setLastPressTime(){
	var now = Math.round(new Date().getTime() / 1000);
	$('#lastpresstime').html(now);
}

function backToHome(){
	var lastpresstime = parseInt($('#lastpresstime').html());
	var now = Math.round(new Date().getTime() / 1000);
	if (lastpresstime + 60 < now && $('#home').css('display') == 'none') {
		$(".container").hide();
        	$("#home").show();
		setLastPressTime();
	}
}
