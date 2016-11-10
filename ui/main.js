console.log('Loaded!');

//Move th image

var img = document.getElementById('profile-pic');
var marginLeft = 0;

function moveRight() {
    marginLeft = marginLeft + 10;
    img.style.marginleft = marginLeft + 'px';
}
img.onclick = function () {
    img.style.marginLeft = '100px';
};