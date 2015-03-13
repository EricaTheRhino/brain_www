#!/usr/bin/php
<?php

chdir(__DIR__);

require("phpMQTT/phpMQTT.php");

	
$mqtt = new phpMQTT("brain.etr", 1883, "EricaWWWLog");
if (!$mqtt->connect()) {
	die();
}

$topics['erica/#'] = array("qos"=>0, "function"=>"procmsg");
$mqtt->subscribe($topics,0);
while($mqtt->proc()){
		
}
$mqtt->close();


function procmsg($topic,$msg){
	echo date("r ");
	switch($topic){
		case "erica/heartbeat":
			echo "Heartbeat: $msg\n";
		break;
		case "erica/stats":
			$json = @json_decode($msg,true);
			if($json===NULL){
				echo "Stats Error!\n";
				return true;
			}
			$data['set'] = 'erica';
			$data['time'] = time();
			$data["channels"] = array();

			foreach($json as $k=>$v){
        			$data["channels"][] = array("channel"=>"$k","value"=>(float)($v['percent']));
			}
			pubdata($data);
			echo " - Stats\n";
		break;
		default:	
			echo "Msg Recieved:{$topic}\n";
	}
}
function pubdata($data){
        $key = "7bbfb77b8407";
        $secret = "a26e4e0667fa3c9d66fb58e902ee2b14";
        $url = "http://data.bluerhinos.co.uk/api/put?";

        $params['time'] = time();
        $params['id'] = $key;
        $params['hash'] = hash('sha256',$key.$params['time'].$secret);
        $params['data'] = json_encode($data);

        $ch = curl_init();
        $timeout = 5;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);

        $data = curl_exec($ch);
        curl_close($ch);
        return $data;


}	
