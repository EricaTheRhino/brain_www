<?php

include('settings.php');

#Proxy has short fuse;
ini_set('default_socket_timeout', 3);

if(isset($_REQUEST['eye']) && isset($config['eye'][$_REQUEST['eye']])){
	$eye = $config['eye'][$_REQUEST['eye']];
	
	if(!file_exists($eye['cache']) || (time() - filemtime($eye['cache']))>5){
		
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

if(isset($_REQUEST['task']) && $_REQUEST['task'] == $_REQUEST['task']){
	
	echo "OK";

	
}

