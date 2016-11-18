/*
function call (i) {
    var div = document.getElementById('test');
    div.innerHTML = '<p>qwerty</p>';

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if( request.readyState === XMLHttpRequest.DONE) {
            if( request.status === 200 ) {
                var txt = request.responseText;
                txt = JSON.parse(txt);
div.innerHTML += "<div><div id='t1'><p>"+txt["date"]+"</p></div><div id='t2'><img id='shot' src="+txt["link"]+"/><p>"+txt["field"];
div.innerHTML += "</p></div><div id='t3'><p></p></div></div>";
            }
        }
    };
        request.open('GET', 'http://t3lo.imad.hasura-app.io/div/'+i, true);
        request.send(null);
}

var body = document.getElementById('set');
body.onload = function() {
    for(var i=1;i<=8;i++) {
        call(i);
    }
};
*/
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