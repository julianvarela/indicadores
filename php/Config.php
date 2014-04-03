<?php
	
	date_default_timezone_set("America/Bogota");	
        
	$servidor     = "192.81.208.30";
	$db_usuario   = "root";
	$db_pass      = "gisoft1121_base";
	$db           = "indicadores";
        
	define("SERVIDOR",  $servidor);
	define("PASS",      $db_pass);
	define("USUARIO",   $db_usuario);
	define("BD",        $db);  
  

	//mysql_connect($servidor,$db_usuario,$db_pass);
	//mysql_select_db($db);
?>