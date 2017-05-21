function prepararDnD(){
	//ZONA DRAG	
	//let v =document.querySelectorAll('body>footer>img');

	let v = document.querySelector('body>footer>img');
	for(let i=0;i<v.length;i++){
		v[i].setAttribute('draggable', 'true');
		v[i].id = 'img' + i;
		v[i].ondragstart=function(e){
			e.dataTransfer.setData('text/plain', 'img'+i);
		};
	}

	//ZONA DROP
	let cv = document.getElementById('cv01');

	cv.ondragover = function(e){
		e.preventDefault();
		e.stopPropagation();
	}

	cv.ondrop = function(e){
		e.preventDefault();
		e.stopPropagation();

		let x = e.offsetX,
			y = e.offsetY,
			id=e.dataTransfer.getData('text/plain'),
			ctx=cv.getContext('2d');
			img=new Image();

			console.log('ID: ' + id);

			img.onload=function(){
				//ctx.drawImage(img, x, y);
				ctx.drawImage(img, 0, 0, cv.width, cv.height);
			}

			img.src = document.getElementById(id).src;
	}
}

function prepararDnD2(){
	//ZONA DRAG
	let v = document.querySelector('body>footer>img');
	for(let i=0;i<v.length;i++){
		
	}
}

function dibujarCuadricula(){
	let cv = document.getElementById('cv01'),
		ctx =cv.getContext('2d');
		dim = cv.width / 3;

		ctx.beginPath();
		ctx.strokeSyle = '#234';
		ctx.lineWidth = 3;

		for(let i=1; i<3; i++){
			//lineas horizontales
			ctx.moveTo(0,i*dim);
			cyx.lineTo(cv.width, i*dim);

			//lineas verticales
			ctx.moveTo(i*dim, 0);
			ctx.lineTo(i*dim, cv.height);
		}

		ctx.rect(0,0,cv.width, cv.height);
		ctx.stroke();
}