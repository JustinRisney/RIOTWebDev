<!--<style type="text/css">
	.dropdown:hover .dropdown-menu {
  		display: block;
	}
</style>-->
<?php 
	$url = $_SERVER['REQUEST_URI'];
	
	function setnavactive($base, $testurl){
		if($base == $testurl || $base == $testurl . "/"){
			echo "active";
		}
	}
?>
<style>
	.dropdown-item{
		font-weight: 300;
	}
	.nav-link{
		font-weight: 300;	
	}
</style>
<nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
	<a class="navbar-brand" href="/">
		<img src="/apple-icon.png" style="width:20px;" />	
	</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	
	<div class="collapse navbar-collapse" id="nav-content">   
		<ul class="navbar-nav">
			<div class="dropdown">
  				<a class="nav-link dropdown-toggle <?php setnavactive($url, "/groups"); ?>" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">
   					 Groups
 			    	</a>
 			 	<div class="dropdown-menu">
				    <a class="dropdown-item" href="/groups/#Web-Development">Web Development</a>
				    <a class="dropdown-item" href="/groups/#Robotics">Robotics</a>
				    <a class="dropdown-item" href="/groups/#Management-and-Development">Management and Development</a>
				    <a class="dropdown-item" href="/groups/#Programming">Programming</a>
				    <a class="dropdown-item" href="/groups/#Cyber-Security">Cyber Security</a>
  				</div>
			</div>
			<li class="nav-item <?php setnavactive($url, "/about"); ?>">
				<a class="nav-link" href="/about">About</a>
			</li>
			<li class="nav-item <?php setnavactive($url, "/donations"); ?>">
				<a class="nav-link" href="/donations">Donations</a>
			</li>
			<li class="nav-item <?php setnavactive($url, "/contracts"); ?>">
				<a class="nav-link" href="/contracts">Contracts</a>
			</li>
		</ul>
	</div>
</nav>