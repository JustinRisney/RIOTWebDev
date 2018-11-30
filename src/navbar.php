<!--<style type="text/css">
	.dropdown:hover .dropdown-menu {
  		display: block;
	}
</style>-->
<?php 
	$url = $_SERVER['REQUEST_URI'];
	
	function setnavactive($base, $testurl){
		if($base == $testurl || $base == $testurl . "/" || preg_match(($testurl . "*/"),  $base)){
			echo "active";
		}
	}
	
	function more_disabled_than_r7($base, $testurl){
		if($base == $testurl || $base == $testurl . "/" || preg_match(($testurl . "*/"),  $base)){
			echo "disabled";
		}
	} 

?>
<style>
	.dropdown-menu {
		background-color: #205c7e;
		/* border: 2px solid #FFFFFF; */
	}
	.dropdown-item{
		font-weight: 300;
		color: #FFFFFF;
	} 
	.nav-link:hover {
		color: #A9A9A9;
	}
	/**.nav-link:active {
		text-decoration: underline 10px;
	}**/
	.active {
		color: #A9A9A9 !important;
		font-weight: 600 !important;
	}
	.nav-item  {
		color: #FFFFFF;
	}
	
	.nav-link{
		font-weight: 300;	
		color: #FFFFFF;
	} 
	#navbar-main {
		background-color: #205c7e;
	}

</style>
<script type="text/javascript">
	
	

		function toggledUrMomLmao () {
			document.getElementById("togglee").classList.toggle("show");
		}


</script>
<nav class="navbar navbar-expand-sm fixed-top" id="navbar-main">
	<a class="navbar-brand" href="/">
		<img class="" src="/favicon.ico" style="width:20px;" />	
	</a> 
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	
	<div class="collapse navbar-collapse" id="nav-content">   
		<ul class="navbar-nav">
			<div class="dropdown" onmouseover=" toggledUrMomLmao(); " onmouseout=" toggledUrMomLmao(); ">
  				<a class="nav-link dropdown-toggle <?php setnavactive($url, "/groups"); ?>" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">
   					 Groups
 			    	</a>
 			 	<ul class="dropdown-menu" id="togglee">
				    <li><a class="dropdown-item <?php more_disabled_than_r7($url, "/groups/web-development") ?>" href="/groups/web-development">Web Development</a></li>
				    <li class="dropdown-divider"></li>
				    <li><a class="dropdown-item <?php more_disabled_than_r7($url, "/groups/robotics") ?>" href="/groups/robotics/">Robotics</a></li>
				    <li class="dropdown-divider"></li>
				    <li><a class="dropdown-item <?php more_disabled_than_r7($url, "/groups/management-and-development") ?>" href="/groups/management-and-development/">Management and Development</a></li>
				    <li class="dropdown-divider"></li>
				    <li><a class="dropdown-item <?php more_disabled_than_r7($url, "/groups/programming") ?>" href="/groups/programming/">Programming</a></li>
				    <li class="dropdown-divider"></li>
				    <li><a class="dropdown-item <?php more_disabled_than_r7($url, "/groups/cyber-security") ?>" href="/groups/cyber-security/">Cyber Security</a></li>
  				</ul>
			</div>
			<li class="nav-item <?php setnavactive($url, "/about"); ?>">
				<a class="nav-link <?php setnavactive($url, "/about"); ?>" href="/about">About</a>
			</li>
			<li class="nav-item <?php setnavactive($url, "/donations"); ?>">
				<a class="nav-link <?php setnavactive($url, "/donations"); ?>" href="/donations">Donations</a>
			</li>
			<li class="nav-item <?php setnavactive($url, "/contracts"); ?>">
				<a class="nav-link <?php setnavactive($url, "/contracts"); ?>" href="/contracts">Contracts</a>
			</li>
			<li class="nav-item <?php setnavactive($url, "/events"); ?>">
				<a class="nav-link <?php setnavactive($url, "/events"); ?>" href="/events">Events</a>
			</li>
		</ul>
	</div>
</nav>










