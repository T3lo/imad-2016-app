var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var config = {
    user: 't3lo',
    database: 't3lo',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};


function createTemplate2 (data) {
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var img=data.img;
    
var htmlTemplate=`
<!DOCTYPE html>
<html class="">
<head>
    <title>${title}</title>
    <link href="/ui/bhead.css" rel="stylesheet" />
    <link href="/ui/bfoot.css" rel="stylesheet" />
    <link href="/ui/full.css" rel="stylesheet" />
    <link href="/ui/article_page.css" rel="stylesheet" />
</head>
<body id='set'>
    <div id='container'>
	<div class='stop'></div>
        <div id='head'>
            <h1>MyBLog</h1>
            <div id='src'>
                <div id='btn1'></div>
                <input type='text' placeholder='Search me'/>
            </div>
            <div id='right'>
                <div id='up'>
                    <div id='login'><span id='first'>Log in</span></div>
                    <div id='signup'><span id='second'>Sign up</span></div>
                </div>
                <div id='down'>
                    <ul>
                      <li>Code</li>
                      <li>Music</li>
                      <li>Places</li> 
                      <li>Books</li>
                    </ul>
                </div>
            </div>
	    </div>
	    
	    <div id='main'>
	        <div id='div_pic'>
	            <img id='pic' src="${img}"/>
	        </div>
		<div id='heading'><h1>${heading}</h1></div>
	        <div id='article'>
                ${content}
	        </div>

	    </div>
	    <div id='foot'></div>
    </div>
        
        <script type="text/javascript" src="/ui/art.js">
        </script>

</body>
</html>
`;

    return htmlTemplate;
}

function hash(input ,salt){
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input ,salt ,10000 ,512 , 'sha512');
    return ["pkbdf2" ,"10000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res) {
        var hashString = hash(req.params.input , 'this-is-some-random-string');
        res.send(hashString);
});
 
app.post('/create-user', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    pool.query('SELECT * FROM "user" WHERE username = $1 ', [username], function(err, result) {
        if(err) {
          res.status(500).send(err.toString());
        } else {
            if(result.rows.length === 0 ){
                res.send(403).send('Username or password invalid');
            } else {
            
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password, salt); //Creating a hash based on the password submitted and the original salt
                if(hashedPassword === dbString){
                    res.send('Creditentials correct!');
                } else {
                    res.status(403).send('username/password is invalid');                }
                
            }
            
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

app.get('/Blog/:articleName', function(req, res) {
  pool.query("SELECT * FROM article WHERE id = $1", [req.params.articleName], function(err , result) {
     if(err) {
         res.status(500).send(err.toString());
     } 
     else {
         if(result.rows.length === 0) {
             res.status(404).send('Article not found');
         } else {
//             res.send(JSON.stringify(result.rows));
             var articleData = result.rows[0];
             res.send(createTemplate2(articleData));
         }
     }
  });

});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'dummy.html'));
});

app.get('/MyBLog.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'MyBLog.html'));
});

app.get('/tset.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'tset.html'));
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







app.get('/ui/pre_main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'pre_main.js'));
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

app.get('/ui/article_page.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article_page.css'));
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
