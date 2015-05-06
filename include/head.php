<?php
	
	//includes ----------------------------------------------------------------


	// Error Handler -------------------------------------------
	include_once 'include/Whoops/Inc.php';
	//----------------------------------------------------------
	$whoops = new \Whoops\Run;
	$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
	$whoops->register();
	

	// secure Area 
	// ------------------------------------
	// require_once 'login/secure.php';

	require_once 'include/settings.php';

	//class
	require_once 'class/DB.php';



	//includes : END ---------------------------------------------------------



	$DB = new DB($DB_credentials);

 
?>

<hmtl>
	<head>
			<!-- Links : Script : lib-->
			<script type="text/javascript" src="script/lib/jquery-1.11.2.min.js" ></script>
			
			<!-- Links : Script : my_lib-->
			<script type="text/javascript" src="script/my_lib/validate.js" ></script>

			<!-- Links : Style -->
			<link rel="stylesheet" type="text/css" href="css/main.css">
			
			<!-- fontAwsome -->
			<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
			
	</head>
	
	<?	require_once 'include/nav.php'; // Link with nav  ?>

