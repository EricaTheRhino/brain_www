<?php
	
$config['eye']['left'] = array("url"=>"http://left-eye.etr:8182/image/current", "cache"=>"/mnt/ramdisk/erica/eyes/left");
$config['eye']['right'] = array("url"=>"http://right-eye.etr:8182/image/current", "cache"=>"/mnt/ramdisk/erica/eyes/right");
$config['eye']['cache'] = 1;


$config['brain']['events'] = array("url"=>"http://brain.etr/events/");


$config['fetch']['mood'] = array("url"=>"http://brain.etr/mood.json","cache"=>"/mnt/ramdisk/erica/fetch/mood.json");
$config['fetch']['latest_events'] = array("url"=>"http://brain.etr/latest_events.json","cache"=>"/mnt/ramdisk/erica/fetch/latest_events.json");
$config['fetch']['cache'] = 1;