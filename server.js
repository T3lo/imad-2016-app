var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));


var config = {
    user: 't3lo',
    database: 't3lo',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};


function createTemplate (data) {
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;

var htmlTemplate=`
<html>
    <head>
        <title>
            ${title}
        </title>
    </head>
    <body>
        <div>
            <a href='/'>HOME</a>
        </div>
        <hr/>
        <h2>${heading}</h2>
        <div>
            ${date.toDateString()}
        </div>
        <div>
            ${content}      
        </div>
        
        <input type='text' id='name' placeholder='name'></input>
        <input type='submit' value='Submit' id='submit_btn'></input>
        <ul id='namelist'></ul>
        
        <script type="text/javascript" src="/ui/art.js">
        </script>
        
    </body>
</html>    
`;

    return htmlTemplate;
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'dummy.html'));
});


var pool = new Pool(config);
app.get('/test-db', function(req , res){
   //make a select req
   //return a response with the results
   pool.query('SELECT * FROM divs' , function(err , result){
      if(err) {
          res.status(500).send(err.toString());
      }
      else{
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.get('/div/:articleName', function(req , res){

   pool.query('SELECT * FROM divs WHERE id = $1' ,[req.params.articleName] , function(err , result){
      if(err) {
          res.status(500).send(err.toString());
      }
      else{
         if(result.rows.length === 0) {
             res.status(404).send('Article not found');
         } else {
             res.send(JSON.stringify(result.rows[0]));
         }
      }
   });
});

var counter = 0;
app.get('/counter', function( req, res) {
   counter = counter + 1;
   res.send(counter.toString());
});

var names=[];
app.get('/submit-name' , function(req , res) {
   //get the name from the request
   
   var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});



var coms=[];
app.get('/one/comments' ,function(req ,res ){
        var com = req.query.name;
        coms.push(com);
        res.send(JSON.stringify(coms));
});



app.get('/:articleName', function(req, res) {
  alert("hi");
  pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err , result) {
     if(err) {
         res.status(500).send(err.toString());
     } 
     else {
         if(result.rows.length === 0) {
             res.status(404).send('Article not found');
         } else {
//             res.send(JSON.stringify(result.rows));
             var articleData = result.rows[0];
             res.send(createTemplate(articleData));
         }
     }
  });

});







app.get('/ui/pre_main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'pre_main.js'));
});





app.get('/MyBLog.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'MyBLog.html'));
});

app.get('/ui/bfoot.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bfoot.css'));
});

app.get('/ui/full.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'full.css'));
});

app.get('/ui/bhead.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bhead.css'));
});

app.get('/ui/bmain.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bmain.css'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/main2.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main2.js'));
});

app.get('/ui/art.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'art.js'));
});





app.get('/ui/x1.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'x1.css'));
});

app.get('/ui/p1.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'p1.css'));
});

app.get('/ui/p2.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'p2.css'));
});

app.get('/ui/p4.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'p4.css'));
});

app.get('/ui/p3.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'p3.css'));
});

app.get('/ui/p5.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'p5.css'));
});





var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
