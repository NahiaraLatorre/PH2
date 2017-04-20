function crearObjAjax(){
     var xmlhttp;
     if(window.XMLHttpRequest) { // Objeto nativo
         xmlhttp = new XMLHttpRequest(); // Se obtiene el nuevo objeto
     }else if (window.ActiveXObject) { // IE(Windows): objecto ActiveX
         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
     }
     return xmlhttp;
}
function busquedaviaje(){
    console.log("Pasa por busquedaViajeE");
    
    // VER CAMPOS DEL FORMULARIO
    
    var titulo, descripcion, autor, fecha1, fecha2;
    var viaje = "rest/viaje/?";
    var primer = true;
    
    if(document.getElementById("titulo").value.match(/\S/)){
        titulo = document.getElementById("titulo").value;
        viaje = viaje+"n="+titulo;
        primer = false;
    }
    
    if(document.getElementById("descripcion").value.match(/\S/)){
        descripcion = document.getElementById("descripcion").value;     
        if(primer==false){ 
            viaje = viaje+"&";
        }       
        viaje = viaje+"d="+descripcion;
        primer = false;
    }
    
    if(document.getElementById("autor").value.match(/\S/)){
        autor = document.getElementById("autor").value;     
        if(primer==false) viaje = viaje+"&";        
        viaje = viaje+"l="+autor;
        primer = false;
    }

    if(document.getElementById("fecha1").value.match(/\S/) && document.getElementById("fecha2").value.match(/\S/)){
        fecha1 = document.getElementById("fecha1").value;       
        if(primer==false) viaje = viaje+"&";        
        viaje = viaje+"fi="+fecha1;
        primer = false;
        
        fecha2 = document.getElementById("fecha2").value;               
        viaje = viaje+"&ff="+fecha2;
    }

    console.log("Viaje: "+viaje);
    
    
    
    var obj; // variable que guarda el objeto XMLHttpRequest    
    obj = crearObjAjax();
     if(obj){
         url=viaje;
         // Se establece la función (callback) a la que llamar cuando cambie el estado:      
         obj.onreadystatechange=function(){
              if (obj.readyState==4 && obj.status==200){
                   var respuesta = window.JSON.parse(obj.responseText);
                   console.log(respuesta);
                 
                   div = new Array();
                   a = new Array();
                   a2 = new Array();
                   h3 = new Array();
                   img = new Array();
                   p = new Array();
                   p2 = new Array();
                   div2 = new Array();
                   ul = new Array();
                   li = new Array();
                   li2 = new Array();
                   li3 = new Array();
                   padre = document.getElementById("Resultados");
                   
                   
                   // BORRAR CAJAS ANTERIORES SI YA ESTABAN CREADAS                
                    divs = document.getElementsByClassName('caja');
                    if(divs.length==0){

                    }else{                                                      
                        for(i=0;i<divs.length;i++){
                            divs[i].parentNode.removeChild(divs[i]);
                        }           
                    }   
                   
                   // INTRODUCIR CAJAS NUEVAS       
                   for(i=0; i<respuesta.FILAS.length; i++){
                        div.push(document.createElement("div"));
                        a.push(document.createElement("a"));
                        a2.push(document.createElement("a"));
                        h3.push(document.createElement("h3"));
                        p.push(document.createElement("p"));
                        p2.push(document.createElement("p"));
                        img.push(document.createElement("img"));
                        div2.push(document.createElement("div"));
                        ul.push(document.createElement("ul"));
                        li.push(document.createElement("li"));
                        li2.push(document.createElement("li"));
                        li3.push(document.createElement("li"));
                    

                        div[i].setAttribute("class","caja");
                        a[i].setAttribute("href", "viaje.html?id="+respuesta.FILAS[i].ID);
                        a[i].setAttribute("name", "url");
                        h3[i].setAttribute("name", "titulo");
                        img[i].setAttribute("name", "imagen");
                        img[i].setAttribute("class", "imagen");
                        img[i].setAttribute("src", "fotos/"+respuesta.FILAS[i].ID+"/"+respuesta.FILAS[i].FOTO);
                        p[i].setAttribute("class", "desc");
                        p[i].setAttribute("name", "descripcion");
                        p2[i].setAttribute("class", "desc2");
                        a2[i].setAttribute("href", "viaje.html?id="+respuesta.FILAS[i].ID);
                        a2[i].setAttribute("name", "url2");
                        div2[i].setAttribute("class", "spam");
                        li[i].setAttribute("class", "estre");
                        li2[i].setAttribute("name", "nombre");
                        li2[i].setAttribute("name", "fecha");

                        fecha1=respuesta.FILAS[i].FECHA_INICIO.split(" ")[0].split("-");
                        fecha1=fecha1[2]+"/"+fecha1[1]+"/"+fecha1[0];
                        fecha2=respuesta.FILAS[i].FECHA_FIN.split(" ")[0].split("-");
                        fecha2=fecha2[2]+"/"+fecha2[1]+"/"+fecha2[0];

                        h3[i].textContent = respuesta.FILAS[i].NOMBRE;
                        p[i].textContent = respuesta.FILAS[i].DESCRIPCION.slice(0,45)+"...";
                        a2[i].textContent = "Ver más";
                        if(respuesta.FILAS[i].VALORACION==1)
                            li[i].textContent = "  ★";
                        else if(respuesta.FILAS[i].VALORACION==2)
                            li[i].textContent = "  ★★";
                            else if(respuesta.FILAS[i].VALORACION==3)
                                li[i].textContent = "  ★★★";
                                else if(respuesta.FILAS[i].VALORACION==4)
                                    li[i].textContent = "  ★★★★";
                                    else if(respuesta.FILAS[i].VALORACION==5)
                                        li[i].textContent = "  ★★★★★";
                        li2[i].textContent = respuesta.FILAS[i].LOGIN;
                        li3[i].textContent = fecha1+" - "+fecha2;

                        fecha1="";
                        fecha2="";

                        padre.appendChild(div[i]);
                        div[i].appendChild(a[i]);
                            a[i].appendChild(h3[i]);
                        div[i].appendChild(img[i]);
                        div[i].appendChild(p[i]);
                        div[i].appendChild(p2[i]);
                            p2[i].appendChild(a2[i]);
                        div[i].appendChild(div2[i]);
                            div2[i].appendChild(ul[i]);
                                ul[i].appendChild(li[i]);
                                ul[i].appendChild(li2[i]);
                                ul[i].appendChild(li3[i]);
                        
                     }
                }
          }
         
         obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
         obj.send(); // Se envía la petición         
       }
}

function busquedaGlobal(){
    console.log("Pasa por busquedaGlobal");
    
    // VER CAMPOS DEL FORMULARIO
    
    var titulo;
    var viaje = "rest/viaje/?";
    var primer = true;
    
    if(document.getElementById("global").value.match(/\S/)){
        titulo = document.getElementById("global").value;
        viaje = viaje+"bt="+titulo;
        primer = false;
    }

    //viaje = viaje+"&pag=1&lpag=1"
    console.log("Viaje: "+viaje);
    
    
    
    var obj; // variable que guarda el objeto XMLHttpRequest    
    obj = crearObjAjax();
     if(obj){
         url=viaje;
         // Se establece la función (callback) a la que llamar cuando cambie el estado:      
         obj.onreadystatechange=function(){
              if (obj.readyState==4 && obj.status==200){
                   var respuesta = window.JSON.parse(obj.responseText);
                   console.log(respuesta.FILAS[0].NOMBRE +"+"+ titulo);
                 
                   div = new Array();
                   a = new Array();
                   a2 = new Array();
                   h3 = new Array();
                   img = new Array();
                   p = new Array();
                   p2 = new Array();
                   div2 = new Array();
                   ul = new Array();
                   li = new Array();
                   li2 = new Array();
                   li3 = new Array();
                   padre = document.getElementById("BGlobal");
                   
                   
                   // BORRAR CAJAS ANTERIORES SI YA ESTABAN CREADAS                
                    divs = document.getElementsByClassName('caja');
                    if(divs.length==0){

                    }else{                                                      
                        for(i=0;i<divs.length;i++){
                            divs[i].parentNode.removeChild(divs[i]);
                        }           
                    }   
                   
                   // INTRODUCIR CAJAS NUEVAS       
                   for(i=0; i<respuesta.FILAS.length; i++){
                        div.push(document.createElement("div"));
                        a.push(document.createElement("a"));
                        a2.push(document.createElement("a"));
                        h3.push(document.createElement("h3"));
                        p.push(document.createElement("p"));
                        p2.push(document.createElement("p"));
                        img.push(document.createElement("img"));
                        div2.push(document.createElement("div"));
                        ul.push(document.createElement("ul"));
                        li.push(document.createElement("li"));
                        li2.push(document.createElement("li"));
                        li3.push(document.createElement("li"));
                    

                        div[i].setAttribute("class","caja");
                        a[i].setAttribute("href", "viaje.html?id="+respuesta.FILAS[i].ID);
                        a[i].setAttribute("name", "url");
                        h3[i].setAttribute("name", "titulo");
                        img[i].setAttribute("name", "imagen");
                        img[i].setAttribute("class", "imagen");
                        img[i].setAttribute("src", "fotos/"+respuesta.FILAS[i].ID+"/"+respuesta.FILAS[i].FOTO);
                        p[i].setAttribute("class", "desc");
                        p[i].setAttribute("name", "descripcion");
                        p2[i].setAttribute("class", "desc2");
                        a2[i].setAttribute("href", "viaje.html?id="+respuesta.FILAS[i].ID);
                        a2[i].setAttribute("name", "url2");
                        div2[i].setAttribute("class", "spam");
                        li[i].setAttribute("class", "estre");
                        li2[i].setAttribute("name", "nombre");
                        li2[i].setAttribute("name", "fecha");

                        fecha1=respuesta.FILAS[i].FECHA_INICIO.split(" ")[0].split("-");
                        fecha1=fecha1[2]+"/"+fecha1[1]+"/"+fecha1[0];
                        fecha2=respuesta.FILAS[i].FECHA_FIN.split(" ")[0].split("-");
                        fecha2=fecha2[2]+"/"+fecha2[1]+"/"+fecha2[0];

                        h3[i].textContent = respuesta.FILAS[i].NOMBRE;
                        p[i].textContent = respuesta.FILAS[i].DESCRIPCION.slice(0,45)+"...";
                        a2[i].textContent = "Ver más";
                        if(respuesta.FILAS[i].VALORACION==1)
                            li[i].textContent = "  ★";
                        else if(respuesta.FILAS[i].VALORACION==2)
                            li[i].textContent = "  ★★";
                            else if(respuesta.FILAS[i].VALORACION==3)
                                li[i].textContent = "  ★★★";
                                else if(respuesta.FILAS[i].VALORACION==4)
                                    li[i].textContent = "  ★★★★";
                                    else if(respuesta.FILAS[i].VALORACION==5)
                                        li[i].textContent = "  ★★★★★";
                        li2[i].textContent = respuesta.FILAS[i].LOGIN;
                        li3[i].textContent = fecha1+" - "+fecha2;

                        fecha1="";
                        fecha2="";

                        padre.appendChild(div[i]);
                        div[i].appendChild(a[i]);
                            a[i].appendChild(h3[i]);
                        div[i].appendChild(img[i]);
                        div[i].appendChild(p[i]);
                        div[i].appendChild(p2[i]);
                            p2[i].appendChild(a2[i])
                        div[i].appendChild(div2[i]);
                            div2[i].appendChild(ul[i]);
                                ul[i].appendChild(li[i]);
                                ul[i].appendChild(li2[i]);
                                ul[i].appendChild(li3[i]);
                        
                     }
                }
          }
         
         obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
         obj.send(); // Se envía la petición         
       }
}