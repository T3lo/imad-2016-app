function call (i) {
    var div = document.getElementById('one');
    div.innerHTML = '';

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if( request.readyState === XMLHttpRequest.DONE) {
            if( request.status === 200 ) {
                var txt = request.responseText;
                txt = JSON.parse(txt);
div.innerHTML+="<div><div id='t1'><p>"+txt["date"].toDateString()+"</p></div><div id='t2'><img id='shot' src='"+txt["link"]+"'/><h1>";
div.innerHTML += txt["title"]+"</h1></div><div id='t3'></div></div>";
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

