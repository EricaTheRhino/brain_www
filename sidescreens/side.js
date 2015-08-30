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
	updateMoodBarsAjax();
	updateMonologueAjax();
}

function updateMoodBarsAjax(){
	$.ajax({
		url:config_fetch.mood,
		success:function(state){
			updateMoodBars(state);
		},
  		error: function (xhr, ajaxOptions, thrownError) {
      		}
	});
}
function updateMonologueAjax(){
	$.ajax({
                url:config_fetch.latest_events,
                success:function(events){
                        updateMonologue(events);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                }
        });	
}

function updateVolumeAjax(){
	$.ajax({
                url:config_fetch.volume,
                success:function(volume){
                        $("#volume").text(volume+"%");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                }
        });
}

function updatePowerOffCodeAjax(num){
        $.ajax({
                url:config_fetch.power_off_code+num,
                success:function(returned){
			if (returned == "PASS") $("#poweroff").show();
			else $("#poweroff").hide();
			$("#poweroff_code").text(returned);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                }
        });
}

function updateVolumeDownAjax(){
        $.ajax({
                url:config_fetch.volume_down,
                success:function(volume){
                        $("#volume").text(volume+"%");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                }
        });
}

function updateVolumeUpAjax(){
        $.ajax({
                url:config_fetch.volume_up,
                success:function(volume){
                        $("#volume").text(volume+"%");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                }
        });
}

function updateMoodBars(moods){
	index_map = { e: 'energy', m: 'mood', i: 'interest', f: 'fullness' };
        $.each(moods, function(index, value) {
		mindex = index_map[index];
                var width = $('#state-'+mindex+' .progress-bar').attr('aria-valuenow');
                if(width!=value.percent){
                        $('#state-'+mindex+' .progress-bar').animate({width:value.percent+'%'});
                        $('#state-'+mindex+' .progress-bar').attr('aria-valuenow',value.percent);
                }
                $('#state-'+mindex+' .state-text').html(value.text);
	});
}


function updateMonologue(events){
	event_map = { 
		'interaction.touchscreen.eyes': 'Look into my eyes!',
		'interaction.touchscreen.ears': 'Watch my ears waggle!',
		'interaction.touchscreen.hornlights': 'Watch my horn change colour!',
		'interaction.touchscreen.bodylights': 'Watch my lights flicker!',
		'twitter.mention': 'Someone has just mentioned me on twitter!',
		'twitter.colour': 'Someone has just suggested %colour on twitter!',
		'brain.hour': 'Is that the time? Another hour gone!',
		'brain.reset': 'Resetting ;)',
		'brain.idle': 'Nothing has happened, getting a little bored.',
		'environment.weather.pollen': 'Achoo! Whoa, that pollen count is quite high!',
		'environment.weather.temperature': '%temperature',
		'interaction.righteye.face': 'Hello! Just seen someone on my right!',
		'interaction.lefteye.face': 'Hello! Just seen someone on my right!',
		'interaction.chin.press': 'Being Fed: %fullness',
		'interaction.pir.detect': 'Ooo what\'s that! Something moved!',
		'interaction.chip.press': 'HeHeHe, %tickle',
	};
	if ($("#brain-dump-hash").text() != events.hash) {
		var clearno = 10;
        	var eventno = 0;
        	$("#brain-dump").text("")
		$("#brain-dump-hash").text(events.hash);
		$.each(events.events, function(index, obj) {
			eventno++;
			if (eventno > clearno) return;
			var stat = obj.event.split(".");
			var message = event_map[obj.event];
			if (obj.event == "interaction.chin.press") {
				$.ajax({
                			url:"/fullness_message",
					async: false,
                			success:function(fullness){
                        			message = message.replace(/%fullness/, fullness);
                			},
                			error: function (xhr, ajaxOptions, thrownError) {
                			}
        			});
			}
			else if (obj.event == "interaction.chip.press") {
				$.ajax({
                                        url:"/tickle_message",
					async: false,
                                        success:function(tickle){
                                                message = message.replace(/%tickle/, tickle);
                                        },
                                        error: function (xhr, ajaxOptions, thrownError) {
                                        }
                                });
			}
			else if (obj.event == 'twitter.colour') {
                                message = message.replace(/%colour/, obj.params.colour);
			}
			else if (obj.event == 'environment.weather.temperature') {
				if (obj.params.temperature > 20) {
					submessage = 'Boy, it\'s a bit hot today!';
				}
				else if (obj.params.temperature > 15) {
					submessage = 'Aah, the temperature is about right!';
				}
				else if (obj.params.temperature > 10) {
					submessage = 'Ooh, it\'s a bit chilly today!';
				}	
				else {
					submessage = 'Brrr, I\'m frozen!';
				}
				message = message.replace(/%temperature/, submessage);
			}
			var text = '<div class="alert event-'+stat[0]+'">' + message + '</div>';
			$("#brain-dump").append(text);
		});	        
	}	
}

