function crearObjAjax(){
 var xmlhttp;
  if(window.XMLHttpRequest) { // Objeto nativo
   xmlhttp= new XMLHttpRequest(); // Se obtiene el nuevo objeto
     } 
     else 
      if(window.ActiveXObject) { // IE(Windows): objectoActiveX
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}
      return xmlhttp;
}

function saveTravel(id)
{
	sessionStorage.setItem("idviaje", id);
}

function busquedaviaje()
{
	
	var title, desc, autor, fecha1, fecha2;
	var ruta = "rest/entrada/?";
	var start = true;
	
	if(document.getElementById("titulo").value.match(/\S/))   
	{
		title = document.getElementById("titulo").value;
		viaje = ruta+"n="+title;
		start = false;
	}
	
	if(document.getElementById("descripcion").value.match(/\S/))   
	{
		desc = document.getElementById("descripcion").value;		
		if(!start) ruta = ruta+"&";		
		ruta = ruta+"d="+desc;
		start = false;
	}
	
	if(document.getElementById("autorbusc").value.match(/\S/))   
	{
		autor = document.getElementById("autorbusc").value;		
		if(!start) ruta = ruta+"&";		
		ruta = ruta+"l="+autor;
		start = false;
	}

	if(document.getElementById("fecha1").value.match(/\S/) && document.getElementById("fecha2").value.match(/\S/))   
	{
		fecha1 = document.getElementById("fecha1").value;		
		if(!start) ruta = ruta+"&";		
		ruta = ruta+"fi="+fecha1;
		start = false;
		
		fecha2 = document.getElementById("fecha2").value;				
		ruta = ruta+"&ff="+fecha2;
	}

	// console.log("Viaje: "+ruta);

	//=========================================
	
	
	
	var obj; // variable que guarda el objeto XMLHttpRequest	
    obj = crearObjAjax();
	 if(obj) //si existe el objeto
	   {
		 
		 url=ruta;
		 		 
		 obj.onreadystatechange = function colocar() //funcion de respuest
		  {
			  if (obj.readyState==4)
				{
					if(obj.status==200){
						   var cont1 = obj.responseText;
				  	       var cont2 = cont1.split("FILAS\":");
				  	       var cont3 = cont2[1].slice(0,-1);
						   var cont4 = window.JSON.parse(cont3);
						   
				 
	
							//variables
						   caja = new Array();
						   conten = new Array();
						   pic = new Array();
						   destacar = new Array();
						   muest1 = new Array();
						   muest2 = new Array();
						   figcaption = new Array();
						   divPics = document.getElementById("pics");
						   finale = new Array();
						   
						   
						   // borro lo anterior			   
						    figures = document.querySelectorAll('figure');
							if(figures.length!=0)
							
								{														
									for(i=0;i<figures.length;i++)
									{
										figures[i].parentNode.removeChild(figures[i]);
									}			
								}	
						   
						   // INTRODUCIR CAJAS NUEVAS				   
						   for(i=0; i<cont4.length; i++)
						     {
						     	muest1.push(document.createElement("muest1"));
						     	muest2.push(document.createElement("muest2"));
						     	destacar.push(document.createElement("destacar"));
								caja.push(document.createElement("caja"));
								conten.push(document.createElement("conten"));
								pic.push(document.createElement("img"));
								figcaption.push(document.createElement("figcaption"));
								finale.push(document.createElement("figcaption"));
								
								//formato
								muest1[i].setAttribute("class","holi");
								conten[i].setAttribute("href","entrada.html");
								conten[i].setAttribute("onclick","saveTravel("+cont4[i].id+")");
								pic[i].setAttribute("src","imagenes/"+cont4[i].id+"/"+cont4[i].FOTO);
								pic[i].setAttribute("alt","imagen no disponible");
								pic[i].setAttribute("class","indexfoto3");
								conten[i].textContent = "Mas info...";
								muest1[i].textContent = cont4[i].descripcion.slice(0,45)+"...";
								// muest1[i].setAttribute("class", "comen");	
								figcaption[i].textContent = cont4[i].nombre+" por "+ cont4[i].login +" el "+ cont4[i].fecha+".";
								// conten[i].setAttribute("class", "comen");
								// figcaption[i].setAttribute("class", "comen");
								finale[i].textContent = muest1[i].textContent+" "+figcaption[i].textContent+" "+muest2[i].textContent+" "+conten[i].textContent;
								finale[i].setAttribute("class", "comen");

								divPics.appendChild(caja[i]).appendChild(pic[i]);
								caja[i].appendChild(destacar[i]).appendChild(muest1[i]);
								caja[i].appendChild(destacar[i]).appendChild(figcaption[i]).appendChild(muest2[i])
								muest1[i].appendChild(conten[i]);

								divPics.appendChild(caja[i]).appendChild(pic[i]);
								caja[i].appendChild(destacar[i]).appendChild(muest1[i]);
								caja[i].appendChild(destacar[i]).appendChild(finale[i]);
								muest1[i].appendChild(conten[i]);

								
						
					 }
					}
				}
		  }
		 
		 // //PARA REALIZAR LA PETICION GET CON LA URL FORMADA DEL FORM
		  obj.open("GET", url, true); 
		  obj.send(); 	 
	    }
}

