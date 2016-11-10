console.log('Loaded!');

//Move th image

var img = document.getElementById('profile-pic');
var marginLeft = 0;

function moveRight() {
    marginLeft = marginLeft + 5;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function () {
    var interval = setInterval(moveRight, 50);    
};