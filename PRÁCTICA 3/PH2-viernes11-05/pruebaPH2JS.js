var cvAux=null;


function preparaDnD(){
	let cv = document.getElementById('cv01');

	cv.ondragover = function(e){
		e.preventDefault();
		e.stopPropagation();
	};

	cv.ondrop = function(e){
		e.preventDefault();
		e.stopPropagation();

		let ficheros = e.dataTransfer.files;
			fr = new FileReader();

		fr.onload = function(){
			let img = new Image();

			img.onload = function(){
				cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
			};

			img.src=fr.result;

		};

		fr.readAsDataURL(ficheros[0]);

	};
}


function aColor(color){
	let cv = document.getElementById('cv01'),
	ctx = cv.getContext('2d'),
	//imgdata=ctx.getImageData(0,0,cv.width, cv.height);
	imgdata,
	worker = new Worker('workerColor.js');

	if(cvAux==null){
		cvAux = cv.cloneNode();
		cv.Aux.getContxt('2d').putImageData(=ctx.getImageData(0,0,cv.width,cv.height),0,0);
	}

	imgdata = cvAux.getContxt('2d').getImageData(0,0,cv.width,cv.height);

	worker.onmessage=function(e){
		let datos = e.data;
			imgdata = datos.imgdata;

			ctx.putImageData(imgdata,0,0);

	};



	worker.postMessage({"imgdata":imgdata, "color":color});

	//ctx.putImageData(imgdata,0,0);

}
function aColor2(color){
	let cv = document.getElementById('cv01'),
	ctx = cv.getContext('2d'),
	//imgdata=ctx.getImageData(0,0,cv.width, cv.height);
	imgdata,
	worker = new Worker('workerColor.js');

	if(cvAux==null){
		cvAux = cv.cloneNode();
		cv.Aux.getContxt('2d').putImageData(=ctx.getImageData(0,0,cv.width,cv.height),0,0);
	}

	imgdata = cvAux.getContxt('2d').getImageData(0,0,cv.width,cv.height);

	worker.onmessage=function(e){
		let datos = e.data;
			imgdata = datos.imgdata;

			ctx.putImageData(imgdata,0,0);

	};



	worker.postMessage({"imgdata":imgdata, "color":color});

	//ctx.putImageData(imgdata,0,0);

}