var body = document.getElementById('set');
body.onload = function() {
    var div = document.getElementById('test');
    div.innerHTML = '<p>qwerty</p>';
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if( request.readyState === XMLHttpRequest.DONE) {
            if( request.status === 200 ) {
                var txt = request.responseText;
                txt = JSON.parse(txt);

                var lm={
                    "title":"123" , "date": "10-10-16", "content": "<p>Damn it</p>"
                };
                div.innerHTML += "<div id='one'><div><p>"+txt["title"]+"</p></div><div>"+txt["content"]+"</div></div>";
            }
        }
    };
    
    for(var i=1;i<=2;i++) {
        request.open('GET', 'http://t3lo.imad.hasura-app.io/div/'+i, true);
        request.send(null);
    }
};

var submit = document.getElementById('submit_btn');

submit.onclick = function() {
  //create a request Object
  var request = new XMLHttpRequest();
  
  //capture the response and store it in a variable 
  request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 200){
             var names = request.responseText;
             names = JSON.parse(names);
             var list = '';
            for(var i=0;i<names.length;i++){
                list += '<li>' + names[i] + '</li>';
            }
            var ul=document.getElementById('namelist');
            ul.innerHTML = list;
          }
      }
  } ;
  
  var field = document.getElementById('name');
  var name = field.value;
  request.open('GET', 'http://t3lo.imad.hasura-app.io/submit-name?name=' + name, true);
  request.send(null);      

};


var button = document.getElementById('counter');
button.onclick = function() {
  var request = new XMLHttpRequest()  ;
  
  request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE) {
        if(request.status === 200){
            var res = request.responseText ;
            var span = document.getElementById('count') ;
            span.innerHTML = res ;
        }
    }
  };
  
  request.open('GET', 'http://t3lo.imad.hasura-app.io/counter' , true);
  request.send(null);
  
};