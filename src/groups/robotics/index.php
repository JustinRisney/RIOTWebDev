<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Robotics & Education</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" type="text/css" href="/stylesheets/index.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
      <style type="text/css">
        .group-div{
        border: 2px solid #666; 
        border-radius: 10px;
        height: 500px;
      } 
      .trello-groups {
        height: 100%;
        width: 100%;
      } 
      </style>
      <script src="/easter-eggs/libdoge.js" async></script>
      <script src="/js/riot-trello/dist/riot-trello.js"></script>
  </head>
  <body>
    <?php include'../../navbar.php';?>
  <div class="container-fluid text-center">
    <div class="row">
      <div class="col-md-12">
        <h1 style="font-weight: 400; padding: 30px;">Robotics & Education</h1>
        <div>The Robotics & Education group deals with designing, manufacturing, and using parts.  They work with the First Robotics team here on Rocklin High School's campus.</div>
          <div class="col-md-12" style="font-size:30px; padding: 30px;">Projects</div>
          <div class="col-md-12">The Robotics group is currently working on teaching EST to use the 3D Laser Printer.   They are also working on making a software where the robot interacts with the user.</div>
          <div class="col-md-12" style="font-size:30px; padding: 30px;">Previous Projects</div>
          <div class="col-md-12">The Robotics & Education group has worked on many different and beneficial projects in the past years.  They've made a Robotic Garden that watered plants every 5 hours.  The Robotics group has made a battery cart to charge their batteries.  They have also designed a drone inspired by Rainbow Six Siege.  The Robotics & Education group also works in First Robotics Competitions. </div>
        </div>
      </div>
      <br>
      <div id="Robotics" class="col-md-12 group-div inside-div-trello">
        <div id="trello-robotics"  class="trello-groups">
                <div id="board"></div>
            <div src="https://trello.com/b/R2Jwr8h9.json"></div>
        </div>
      </div>
  </div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
  </body>
        <script>
        let board = document.getElementById('board');
        new RiotTrello({
          target: board,
          data: {
            src:"https://trello.com/b/R2Jwr8h9.json",
          }
        })
      </script>
</html>
