<?php

require("phpMQTT/phpMQTT.php");

	
$mqtt = new phpMQTT("localhost", 1883, "PHP MQTT Client Sat");
if (!$mqtt->connect()) {
	die();
}

while(1){
	
$go = rand(0,3);
if($go == 0){		
$es = array('asleep', 'sleepy', 'tired', 'awake', 'alert', 'excited', 'hyperactive');
$es_c = count($es);
$es_p = rand(0,$es_c-1);
$json['energy'] = array("text"=>$es[$es_p],"value"=>$es_p,"percent"=>((int)((($es_p+0.5)/$es_c)*100)));
}elseif($go == 1){
$ms = array('tearful', 'teary', 'grumpy', 'unhappy', 'sad', 'content', 'happy', 'very_happy', 'overjoyed');
$ms_c = count($ms);
$ms_p = rand(0,$ms_c-1);
$json['mood'] = array("text"=>$ms[$ms_p],"value"=>$ms_p,"percent"=>((int)((($ms_p+0.5)/$ms_c)*100)));
}elseif($go == 2){
$is = array('very_bored', 'bored', 'curious', 'interested', 'fascinated', 'enthused', 'very_interested');
$is_c = count($is);
$is_p = rand(0,$is_c-1);
$json['interest'] = array("text"=>$is[$is_p],"value"=>$is_p,"percent"=>((int)((($is_p+0.5)/$is_c)*100)));
}else{
$fs = array('starving', 'hungry', 'peckish', 'satisfied', 'well_fed', 'full', 'stuffed');
$fs_c = count($fs);
$fs_p = rand(0,$fs_c-1);
$json['fullness'] = array("text"=>$fs[$fs_p],"value"=>$fs_p,"percent"=>((int)((($fs_p+0.5)/$fs_c)*100)));
}


echo $js = json_encode($json);

$mqtt->publish("erica/stats",$js,0);
sleep(6);


}


$mqtt->close();