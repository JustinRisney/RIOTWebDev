<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="/js/riot-trello/dist/riot-trello.js"></script>
    <title>Cyber Security</title>
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
  </head>
  <body>
    <?php include'../../navbar.php';?>
    <div class="container-fluid text-center">
      <div class="row">
        <div class="col-md-12">
          <h1 style="font-weight: 200; padding: 30px;">Cyber Security</h1>
          <div style="color: #FFFFFF;">Irony</div>
          <div>
            <p style="font-weight:200">The Cyber Security team is currently learning more about cyber security and how to start networking on a live network. After the sprint cycle they will begin work on the server and implementing what they have learned using python to start creating the network. Their current goal is to learn python to start scripting. Longer term goals including using python for hacking, scripting and possibly starting a server and network. The team focuses on working together and in majority of the projects are done as a team.</p>
          </div>  
        </div>
        <div class="col-md-12">
          <div id="board"></div>
        </div>
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
    <script>
      let board = document.getElementById('board');
      new RiotTrello({
          target: board,
          data: {
              src: "https://trello.com/b/LcnXMWCh.json",
          }
      });
    </script>
  </body>
</html>

