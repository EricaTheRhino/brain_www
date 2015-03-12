#!/usr/bin/php
<?php

chdir(__DIR__);

require("phpMQTT/phpMQTT.php");

	
$mqtt = new phpMQTT("localhost", 1883, "EricaWWWHeartbeat");
if (!$mqtt->connect()) {
	die();
}


for($i = 0; $i <12; $i++){
	if($i)
		sleep(5);
	$mqtt->publish("erica/heartbeat",date("r"));
}

$mqtt->close();