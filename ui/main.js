var item = document.getElementsByClassName('item');
var sk = document.getElementsByClassName('sk');

var b1 = document.getElementById('b1');
var b2 = document.getElementById('b2');
var b3 = document.getElementById('b3');
var b4 = document.getElementById('b4');
var b5 = document.getElementById('b5');

var open=1;
var trbl1 = document.getElementById('one');
var trbl2 = document.getElementById('two');
var trbl3 = document.getElementById('three');
var trbl4 = document.getElementById('four');


b2.onclick = function () {
	
	if( open > 2 ) {
		trbl4.style.marginLeft = '0';
		trbl3.style.marginLeft = '0';
		trbl2.style.marginLeft = '0';
	}
	else {
		if(open < 2) {
				trbl1.style.marginLeft = '-100%';
		}
	}
  	
	for(var i=0;i<6;i++){
	    item[i].style.fill = "#ff9d1e";
	}
	sk[0].style.color = "#ff9d1e";
	sk[1].style.color = "#ff9d1e";
	
	open = 2;
	console.log(open);
};


b3.onclick = function () {
	
	if( open > 3 ) {
    trbl3.style.marginLeft = '0';
		trbl4.style.marginLeft = '0';		
	}
	else {
		if(open < 3) {
			trbl1.style.marginLeft = '-100%';
      trbl2.style.marginLeft = '-100%';
		}
	}
  	
	for(var i=0;i<6;i++){
	    item[i].style.fill = "#ff9d1e";
	}
	sk[0].style.color = "#ff9d1e";
	sk[1].style.color = "#ff9d1e";
	
	open = 3;
	console.log(open);
};



b4.onclick = function () {

	if( open > 4 ) {
			trbl4.style.marginLeft = '0';
	}
	else {
		if(open < 4) {		
      trbl1.style.marginLeft = '-100%';
			trbl2.style.marginLeft = '-100%';
			trbl3.style.marginLeft = '-100%';
		}
	}
	setTimeout( function() {
		
	   for(var i=0;i<6;i++){
		    item[i].style.fill = "white";
	   }
		sk[0].style.color = "white";
		sk[1].style.color = "white";
	}, 1000);

	open = 4;
	console.log(open);
};


b5.onclick = function () {

	if( open < 5 ) {
				trbl1.style.marginLeft = '-100%';
				trbl2.style.marginLeft = '-100%';
				trbl3.style.marginLeft = '-100%';
				trbl4.style.marginLeft = '-100%';
	}
		
	for(var i=0;i<6;i++){
	    item[i].style.fill = "#ff9d1e";
	}
	sk[0].style.color = "#ff9d1e";
	sk[1].style.color = "#ff9d1e";	
	
	open = 5;
	console.log(open);
	
};


b1.onclick = function () {

	if( open > 1 ) {		
		trbl4.style.marginLeft = '0';
    trbl3.style.marginLeft = '0';
		trbl2.style.marginLeft = '0';
	  trbl1.style.marginLeft = '0';			
	}
	
	for(var i=0;i<6;i++){
	    item[i].style.fill = "#ff9d1e";
	}
	sk[0].style.color = "#ff9d1e";
	sk[1].style.color = "#ff9d1e";
	
	open = 1;
	console.log(open);
};
