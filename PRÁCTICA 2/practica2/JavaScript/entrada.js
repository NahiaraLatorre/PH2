var entrada_valida=false;
var id_entrada="1";
var entrada="1";
var comenta="";
var fotos="";
var comentario_ancla="";
var puede_hacer_comentarios=false;//por defecto ponemos que no puede hacer comentario


function crearObjAjax(){

	console.log("creando objeto AJAX");
	var xmlhttp;
  	if(window.XMLHttpRequest) { // Objeto nativo
   		xmlhttp= new XMLHttpRequest(); // Se obtiene el nuevo objeto
    } 
    else 
      if(window.ActiveXObject) { // IE(Windows): objectoActiveX
    		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    	}
      	
      	return xmlhttp;
}

/*function arranque_personalizado()
{
	console.log("ejecutando arranque personalizado para entradas, vamos a recuperar el id de la entrada");
	
	console.log("id encontrado "+id_entrada);

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
    			id_entrada = argumentos[0].split('id=')[1];
    			console.log("id encontrado "+id_entrada);
    			entrada_valida=true;
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
    mostrar_entrada();
    puede_comentar();
}*/

function arranque_personalizado()
{
	console.log("arrancando");
	console.log("id encontrado "+ id_entrada);
	
	mostrar_entrada();
	puede_comentar();

	//mostrar_comentarios();
    //puede_comentar();
}

//funcion que realiza la tarea de mostrar la entrada
function mostrar_entrada()
{
	console.log("mostrar_entrada");

	if(id_entrada)
	{
		console.log("vamos a mostrar la entrada");
		peticionAJAX_GET();
	}
	else
	{
		console.log("entrada no encontrada");
		location.href="index.html";
	}
}


//peticion para ajax de la entrada
function peticionAJAX_GET()
{
	url = 'http://localhost/practica2/rest/entrada/' + id_entrada;

	console.log("peticionAJAX_GET, url = " + url);

	nodo=document.getElementById("entradas");

 	obj= crearObjAjax();
	if(obj) 
	{ 
	
		console.log("id encontrado GET "+ id_entrada);	// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio; // función callback: procesarCambio para entrada
		//obj.open("GET","/practica2/rest/entrada/?id="+id_entrada, true); // Se crea petición GET a url, asíncrona ("true")
		obj.open("GET",url, true);
		obj.send(); // Se envía la petición
	}
}

//funcion que muestra los cambios de estado en la peticion
function procesarCambio()
{
	console.log("procesarCambio");

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

	nodo_titulo=document.getElementById("titulo");
	nodo_descripcion=document.getElementById("descripcion");
	nodo_usuario=document.getElementById("usu_entrada");
	nodo_fecha=document.getElementById("fecha");
	
	if(entrada != "")
	{
		nodo_titulo.innerHTML=entrada.FILAS[0].nombre; 
		nodo_descripcion.innerHTML=entrada.FILAS[0].descripcion;
		nodo_usuario.innerHTML=entrada.FILAS[0].login;
		nodo_fecha.innerHTML=entrada.FILAS[0].fecha;
		
	}
	//hasta aqui nos queda poner la foto del inicio, los comentarios y las fotos de la entrada
	peticionAJAX_GET_fotos();//sirve para devolver las fotos que hay en esta entrada
}


function peticionAJAX_GET_fotos()
{
		
	url='http://localhost/practica2/rest/foto/?id_entrada=' + id_entrada;

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
		//nodo_pimagen=document.getElementById("pimagen");
		nodo_fotos_realizadas=document.getElementById("fotos_realizadas");
		//nodo_pimagen.src=innerHTML="fotos/"+fotos.FILAS[0].fichero; 
		fotos_realizadas="<article><h2>Fotos de la Entrada</h2><article>";

		//section = frm.parentNode.parentNode;

		for(a=0;a < fotos.FILAS.length;a++) 
		{
			//fotos_realizadas = fotos_realizadas + '<p>'+fotos.FILAS[a].texto+'</p>';
			fotos_realizadas += '<img src="fotos/'+fotos.FILAS[a].fichero+'" alt="imagenes" style="overflow:hidden; width: 300px; height: 200px; border: 3px inset #CCC; opacity:1; transition: opacity 1s; z-index: 1; margin-left: 15px; border-radius: 15px; display: inline-block;" />';
		}

		nodo_fotos_realizadas.innerHTML=fotos_realizadas;
	}
 	
 	//peticionAJAX_GET_comentarios();//se encarga de cargar los comentarios en la pagina, asi como de poner el campo para comentar si estas registrado
 	mostrar_comentarios();
}


/************************** COMENTARIOS *******************/

function mostrar_comentarios()
{
	console.log("mostrar_comentarios");

	if(id_entrada)
	{
		console.log("vamos a mostrar los comentarios");
		peticionAJAX_GET_comentarios();
	}
	else
	{
		console.log("entrada no encontrada");
		location.href="index.html";
	}
}


function peticionAJAX_GET_comentarios()
{
	obj= crearObjAjax();

	url='http://localhost/practica2/rest/comentario/?id_entrada=' + id_entrada;

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

function peticionAJAX_POST_enviar_comentario() 
{

	console.log("peticionAJAX_POST_enviar_comentario");

	url='http://localhost/practica2/rest/comentario/?id_entrada=' + id_entrada;

	obj = crearObjAjax();
	if (obj) 
	{ 	
		// Si se ha creado el objeto, se completa la petición ...
		// Argumentos:
		console.log("se empieza a procesar la peticion");
		
		var clave = JSON.parse(sessionStorage.getItem("nick")).clave;
		var login = JSON.parse(sessionStorage.getItem("nick")).login;
		var titulo = document.getElementById("titulo_en").value;
		var texto = document.getElementById("coment_en").value;
		var id_enviar = id_entrada;
		var args ="clave="+clave+"&login="+login+"&titulo="+titulo+"&texto="+texto+"&id_entrada="+id_enviar;
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange = procesarCambio_enviar; // función callback: procesarCambio
		obj.open("POST",url, true); // Se crea petición POST a url, asíncrona("true")
		// Es necesario especificar la cabecera "Content-type" para peticiones POST
		obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		obj.send(args); // Se envía la petición
		console.log("se termina de procesar la informacion");
	}
}


function procesarCambio_enviar()
{
	console.log("procesarCambio_enviar");

	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos de la entrada -> devolviendo");//devolvemos mensaje por log
			result=JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados
			zoom_activo();
			zoom_activo(1,"Su comentario se ha enviado correctamente.");
			peticionAJAX_GET_comentarios();
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
		nodo_comentarios_realiazados=document.getElementById("comenta");
		comentarios_realizados="<h2>COMENTARIOS</h2>";

		for(a=0;a < comenta.FILAS.length;a++) 
		{
			if(puede_hacer_comentarios)
			{
				//comentarios_realizados=comentarios_realizados+'<p id="comentario'+comenta.FILAS[a].id+'"><span>'+comenta.FILAS[a].login+'</span><b>'+comenta.FILAS[a].titulo+'</b> '+comenta.FILAS[a].texto+'<span class="fecha_comentarios"><time datetime="'+comenta.FILAS[a].fecha+'">'+comenta.FILAS[a].fecha+'</time></span></p><button type="button" onclick="responder(&#39;'+comenta.FILAS[a].titulo+'&#39;);">Responder</button>';
				//comentarios_realizados += '<button type="button" onclick="responder(&#39;'+comenta.FILAS[a].titulo+'&#39;);">Responder</button>';
				comentarios_realizados += '<article class="comentario_R"><p id="comentario'+comenta.FILAS[a].id+'"></p>'+'<h3><b>'+comenta.FILAS[a].titulo+'</b></h3><p>'+comenta.FILAS[a].login+'</p><p>'+comenta.FILAS[a].texto+'</p><time>'+comenta.FILAS[a].fecha+'</time><button class="botonComent" type="button" onclick="responder(&#39;'+comenta.FILAS[a].titulo+'&#39;);">Responder</button></article>';				
			}
			else
			{

				comentarios_realizados += '<article class="comentario_R"><p id="comentario'+comenta.FILAS[a].id+'"></p>'+'<h3><b>'+comenta.FILAS[a].titulo+'</b></h3><p>'+comenta.FILAS[a].login+'</p><p>'+comenta.FILAS[a].texto+'</p><time>'+comenta.FILAS[a].fecha+'</time></article>';				
			}				
		}

		nodo_comentarios_realiazados.innerHTML=comentarios_realizados;
	}

	//llevar_al_comentario();
}

function puede_comentar()
{
	console.log("*********************puede_comentar***************************");

	if(window.sessionStorage)
	{
		//comprobamos si esta logueado o no
		if(sessionStorage.getItem("nick"))
		{
			console.log("-+-+-+-+-+-+-+-+- YES puede comentar -+-+--+-+-+-+-+");
			puede_hacer_comentarios=true;
			document.getElementById('campo_comentario').style.display='block';
		}
		else
		{
			console.log("===================== NO puede comentar =======================");
			puede_hacer_comentarios=false;
			document.getElementById('campo_comentario').style.display='none';
			document.getElementById('mensajeErrorComent').innerHTML="<h3 style='color:red; font-size: 25px; cursor: pointer;'>Para dejar un comentario debes estar <a href='login.html'>logueado</a></h3>";

		}
	}
}


function zoom_activo(modo,texto)
{
	console.log("zoom_activo");


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
	console.log("enviar_comentario");

	zoom_activo(2,"Enviando comentario, tenga paciencia por favor.");
	peticionAJAX_POST_enviar_comentario();
	return false;
}

function llevar_al_comentario()
{
	console.log("llevar_al_comentario");
	if(comentario_ancla != null)
	location.href = comentario_ancla;
}

function responder(titul)
{
	console.log("responder ------------" + titul);
	document.getElementById("titulo_en").value="RE:"+titul;
	document.getElementById("coment_en").focus();
}