

var height = 2000;
var main_div = document.getElementById('main');

function createTemplate (txt) {
var date = txt.date;    
var htmlTemplate=`
<div id='`;
htmlTemplate += txt["type"];
htmlTemplate +=`'>

         <div id='t1'><p>${date}`;
htmlTemplate +=`
        </p></div>
         <div id='t2'>
<a href='/Blog/
`;
htmlTemplate += txt["id"];
htmlTemplate +=`'>
<img id='shot' src='`;
htmlTemplate += txt["link"];
htmlTemplate +=`
'/></a>
<p>`;
htmlTemplate += txt["content"];
htmlTemplate +=`
</p></div>
         <div id='t3'>
             <div id='comment'>
                <span class='no'>0
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
                        0
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

var cntr=0;

function call (i) {
    var div1 = document.getElementById('one');
    var div2 = document.getElementById('two');
    var div3 = document.getElementById('three');
    var div4 = document.getElementById('four');

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if( request.readyState === XMLHttpRequest.DONE) {
            if( request.status === 200 ) {
                var txt = request.responseText;
                txt = JSON.parse(txt);
                switch(cntr%4) {
                    case 0:div1.innerHTML += createTemplate (txt); break;
                    case 1:div2.innerHTML += createTemplate (txt); break;
                    case 2:div3.innerHTML += createTemplate (txt); break;
                    case 3:div4.innerHTML += createTemplate (txt); break;
                }
                cntr++;
                if(cntr%20 === 0) {
                    height += 2000;
                    main_div.style.height = height.toString() + "px";
                }
            }
        }
    };
    
    request.open('GET', 'http://t3lo.imad.hasura-app.io/div/'+i, true);
    request.send(null);
}

var body = document.getElementById('set');
body.onload = function() {
    for(var j=0;j<20;j++) {
        for(var i=1;i<=5;i++) {
            call(i);
        }
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
