(function() {
	window.Main = {};
	Main.Page = (function() {
		var mosq = null;
		function Page() {
			var _this = this;
			mosq = new Mosquitto();
			$('#connect-button').click(function() {
				return _this.connect();
			});
			$('#disconnect-button').click(function() {
				return _this.disconnect();
			});
			$('#subscribe-button').click(function() {
				return _this.subscribe();
			});
			$('#unsubscribe-button').click(function() {
				return _this.unsubscribe();
			});
			$('#publish-button').click(function() {
				return _this.publish();
			});

			mosq.onconnect = function(rc){
				console.log("MQTT:CONNACK " + rc);
			};
			mosq.ondisconnect = function(rc){
				console.log("MQTT:Lost connection");
			};
			mosq.onmessage = function(topic, payload, qos){
				
				console.log("MQTT:PUBLISH " + topic + " " + payload);


				switch(topic)
				{
				case 'erica/stats':
					erica_update_state(payload);
				break;
				case 'erica/event':
					erica_update_event(payload);
				break;
				case 'erica/heartbeat':
					erica_heartbeat(payload);
				break;
				}
			};
		}
		Page.prototype.connect = function(){
			var url = "ws://" + window.location.hostname + ":8888";
			mosq.connect(url);
		};
		Page.prototype.disconnect = function(){
			mosq.disconnect();
		};
		Page.prototype.subscribe = function(topic){
			mosq.subscribe(topic, 0);
		};
		Page.prototype.unsubscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.unsubscribe(topic);
		};
		Page.prototype.publish = function(){
			var topic = $('#pub-topic-text')[0].value;
			var payload = $('#payload-text')[0].value;
			mosq.publish(topic, payload, 0);
		};
		return Page;
	})();
	$(function(){
		console.log('Run');
		Main.controller = new Main.Page;
		Main.controller.connect();
		Main.controller.subscribe('erica/#');

		return Main.controller;

	});

	function erica_heartbeat(state){
	   $(".heart").css("opacity", "1");
	   window.setTimeout(function(){
	       $(".heart").css("opacity", "0.1");
	   }, 500);
	}
	
	

	function erica_update_event(state){
		var obj = JSON.parse(state);
		var stat = obj.event.split(".");
		var text = '<div class="alert event-'+stat[0]+'">' + obj.text + '</div>';
		$("#brain-dump").prepend(text);
		var clearno = 10;


		switch( obj.event )
		{
		case 'twitter.colour':
			if(obj.params.colour.toLowerCase()=='christmas'){
				$('#light_color').hide();
				$('#light_xmas').show();
			}else{
				$('#light_color').css('color', obj.params.colour);
				$('#light_xmas').hide();
				$('#light_color').show();
			}
		break;
		}

		$('#brain-dump .alert').filter(function(i) {
		    return i > clearno;
		}).remove();


	}
	
	

	function erica_update_state(state){
		var obj = JSON.parse(state);
		$.each(obj, function(index, value) {
			var width = $('#state-'+index+' .progress-bar').attr('aria-valuenow');
			if(width!=value.percent){
				$('#state-'+index+' .progress-bar').animate({width:value.percent+'%'});
				$('#state-'+index+' .progress-bar').attr('aria-valuenow',value.percent);
			}
		   $('#state-'+index+' .state-text').html(value.text);
		});
	}
}).call(this);

console.log('Start');
