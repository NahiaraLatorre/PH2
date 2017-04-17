var es_des=0;//numero de estrellas desde
var es_has=0;//numero de estrellas hasta
var pagina=1;//guardamos en que pagina estamos
var campos="";//guardamos los campos recogidos
var resultado="";//almacenamos el resultado de la busqueda
var tipo_busqueda=1;//tipo de busqueda por defecto es global
var posicion="pag=0&lpag=3";//por defecto la pagina sera esta

function run_p()
{
	console.log("ejecutando arranque personalizado para buscador, vamos a revisar si estamos en la pagina correcta");
	var loc = document.location.href;
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
}

function buscar()
{
	titulo=document.getElementById("titulo").value;
	autor=document.getElementById("autor").value;
	desde=document.getElementById("fecha_desde").value;
	hasta=document.getElementById("fecha_hasta").value;
	descrip=document.getElementById("descripcion").value;
	if(tipo_busqueda == 1)//busqueda inteligente
	{
		campos="?";
		if(titulo != "")
		{
			campos=campos+"n="+titulo;
		}

		if(autor != "")
		{
			if(campos == "?")
			{
				campos=campos+"l="+autor;
			}
			else
			{
				campos=campos+"&l="+autor;	
			}
		}

		if(descrip != "")
		{
			if(campos == "?")
			{
				campos=campos+"d="+descrip;
			}
			else
			{
				campos=campos+"&d="+descrip;	
			}
		}

		if(es_valida_la_fecha(desde) && desde != "")
		{
			fe_array=desde.split("/");
			if(campos == "?")
			{
				campos=campos+"fi="+fe_array[2]+"-"+fe_array[1]+"-"+fe_array[0];
			}
			else
			{
				campos=campos+"&fi="+fe_array[2]+"-"+fe_array[1]+"-"+fe_array[0];	
			}
		}

		if(es_valida_la_fecha(hasta) && hasta != "")
		{
			fe_array=hasta.split("/");
			if(campos == "?")
			{
				campos=campos+"ff="+fe_array[2]+"-"+fe_array[1]+"-"+fe_array[0];
			}
			else
			{
				campos=campos+"&ff="+fe_array[2]+"-"+fe_array[1]+"-"+fe_array[0];	
			}	
		}

		if(es_des != 0)
		{
			if(campos == "?")
			{
				campos=campos+"vi="+es_des;
			}
			else
			{
				campos=campos+"&&vi="+es_des;	
			}
		}

		if(es_has != 0)
		{
			if(campos == "?")
			{
				campos=campos+"vf="+es_has;
			}
			else
			{
				campos=campos+"&&vf="+es_has;	
			}
		}

		pagina=1;
		posicion="pag=0&lpag=3";
		peticionAJAX_GET();
	}
	else
	{
		campos="?n="+titulo+"&d="+descrip+"";
		if(es_valida_la_fecha(desde))
		{
			fe_array=desde.split("/");
			campos=campos+"&fi="+fe_array[2]+"-"+fe_array[1]+"-"+fe_array[0];
		}
		if(es_valida_la_fecha(hasta))
		{
			fe_array=hasta.split("/");
			campos=campos+"&ff="+fe_array[2]+"-"+fe_array[1]+"-"+fe_array[0];	
		}
	}
	return false;
}

function desde(numero)
{
		valor4="";
		nodo2=document.getElementById("es_1");
		while(nodo2.hasChildNodes())//con esto eliminamos todas las estrellas
		{
			nodo2.removeChild(nodo2.firstChild);	
		}
		for(h=1;h <= 5;h++)
		{
			if(h <= numero)
			{
				valor4=valor4+"<span class='icon-star' style='color:red;' onclick='desde("+h+");'></span>";	
			}
			else
			{
				valor4=valor4+"<span class='icon-star' onclick='desde("+h+");'></span>";
			}
		}
		nodo2.innerHTML=valor4;
		es_des=numero;
}

function hasta(numero)
{
		valor4="";
		nodo2=document.getElementById("es_2");
		while(nodo2.hasChildNodes())//con esto eliminamos todas las estrellas
		{
			nodo2.removeChild(nodo2.firstChild);	
		}
		for(h=1;h <= 5;h++)
		{
			if(h <= numero)
			{
				valor4=valor4+"<span class='icon-star' style='color:red;' onclick='hasta("+h+");'></span>";	
			}
			else
			{
				valor4=valor4+"<span class='icon-star' onclick='hasta("+h+");'></span>";
			}
		}
		nodo2.innerHTML=valor4;
		es_has=numero;
}

//se ocupa de seleccionar el tipo de busqueda entre nombre o nombre y descripcion
function tipo(numero)
{
	if(numero == 1)//este tipo de busqueda solo busca en los nombres
	{
		tipo_busqueda=numero;
	}
	else if(numero == 2)//este tipo de busqueda busca en nombres y descripcion
	{
		tipo_busqueda=numero;
	}
}
//peticion para ajax de la busqueda
function peticionAJAX_GET()
{
	obj= crearObjAjax();
	if(obj) 
	{
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio; // función callback: procesarCambio para viaje
		if(campos != "?")
		{
			obj.open("GET","/practica2/rest/viaje/"+campos+"&"+posicion, true); // Se crea petición GET a url, asincrona ("true")
		}
		else
		{
			obj.open("GET","/practica2/rest/viaje/"+posicion, true);	
		}
		obj.send(); // Se envia la petición
	}
}
//procesamos los cambios de busqueda
function procesarCambio()
{
	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aqui se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos de la busqueda -> devolviendo");//devolvemos mensaje por log
			resultado=JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados
			if(resultado.TOTAL_COINCIDENCIAS == 0)
			{
					nodo=document.getElementById("entradas");//nodo section de index
					while(nodo.hasChildNodes())//con esto eliminamos todos los comentarios que hayan antes
					{
						nodo.removeChild(nodo.firstChild);	
				 	}
				 	if(document.getElementById("paginacion"))
				 	{
				 		paginacion=document.getElementById("paginacion");
						while(paginacion.hasChildNodes())//con esto eliminamos todos los comentarios que hayan antes
						{
							paginacion.removeChild(paginacion.firstChild);	
					 	}
				 	}
				 	nodo.innerHTML="<h4 style='color:red;'>No se han encontrado coincidencias</h4>";
			}
			else
			{
				foormatear_entradas(resultado);
			}
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de la busqueda");//devolvemos mensaje por log
		}
	}
}
//comprobamos que una fecha es valida
function es_valida_la_fecha(fecha_a_comprobar)
{
	return true;
	/*reg=/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/;
	if(fecha_a_comprobar.match(reg).length > 0)
	{
		return true;
	}
	return false;*/
}

//mostrar datos en section [funcional]
function foormatear_entradas(a)
{
	nodo=document.getElementById("entradas");//nodo section de index
	while(nodo.hasChildNodes())//con esto eliminamos todos los comentarios que hayan antes
	{
		nodo.removeChild(nodo.firstChild);	
 	}
	//vamos a contar cuantos viajes hay
	contador=0;//nos servira para saber si se ha dado algun resultado
	for (var i = a.FILAS.length - 1; i >= 0; i--) 
	{
		//asignamos las datos a variables mas simples
		titulo = a.FILAS[i].NOMBRE;	
		descripcion = a.FILAS[i].DESCRIPCION;
		idp= a.FILAS[i].ID;
		usu= a.FILAS[i].LOGIN;
		valoracion = a.FILAS[i].VALORACION;
		foto = a.FILAS[i].FOTO;
		des = a.FILAS[i].DESCRIPCION_FOTO;
		feinicio = a.FILAS[i].FECHA_INICIO;
		//fin de la asignacion
		//la publicamos
		articulo=document.createElement("article");
		valor4="";
		valor4=valor4+"<header><h4>"+titulo+"</h4></header><div class = 'hoveroculto'><img src='fotos/"+idp+"/"+foto+"' alt='"+des+"'/><span><p>"+descripcion+"</p><a href='viaje.html?id="+idp+"'><b>Seguir Leyendo</b>&nbsp;-></a></span></div><br/>";
		valor4=valor4+"<div class='valoracion'>";
		for(h=1;h <= 5;h++)
		{
			if(h <= valoracion)
			{
				valor4=valor4+"<span class='icon-star' style='color:red;'></span>";	
			}
			else
			{
				valor4=valor4+"<span class='icon-star'></span>";
			}
		}
		valor4=valor4+"</div><br/><footer><h6>Autor:"+usu+", Fecha de edicion:<time datetime='2016'>"+feinicio+"</time></h6></footer>";
		articulo.innerHTML=valor4;
		nodo.appendChild(articulo);
		console.log("monstrando entradas");
		contador++;
	}

	//aqui crearemos la paginacion
	if(contador != 0)
	{
		if(!document.getElementById("paginacion"))
		{
			paginacion=document.createElement("div");
			paginacion.id="paginacion";
			paginacion.style="text-align:center;";
		}
		else
		{
			paginacion=document.getElementById("paginacion");
			while(paginacion.hasChildNodes())//con esto eliminamos todos los comentarios que hayan antes
			{
				paginacion.removeChild(paginacion.firstChild);	
		 	}
		}

		for(g=1;g <= (resultado.TOTAL_COINCIDENCIAS/3);g++)
		{
			if(g == pagina)
			{
				paginacion.innerHTML=paginacion.innerHTML+"<span style='text-decoration:none;'>"+g+"</span>&nbsp;";
			}
			else
			{
				paginacion.innerHTML=paginacion.innerHTML+"<span style='text-decoration:underline;' onclick='cambiar_de_pagina("+g+")'>"+g+"</span>&nbsp;";
			}
		}
		document.getElementById("main_entradas").appendChild(paginacion);
	}
}

function cambiar_de_pagina(numero)
{
	posicion="pag="+(numero-1)+"&lpag=3";
	pagina=numero;
	peticionAJAX_GET();
}