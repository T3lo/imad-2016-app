console.log('Loaded!');

//Move th image
var img = document.getElementById('profile-pic');
var marginLeft = 0;
function moveRight() {
    marginLeft += 10;
    img.style.marginleft = marginLeft + 'px';
}
img.onclick = function () {
    var interval = setInterval(moveRight, 100);
};