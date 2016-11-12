var enter = document.getElementById('submit_btn');

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
  
  var com = document.getElementById('name');
  var name = com.value;
  request.open('GET', 'http://t3lo.imad.hasura-app.io/one/comments?name=' + name, true);
  request.send(null);      

};