<?php

require("phpMQTT/phpMQTT.php");

$feeds[] = array('event'=>'vision.motion', 'params'=>array('position'=>'left'),'text'=>'Lets look left (Eyes moved Left)');
$feeds[] = array('event'=>'vision.scanned_item', 'params'=>array('item'=>'cake'),'text'=>'Ohh cake (Scanned QR Code: Cake)');
$feeds[] = array('event'=>'item.fed', 'params'=>array(),'text'=>'Mmmm tasty (Just been fed)');
$feeds[] = array('event'=>'interaction.righteye.face', 'params'=>array(),'text'=>'Just seen somebody on my right (Face detected on right eye)');

$mqtt = new phpMQTT("localhost", 1883, "PHP MQTT Client Feeds");
if (!$mqtt->connect()) {
	die();
}


while(1){
		
	foreach($feeds as $feed){
		echo $feed['event']."\n";
		$js = json_encode($feed);
		$mqtt->publish("erica/event",$js,0);
		sleep(5);
	}
	
}


$mqtt->close();