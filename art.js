var enter = document.getElementById('enter');

enter.onclick = function() {
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
  
  var comInput = document.getElementById('name');
  var com = comInput.value;
  request.open('GET', 'http://t3lo.imad.hasura-app.io/one/comments?name=' + com, true);
  request.send(null);      
  
};

