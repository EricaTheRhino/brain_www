<?php

include('settings.php');

#Proxy has short fuse;
ini_set('default_socket_timeout', $config['eye']['cache']*4);

if(isset($_REQUEST['eye']) && isset($config['eye'][$_REQUEST['eye']])){
	$eye = $config['eye'][$_REQUEST['eye']];
	
	if(!file_exists($eye['cache']) || (time() - filemtime($eye['cache']))>$config['eye']['cache']){
		
		if(!file_exists($eye['cache']))
			@mkdir(dirname($eye['cache']),0777,true);
		
		$image = @copy($eye['url'],$eye['cache']);
	
		if($image!==true){
			@copy('images/eye_lost.jpg',$eye['cache']);
		}
	
	}
	
	header('Content-Type: image/jpeg');
	readfile($eye['cache']);
	exit();

	
}
if(isset($_REQUEST['fetch']) && isset($config['fetch'][$_REQUEST['fetch']])) {
	$fetch = $config['fetch'][$_REQUEST['fetch']];

	if(!file_exists($fetch['cache']) || (time() - filemtime($fetch['cache']))>$config['fetch']['cache']){
		
		if(!file_exists($fetch['cache']))
			@mkdir(dirname($fetch['cache']),0777,true);
		
		$fe = @copy($fetch['url'],$fetch['cache']);
	}
	header('Content-Type: application/json');
	
		readfile($fetch['cache']);
		exit();
}

if(isset($_REQUEST['task']) && $_REQUEST['task'] == $_REQUEST['task']){
	
	$entityBody = file_get_contents('php://input');
	$url = 'URL';
	$data = array('field1' => 'value', 'field2' => 'value');
	$options = array(
	        'http' => array(
	        'method'  => 'POST',
	        'content' => http_build_query($entityBody),
	    )
	);
		$context  = stream_context_create($options);
	$result = file_get_contents($config['brain']['events']['url'], false, $context);
	echo "OK;";
	echo $result;

	
}

