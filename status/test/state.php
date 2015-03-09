<?php

require("phpMQTT/phpMQTT.php");

	
$mqtt = new phpMQTT("localhost", 1883, "EricaWWWTesting");
if (!$mqtt->connect()) {
	die();
}


$feeds[] = array('event'=>'vision.motion', 'params'=>array('position'=>'left'),'text'=>'Lets look left (Eyes moved Left)');
$feeds[] = array('event'=>'vision.scanned_item', 'params'=>array('item'=>'cake'),'text'=>'Ohh cake (Scanned QR Code: Cake)');
$feeds[] = array('event'=>'item.fed', 'params'=>array(),'text'=>'Mmmm tasty (Just been fed)');
$feeds[] = array('event'=>'interaction.righteye.face', 'params'=>array(),'text'=>'Just seen somebody on my right (Face detected on right eye)');

while(1){
	
$go = rand(0,4);
switch($go){
	case 0:
		$es = array('asleep', 'sleepy', 'tired', 'awake', 'alert', 'excited', 'hyperactive');
		$es_c = count($es);
		$es_p = rand(0,$es_c-1);
		$json['energy'] = array("text"=>$es[$es_p],"value"=>$es_p,"percent"=>((int)((($es_p+0.5)/$es_c)*100)));
		echo "energy\n";
		$js = json_encode($json);
		$mqtt->publish("erica/stats",$js,0);
	break;
	case 1;
		$ms = array('tearful', 'teary', 'grumpy', 'unhappy', 'sad', 'content', 'happy', 'very_happy', 'overjoyed');
		$ms_c = count($ms);
		$ms_p = rand(0,$ms_c-1);
		$json['mood'] = array("text"=>$ms[$ms_p],"value"=>$ms_p,"percent"=>((int)((($ms_p+0.5)/$ms_c)*100)));
		echo "mood\n";
		$js = json_encode($json);
		$mqtt->publish("erica/stats",$js,0);
	break;
	case 2;
		$is = array('very_bored', 'bored', 'curious', 'interested', 'fascinated', 'enthused', 'very_interested');
		$is_c = count($is);
		$is_p = rand(0,$is_c-1);
		$json['interest'] = array("text"=>$is[$is_p],"value"=>$is_p,"percent"=>((int)((($is_p+0.5)/$is_c)*100)));
		echo "interest\n";
		$js = json_encode($json);
		$mqtt->publish("erica/stats",$js,0);
	break;
	case 3;
		$fs = array('starving', 'hungry', 'peckish', 'satisfied', 'well_fed', 'full', 'stuffed');
		$fs_c = count($fs);
		$fs_p = rand(0,$fs_c-1);
		$json['fullness'] = array("text"=>$fs[$fs_p],"value"=>$fs_p,"percent"=>((int)((($fs_p+0.5)/$fs_c)*100)));
		echo "fullness\n";
		$js = json_encode($json);
		$mqtt->publish("erica/stats",$js,0);
	break;
	case 4;
		$feed = $feeds[rand(0,3)];
		echo $feed['event']."\n";
		$js = json_encode($feed);
		$mqtt->publish("erica/event",$js,0);
	break;
}

sleep(5);


}


$mqtt->close();