//mostrar datos en section [funcional]
function foormatear_entradas(a)
{
	console.log("hhoooasdkfjaoeu");
	nodo=document.getElementById("entradas");//nodo section de index
	//vamos a contar cuantos viajes hay
	for (var i = a.FILAS.length - 1; i >= 0; i--) 
	{
		//asignamos las datos a variables mas simples
		titulo = a.FILAS[i].nombre;	
		descripcion = a.FILAS[i].descripcion;
		idp= a.FILAS[i].id;
		usu= a.FILAS[i].login;
		
		foto = a.FILAS[i].fichero;
		des = a.FILAS[i].texto;
		feinicio = a.FILAS[i].fecha;
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
	}
}
