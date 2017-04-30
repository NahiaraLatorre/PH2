
var pagina=1;//guardamos en que pagina estamos
var campos="";//guardamos los campos recogidos
var resultado="";//almacenamos el resultado de la busqueda
var posicion="pag=0&lpag=3";//por defecto la pagina sera esta


function buscar()
{
	titulo=document.getElementById("titulo").value;
	autor=document.getElementById("autor").value;
	desde=document.getElementById("fecha_desde").value;
	hasta=document.getElementById("fecha_hasta").value;
	descrip=document.getElementById("descripcion").value;

		console.log("hoooollaaa, le he dado a buscar");
		console.log("titulo = " + titulo);
		console.log("autor = " + autor);
		console.log("fecha desde = " + desde);
		console.log("fecha hasta = " + hasta);
		console.log("descripcion = " + descrip);

		campos="?";
		if(titulo != "")
		{
			campos+="n="+titulo;
			console.log("titulo = " + campos);
		}

		if(autor != "")
		{
			if(campos == "?")
			{
				campos+="l=" + autor;
				console.log("autor = " + campos);
			}
			else
			{
				campos+="&l=" + autor;	
				console.log("autor &l = " + campos);
			}
		}

		if(descrip != "")
		{
			if(campos == "?")
			{
				campos+="d=" + descrip;
				console.log("descrip = " + campos);
			}
			else
			{
				campos+="&d=" + descrip;	
				console.log("descrip &d = " + campos);
			}
		}

		
		if(desde != "")
		{
			fe_array=desde.split("/");
			if(campos == "?")
			{
				campos="fi="+fe_array[2]+"-"+fe_array[1]+"-"+fe_array[0];
				console.log("fecha desde = " + campos);
			}
			else
			{
				campos+="&fi="+fe_array[2]+"-"+fe_array[1]+"-"+fe_array[0];	
				console.log("fecha desde &fi = " + campos);
			}
		}

		if(hasta != "")
		{
			fe_array=hasta.split("/");
			if(campos == "?")
			{
				campos="ff="+fe_array[2]+"-"+fe_array[1]+"-"+fe_array[0];
				console.log("fecha hasta ff = " + campos);
			}
			else
			{
				campos+="&ff="+fe_array[2]+"-"+fe_array[1]+"-"+fe_array[0];	
				console.log("fecha hasta &ff = " + campos);
			}	
		}

		pagina=1;
		posicion="pag=0&lpag=3";
		peticionAJAX_GET();

	return false;
}

 
//peticion para ajax de la busqueda
function peticionAJAX_GET() //peticion para ajax de comentario
{
	url = 'http://localhost/practica2/rest/entrada/';
	obj= new XMLHttpRequest();

	console.log("peticionAJAX_GET -- -- " + url);
	console.log("campos en GET" + campos);
	console.log("posicion en GET" + posicion);


	if(obj) 
	{ 
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio; // función callback: procesarCambio para entradas

		if(campos != "?")
		{
			obj.open("GET",url+campos+"&"+posicion, true); // Se crea petición GET a url, asincrona ("true")
			//obj.open("GET",url+campos, true); // Se crea petición GET a url, asincrona ("true")
			console.log(url+campos);
		}
		else
		{
			obj.open("GET",url+posicion, true);	
		}
		obj.send(); // Se envia la petición
		
	}
}

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
				formatear_entradas(resultado);
			}
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de la busqueda");//devolvemos mensaje por log
		}
	}
}

function formatear_entradas(a)
{
	console.log("estoy en la funcion de formatear entradas");

	//vamos a contar cuantos viajes hay
	contador=0;//nos servira para saber si se ha dado algun resultado
	console.log("cuantas entradas = "+a.FILAS.length);

	nodo=document.getElementById("resultadoBusq");//nodo section de buscar

	for (i=0; i<a.FILAS.length; i++) 
	{

		foto = 'http://localhost/practica2/fotos/' + a.FILAS[i].fichero;
		//asignamos las datos a variables mas simples
		titulo = a.FILAS[i].nombre;	
		descripcion = a.FILAS[i].descripcion;
		id= a.FILAS[i].id;
		usu= a.FILAS[i].login;
		fecha = a.FILAS[i].fecha;
		numFotos=a.FILAS[i].nfotos;
		numComent=a.FILAS[i].ncomentarios;

		articulo=document.createElement("article");

		resultadoBusq = '<h3>' + titulo + '</h3><div class="imagen"><div class="foto"><img src="'+ foto +'" alt="imagenEntrada"/></div><h4><a href="entrada.html?id=' + id + '"">Ver más....</a></h4></div>';
		resultadoBusq += '<div class="datos"><p>' + usu + '</p><time>' + fecha + '</time><p>' + numFotos + ' fotos</p><p>' + numComent + ' comentarios</p></div>' ;


		console.log("Resultado = " + resultadoBusq);

		articulo.innerHTML=resultadoBusq;
		nodo.appendChild(articulo);
		console.log("monstrando resultados de busqueda");
		//contador++;
	}

}

