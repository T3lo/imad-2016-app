function createTemplate (txt) {

var htmlTemplate=`
<div id='`;
htmlTemplate += txt["type"];
htmlTemplate +=`
'>
         <div id='t1'><p>`;
htmlTemplate += txt["date"];
htmlTemplate +=`
        </p></div>
         <div id='t2'>
<img id='shot' src='`;
htmlTemplate += txt["pic"];
htmlTemplate +=`
'/>
<p>`;
htmlTemplate += txt["content"];
htmlTemplate +=`
</p></div>
         <div id='t3'>
             <div id='comment'>
                <span class='no'>25
`;
htmlTemplate +=`
                </span>
                <p>
                    comments
                </p>
            </div>
             <div id='like'>
                <div class='no'>
                    <span>
                        281
                    </span>
                </div>
                <div class='like_pic'>
                    <img src='
                        https://cdn2.iconfinder.com/data/icons/cute-tech-icon-set-1/512/Like-128.png
                    '/></div>
             </div>
          </div>
     </div>

`;

    return htmlTemplate;
}


function call (i) {
    var div = document.getElementById('test');

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if( request.readyState === XMLHttpRequest.DONE) {
            if( request.status === 200 ) {
                var txt = request.responseText;
                txt = JSON.parse(txt);
                div.innerHTML += createTemplate (txt);
            }
        }
    };
    
    request.open('GET', 'http://t3lo.imad.hasura-app.io/div/'+i, true);
    request.send(null);
}

var body = document.getElementById('set');
body.onload = function() {

        for(var i=1;i<=1;i++) {
            call(i);
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
