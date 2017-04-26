
function arrancar_Index(){
	console.log("arrancando el index");

	//peticionAJAX_GET();
	peticionAJAX_GET_comentarios();

}


function mostrarEntradas(frm){
	
	console.log("mostrando entradas ----- CODIGO PROFESOR");
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/practica2/rest/entrada/';

		section = frm.parentNode.parentNode;

		//var x = document.getElementById("inicio").parentNode.nodeName;

	//url += '?u=' + frm.lpag.value; /*+ '&lpag=' + frm.lpag.value;

	console.log(url);
	console.log(frm.lpag.value);

	xhr.open('GET', url, true);

	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){

			while (a = section.querySelector('div>article'))
				a.remove();

			let html = '';

			console.log(v.FILAS.length);

			for(let i=0; i<v.FILAS.length; i++){
				let e = v.FILAS[i],
					foto = 'http://localhost/practica2/fotos/' + e.fichero;

					let article = section.querySelector('div>template').content.cloneNode(true);

						article.querySelector('h3>a').innerHTML = e.nombre;
						article.querySelector('div>img').setAttribute('src',foto);
						article.querySelector('div>img').setAttribute('alt', e.descripcion_foto);
						article.querySelector('div>p').innerHTML = e.descripcion;
						article.querySelector('div>p:first-of-type').innerHTML = e.login;
						article.querySelector('div>time').innerHTML = e.fecha;
						article.querySelector('div>p:nth-of-type(2)').innerHTML = e.nfotos + " fotos";
						article.querySelector('div>p:nth-of-type(3)').innerHTML = e.ncomentarios + " comentarios";
						
						section.querySelector('h2+div').appendChild(article);

			}//for(let i=0; i<v.FILAS.length; i++)
		}
	}

	xhr.send();

	return false;
}


/************************************ÚLTIMAS ENTRADAS***********************/
/*
function peticionAJAX_GET()
{

	url = 'http://localhost/practica2/rest/entrada/?u=6';

	console.log("peticionAJAX_GET, url = " + url);

	nodo=document.getElementById("LastEnt");

	obj= crearObjAjax();

	if(obj) 
	{ 
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio; // función callback: procesarCambio para entrada
		obj.open("GET",url, true);
		obj.send(); // Se envía la petición	
	}
}

//funcion que muestra los cambios de estado en la peticion
function procesarCambio()
{
	console.log("procesarCambio");

	console.log(obj.readyState);

	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos de la entrada -> devolviendo");//devolvemos mensaje por log
			entrada=JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados
			formatear_entrada();//mostramos la informacion de la entrada
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de la entrada");//devolvemos mensaje por log
		}
	}
}


//adecuamos los datos a su formato de entrada
function formatear_entrada()
{
	console.log("formatear_entrada");

	nodo_titulo=document.getElementById("tituloInd");
	nodo_usuario=document.getElementById("usuarioInd");
	nodo_fecha=document.getElementById("fechaInd");
	
	if(entrada != "")
	{
		for(a=0;a < entrada.FILAS.length;a++){
			
			nodo_titulo.innerHTML=entrada.FILAS[a].nombre; 
			nodo_usuario.innerHTML=entrada.FILAS[a].login;
			nodo_fecha.innerHTML=entrada.FILAS[a].fecha;
		}		
	}
	//hasta aqui nos queda poner la foto del inicio, los comentarios y las fotos de la entrada
	peticionAJAX_GET_fotos(entrada.FILAS[0].id);//sirve para devolver las fotos que hay en esta entrada
}


function peticionAJAX_GET_fotos(num)
{
		
	url='http://localhost/practica2/rest/foto/?id_entrada=' + num;

	console.log("ID ENTRADA = " + num);

	console.log("peticionAJAX_GET_fotos, url = " + url);

	obj= crearObjAjax();
	if(obj) 
	{ 
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio_fotos; // función callback: procesarCambio para entrada
		obj.open("GET",url, true); // Se crea petición GET a url, asíncrona ("true")
		obj.send(); // Se envía la petición
	}
}


//funcion que muestra los cambios de estado en la peticion
function procesarCambio_fotos()
{
	console.log("procesarCambio_fotos");
	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos de la entrada -> devolviendo");//devolvemos mensaje por log
			fotos=JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados
			formatear_fotos();//mostramos la informacion de la entrada
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de la entrada");//devolvemos mensaje por log
		}
	}
}


function formatear_fotos()
{
	console.log("formatear_fotos");

	if(fotos != "")
	{

		nodo_fotos_realizadas=document.getElementById("fotoIndex");
		fotos_realizadas="";

		for(a=0;a < fotos.FILAS.length;a++) 
		{
			//fotos_realizadas = fotos_realizadas + '<p>'+fotos.FILAS[a].texto+'</p>';

			fotos_realizadas += '<div class="imagen"><div class="foto"><img src="fotos/'+fotos.FILAS[a].fichero+'" alt="imagenes" /></div>';
		}

		nodo_fotos_realizadas.innerHTML=fotos_realizadas;
	}
 	
}



/******************************* ULTIMOS COMENTARIOS *******************************************/

function peticionAJAX_GET_comentarios()
{
	obj= new XMLHttpRequest();

	url='http://localhost/practica2/rest/comentario/?u=10';

	console.log("peticionAJAX_GET_comentarios, url = " + url);

	if(obj) 
	{ 
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio_comentarios; // función callback: procesarCambio para entrada
		obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
		obj.send(); // Se envía la petición
	}
}

//funcion que muestra los cambios de estado en la peticion
function procesarCambio_comentarios()
{
	console.log("procesarCambio_comentarios");

	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos de la entrada -> devolviendo");//devolvemos mensaje por log
			comenta=JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados
			formatear_comentarios();//mostramos la informacion de la entrada
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de la entrada");//devolvemos mensaje por log
		}
	}
}

function formatear_comentarios()
{
	console.log("formatear_comentarios");

	if(comenta != "")
	{
		nodo_comentarios_realiazados=document.getElementById("LastComenta");
		comentarios_realizados="<h2></h2>";

		for(a=0;a < comenta.FILAS.length;a++) 
		{
			comentarios_realizados += '<article class="comentario_R"><p id="comentario'+comenta.FILAS[a].id+'"></p>'+'<h3><b>'+comenta.FILAS[a].titulo+'</b></h3><p>'+comenta.FILAS[a].login+'</p><p>'+comenta.FILAS[a].texto+'</p><time>'+comenta.FILAS[a].fecha+'</time></article>';
		}

		nodo_comentarios_realiazados.innerHTML=comentarios_realizados;
	}
}