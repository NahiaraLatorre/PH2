
function mostrarEntradas(frm){
	
	console.log("mostrando entradas ----- CODIGO PROFESOR");
	let xhr = new XMLHttpRequest(),

	url = 'http://localhost/practica2/rest/entrada/';

	url += '?pag=' + frm.pag.value + '&lpag=' + frm.lpag.value; 

	var x = document.getElementById("index").parentNode.parentNode;

	console.log(url);
	//console.log(frm.lpag.value);

	xhr.open('GET', url, true);

	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok'){

			while (a = x.querySelector('div>article'))
				a.remove();

			let html = '';

			console.log(v.FILAS.length);

			for(let i=0; i<v.FILAS.length; i++){
				let e = v.FILAS[i],
					foto = 'http://localhost/practica2/fotos/' + e.fichero;

					let article = x.querySelector('div>template').content.cloneNode(true);

						article.querySelector('h3>a').innerHTML = e.nombre;
						article.querySelector('div>img').setAttribute('src',foto);
						article.querySelector('div>img').setAttribute('alt', e.descripcion_foto);
						article.querySelector('div>p').innerHTML = e.descripcion;
						article.querySelector('div>p:first-of-type').innerHTML = e.login;
						article.querySelector('div>time').innerHTML = e.fecha;
						article.querySelector('div>p:nth-of-type(2)').innerHTML = e.nfotos + " fotos";
						article.querySelector('div>p:nth-of-type(3)').innerHTML = e.ncomentarios + " comentarios";
						
						x.querySelector('h2+div').appendChild(article);

						//console.log("el id de la entrada es: " + e.id);

			}//for(let i=0; i<v.FILAS.length; i++)
		}
	}

	xhr.send();

	return false;
}


/************************************ÚLTIMAS ENTRADAS***********************/
function peticionAJAX_GET() //peticion para ajax de comentario
{
	url = 'http://localhost/practica2/rest/entrada/?u=6';
	obj= new XMLHttpRequest();

	console.log("peticionAJAX_GET -- -- " + url);


	if(obj) 
	{ 
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio; // función callback: procesarCambio para entradas
		obj.open("GET",url, true); // Se crea petición GET a url, asíncrona ("true")
		obj.send(); // Se envía la petición
	}
}

function procesarCambio()//procesar cambio para entradas
{

	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			console.log("**IF procesarCambio**");
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos entradas -> devolviendo");//devolvemos mensaje por log
			entradas=JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados

			formatear_entradas(entradas);//mostramos la informacion en la pagina
		}
		else 
		{
			console.log("**else procesar cambio**");
			console.warn("no se ha podido completar la peticion ajax-html de index-entradas");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}

function formatear_entradas(a)
{
	console.log("****formatear_entradas****");

	nodo=document.getElementById("seccionEnt");//nodo div de index

		for (i=0; i<a.FILAS.length; i++) 
		{

			foto = 'http://localhost/practica2/fotos/' + a.FILAS[i].fichero;

			//asignamos las datos a variables mas simples
			titulo = a.FILAS[i].nombre;	
			id= a.FILAS[i].id;
			usu= a.FILAS[i].login;
			fecha = a.FILAS[i].fecha;
			numFotos=a.FILAS[i].nfotos;
			numComent=a.FILAS[i].ncomentarios;
			
			//nodoA=document.getElementById("seccionEnt");
			articulo=document.createElement("article");

			//seccionEnt = '<article class="entrada">';
			seccionEnt = '<h3>' + titulo + '</h3><div class="imagen"><div class="foto"><img src="'+ foto +'" alt="imagenEntrada"/></div><h4><a href="entrada.html?id=' + id + '"">Ver más....</a></h4></div>';
			seccionEnt += '<div class="datos"><p>' + usu + '</p><time>' + fecha + '</time><p>' + numFotos + ' fotos</p><p>' + numComent + ' comentarios</p></div>' ;
			//seccionEnt += '</article>';

			articulo.innerHTML=seccionEnt;
			nodo.appendChild(articulo);
		}
	
	console.log("monstrando entradas");

	peticionAJAX_GET_comentarios();
	
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
		comentarios_realizados="";

		for(a=0;a < comenta.FILAS.length;a++) 
		{
			comentarios_realizados += '<article class="comentario_R"><p id="comentario'+comenta.FILAS[a].id+'"></p>'+'<h3><b>'+comenta.FILAS[a].titulo+'</b></h3><p>'+comenta.FILAS[a].login+'</p><p>'+comenta.FILAS[a].texto+'</p><time>'+comenta.FILAS[a].fecha+'</time></article>';
		}

		nodo_comentarios_realiazados.innerHTML=comentarios_realizados;
	}
}