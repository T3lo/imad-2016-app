var art_ht = window.getComputedStyle( document.getElementById('article')).height;
var main_ht = window.getComputedStyle( document.getElementById('main')).height;
var h=2000;

while( parseInt(art_ht) > parseInt(main_ht) -770 ){ 
	h += 1000;
	document.getElementById('main').style.height = h.toString() + "px";
main_ht = window.getComputedStyle(document.getElementById('main')).height;
}