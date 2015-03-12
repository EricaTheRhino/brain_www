#!/usr/bin/php
<?php

chdir(__DIR__);

require("phpMQTT/phpMQTT.php");

	
$mqtt = new phpMQTT("localhost", 1883, "EricaWWWHeartbeat");
if (!$mqtt->connect()) {
	die();
}


for($i = 0; $i <6; $i++){
	if($i)
		sleep(10);
	echo "$i\n";
	$mqtt->publish("erica/heartbeat",date("r"));
}