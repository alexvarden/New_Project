<?php

	require_once 'include/head.php'; // Link with header

	$page_name = "TestPage"; 

?>

<body>
	
	<script type="text/javascript">

		$(document).ready(function() {

        document.title = '<? echo $page_name ?>';

		});





	</script>


</body>

<?	require_once 'include/foot.php'; // Link with page footer  ?>


