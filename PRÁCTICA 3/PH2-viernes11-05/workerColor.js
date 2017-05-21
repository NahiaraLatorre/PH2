self.onmessage = function(e){
	let datos = e.data,
	imgdata = datos.imgdata,
	color = datos.color;

	
	for(let i=0; i<imgdata.height;i++){
		for(let j=0;j<imgdata.width;j++){
			if(color!='r') // COMPONENTE ROJO
				imgdata.data[(i*imgdata.width+j])*4]=0;

			if(color!='g') //COMPONENTE VERDE
				imgdata.data[(i*imgdata.width+j])*4+1]=0;

			if(color!='b') //COMPONENTE AZUL
				imgdata.data[(i*imgdata.width+j])*4+2]=0;

			//if(color!='a') // COMPONENTE ALPHA
				//imgdata.data[(i*imgdata.width+j])*4+3]=0;
		}
	}

	self.postMessage();

}