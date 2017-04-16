var viaje_valido=false;
var id_viaje="";
var viaje="";
var comenta="";
var fotos="";
var comentario_ancla="";
var puede_hacer_comentarios=false;//por defecto ponemos que no puede hacer comentario
function arranque_personalizado()
{
	console.log("ejecutando arranque personalizado para viajes, vamos a recuperar el id del viaje");
	expresion=/#\w+/;
	comentario_ancla=document.location.href.match(expresion);
	var loc = document.location.href.replace(expresion,'');
    if(loc.indexOf('?') > 0)
    {
    	console.log('existen argumentos');
    	var cadena_argumentos = loc.split('?')[1];
    	var argumentos = cadena_argumentos.split('&');
    	if(argumentos[0])
    	{
    		if(argumentos[0].indexOf('id=') >= 0)
    		{
    			id_viaje = argumentos[0].split('id=')[1];
    			console.log("id encontrado "+id_viaje);
    			viaje_valido=true;
    		}
    		else
    		{
    			console.log('no existe el id en el primer argumento');			
    		}
    	}
    }
    else
    {
    	console.log('no existen argumentos');
    }
    monstrar_viaje();
    puede_comentar();
}
//funcion que realiza la tearea de monstrar el viaje
function monstrar_viaje()
{
	if(viaje_valido)
	{
		console.log("vamos a mostrar el viaje");
		peticionAJAX_GET();
	}
	else
	{
		console.log("viaje no encontrado");
	}
}
//peticion para ajax del viaje
function peticionAJAX_GET()
{
	obj= crearObjAjax();
	if(obj) 
	{ 
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio; // función callback: procesarCambio para viaje
		obj.open("GET","/practica2/rest/viaje/"+id_viaje, true); // Se crea petición GET a url, asíncrona ("true")
		obj.send(); // Se envía la petición
	}
}

function peticionAJAX_GET_fotos()
{
	obj= crearObjAjax();
	if(obj) 
	{ 
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio_fotos; // función callback: procesarCambio para viaje
		obj.open("GET","/practica2/rest/foto/?id_viaje="+id_viaje, true); // Se crea petición GET a url, asíncrona ("true")
		obj.send(); // Se envía la petición
	}
}

function peticionAJAX_GET_comentarios()
{
	obj= crearObjAjax();
	if(obj) 
	{ 
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio_comentarios; // función callback: procesarCambio para viaje
		obj.open("GET","/practica2/rest/comentario/?id_viaje="+id_viaje, true); // Se crea petición GET a url, asíncrona ("true")
		obj.send(); // Se envía la petición
	}
}

function peticionAJAX_POST_enviar_comentario() 
{
	obj = crearObjAjax();
	if (obj) 
	{ 	
		// Si se ha creado el objeto, se completa la petición ...
		// Argumentos:
		console.log("se empieza a procesar la peticion");
		
		var clave = JSON.parse(sessionStorage.getItem("login_session")).CLAVE;
		var login = JSON.parse(sessionStorage.getItem("login_session")).LOGIN;
		var titulo = document.getElementById("titulo_en").value;
		var texto = document.getElementById("coment_en").value;
		var id_enviar = id_viaje;
		var args ="clave="+clave+"&login="+login+"&titulo="+titulo+"&texto="+texto+"&id_viaje="+id_enviar;
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange = procesarCambio_enviar; // función callback: procesarCambio
		obj.open("POST","/practica2/rest/comentario/", true); // Se crea petición POST a url, asíncrona("true")
		// Es necesario especificar la cabecera "Content-type" para peticiones POST
		obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		obj.send(args); // Se envía la petición
		console.log("se termina de procesar la informacion");
	}
}

//funcion que muestra los cambios de estado en la peticion
function procesarCambio()
{
	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos del viaje -> devolviendo");//devolvemos mensaje por log
			viaje=JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados
			if(viaje.FILAS.length == 0)
			{
				location.href="index.html";
			}
			foormatear_viaje();//mostramos la informacion del viaje
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html del viaje");//devolvemos mensaje por log
		}
	}
}

//funcion que muestra los cambios de estado en la peticion
function procesarCambio_fotos()
{
	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos del viaje -> devolviendo");//devolvemos mensaje por log
			fotos=JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados
			foormatear_fotos();//mostramos la informacion del viaje
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html del viaje");//devolvemos mensaje por log
		}
	}
}

//funcion que muestra los cambios de estado en la peticion
function procesarCambio_comentarios()
{
	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos del viaje -> devolviendo");//devolvemos mensaje por log
			comenta=JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados
			foormatear_comentarios();//mostramos la informacion del viaje
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html del viaje");//devolvemos mensaje por log
		}
	}
}

function procesarCambio_enviar()
{
	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos del viaje -> devolviendo");//devolvemos mensaje por log
			result=JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados
			zoom_activo();
			zoom_activo(1,"Su comentario se ha enviado correctamente.");
			peticionAJAX_GET_comentarios();
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html del viaje");//devolvemos mensaje por log
		}
	}
}

//adecuamos los datos a su formato de viaje
function foormatear_viaje()
{
	nodo_titulo=document.getElementById("titulo");
	nodo_descripcion=document.getElementById("descripcion");
	nodo_valora=document.getElementById("valora");
	if(viaje != "")
	{
		nodo_titulo.innerHTML=viaje.FILAS[0].NOMBRE; 
		nodo_descripcion.innerHTML=viaje.FILAS[0].DESCRIPCION;
		valor4="";
		for(h=1;h <= 5;h++)
		{
			if(h <= viaje.FILAS[0].VALORACION)
			{
				valor4=valor4+"<span class='icon-star' style='color:red;'></span>";	
			}
			else
			{
				valor4=valor4+"<span class='icon-star'></span>";
			}
		} 
		nodo_valora.innerHTML=valor4; 
	}
	//hasta aqui nos queda poner la foto del inicio, los comentarios y las fotos del viaje
	peticionAJAX_GET_fotos();//sirve para devolver las fotos que hay en este viaje
}

function foormatear_fotos()
{
	if(fotos != "")
	{
		nodo_pimagen=document.getElementById("pimagen");
		nodo_fotos_realizadas=document.getElementById("fotos_realizadas");
		nodo_pimagen.src=innerHTML="fotos/"+id_viaje+"/"+fotos.FILAS[0].FICHERO; 
		fotos_realizadas="<header><h3>Fotos del Viaje</h3></header>";
		for( a=0;a < fotos.FILAS.length;a++) 
		{
			fotos_realizadas=fotos_realizadas+'<p>'+fotos.FILAS[a].DESCRIPCION+'</p><img src="fotos/'+id_viaje+"/"+fotos.FILAS[a].FICHERO+'" alt="'+fotos.FILAS[a].DESCRIPCION+'"/>';
		}
		nodo_fotos_realizadas.innerHTML=fotos_realizadas;
	}
	peticionAJAX_GET_comentarios();//se encarga de cargar los comentarios en la pagina, asi como de poner el campo para comentar si estas registrado
}

function foormatear_comentarios()
{
	if(comenta != "")
	{
		nodo_comentarios_realiazados=document.getElementById("comenta");
		comentarios_realizados="";
		for(a=0;a < comenta.FILAS.length;a++) 
		{
			if(puede_hacer_comentarios)
			{
				comentarios_realizados=comentarios_realizados+'<p id="comentario'+comenta.FILAS[a].ID+'"><span>'+comenta.FILAS[a].LOGIN+'</span><b>'+comenta.FILAS[a].TITULO+'</b> '+comenta.FILAS[a].TEXTO+'<span class="fecha_comentarios"><time datetime="'+comenta.FILAS[a].FECHAHORA+'">'+comenta.FILAS[a].FECHAHORA+'</time></span></p><button type="button" onclick="responder(&#39;'+comenta.FILAS[a].TITULO+'&#39;);">Responder</button>';
			}
			else
			{
				comentarios_realizados=comentarios_realizados+'<p id="comentario'+comenta.FILAS[a].ID+'"><span>'+comenta.FILAS[a].LOGIN+'</span><b>'+comenta.FILAS[a].TITULO+'</b> '+comenta.FILAS[a].TEXTO+'<span class="fecha_comentarios"><time datetime="'+comenta.FILAS[a].FECHAHORA+'">'+comenta.FILAS[a].FECHAHORA+'</time></span></p>';				
			}				
		}
		nodo_comentarios_realiazados.innerHTML=comentarios_realizados;
	}

	if(comenta.FILAS.length == 0)
	{
		document.getElementById("comenta").innerHTML="<h4 style='color:red;'>Se el primero en comentar.</h4>";
	}

	llevar_al_comentario();
}

function puede_comentar()
{
	compr=comprobar_storage();
	if(compr)
	{
		//comprobamos si esta logueado o no
		if(sessionStorage.getItem("login_session"))
		{
			console.log("puede comentar");
			puede_hacer_comentarios=true;
			document.getElementById('campo_comentario').style.display='block';
		}
		else
		{
			console.log("no puede comentar");
			puede_hacer_comentarios=false;
			document.getElementById('campo_comentario').style.display='none';
		}
	}
}


function zoom_activo(modo,texto)
{
	ventana = document.getElementById('zoo');
	mensaje = document.getElementById('mensaje');
	if(!ventana.classList.contains('zoom_visible'))
	{
		subir();
		if(modo == 2)
		{
			mensaje.innerHTML = "<h2 style='color:green;'>"+texto+"</h2>";
		}
		else
		{
			mensaje.innerHTML = "<h2 style='color:green;'>"+texto+"<button onclick='zoom_activo();'>Vale</button>";
		}
		ventana.classList.add('zoom_visible');
		document.body.classList.add('bloqueo');
	}
	else
	{
		ventana.classList.remove('zoom_visible');
		document.body.classList.remove('bloqueo');
	}
}

function enviar_comentario()
{
	zoom_activo(2,"Enviando comentario, tenga paciencia por favor.");
	peticionAJAX_POST_enviar_comentario();
	return false;
}

function llevar_al_comentario()
{
	if(comentario_ancla != null)
	location.href = comentario_ancla;
}

function responder(titul)
{
	document.getElementById("titulo_en").value="RE:"+titul;
	document.getElementById("coment_en").focus();
}