//Counter code
var button = document.getElementById('counter');

button.onclick = function () {
  
  //create a request to the counter endpoint
  var request = new XMLHttpRequest();
  
  //capture the response and store it in a variable 
  request.onreadystatechange = function(){
      if(request.readyState === XMLHttprequest.DONE){
          if(request.status === 200){
              var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }
  };
  
  request.open('GET', 'http://t3lo.imad.hasura-app.io/counter', true);
  request.send(null);
};