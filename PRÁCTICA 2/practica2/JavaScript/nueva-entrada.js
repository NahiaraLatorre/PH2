function crearObjAjax(){
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
var numerica=0;
function peticionAJAX_PostNuevaEntrada(){
       
  url = "rest/post/entrada.php";
  obj3 = crearObjAjax();

  //SI HAY FOTOS NO CORRECTAS NO SE ENVIA NADA

  if(obj3){
    var fd = new FormData();//formdata agrupa los datos segun clave/valor y los interpreta en el php como las variables de siempre [clave]
    var titulo = document.getElementById("titulo").value;
    var descrip = document.getElementById("descripcion").value;
    //var foto =  document.querySelector('input[type=file]').files[0];
    if(sessionStorage.getItem("login_session")){
        fd.append("clave",JSON.parse(sessionStorage.getItem("login_session")).clave);
        fd.append("login",JSON.parse(sessionStorage.getItem("login_session")).login);   
    }
    fd.append("nombre",titulo);//asi agregamos el valor y el nombre de la variable
    fd.append("descripcion",descrip);
    obj3.onreadystatechange = procesarCambio3;
    obj3.open("POST", url, true);
    //obj3.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); no nos hace falta con formdata
    obj3.send(fd);//enviamos el formdata


    document.getElementById("mensaje").innerHTML="Entrada nueva insertada correctamente!! <div id='cerrar' onclick='cerrarMensajeConIndex()'>Cerrar</div>";
    document.getElementById("mensaje").style.zIndex="5";
    document.getElementById("mensaje").style.transition="opacity 1s linear";
    document.getElementById("mensaje").style.opacity="1";

    document.getElementById("muro").style.opacity="0.3";
    document.getElementById("muro").style.zIndex="4";
  }
}

function mas_fotos(){
    numerica = numerica+1;
    /*
        cuando añado foto debo añadir una ficha en la zona de fotos
        añado ficha con una id diferente (var numerica)
        esa var es una var global del archivo javascript
        lo 1r q hago es sumarle uno a esa id (var) y desppués añado en la zona de fotos la ficha
        tengo una zona de fotos con fichas de ids diferentes por unicamente un numero 
    */
    document.getElementById("zonaFicha").innerHTML +='<div class="crea_imagen" id="fotosViaje_'+numerica+'">'+
    '<input type="button" id="boton_borrar_'+numerica+'" onclick="return borrar_foto(\'fotosViaje_'+numerica+'\');" name = "Enviar datos" class="button" value="X">'+
    '<div class="image-upload"><label for="file-input">'+
    '<img src="img/logo.png" id="fotoN"/></label><input id="file-input" type="file"/></div>'+
    '<textarea required class="caja" placeholder="Escribir comentario..."></textarea></div>';
}
function borrar_foto(borrar){

  var borrar_ficha = document.getElementById(borrar);

  if (!borrar_ficha){
    alert("El elemento selecionado no existe");
  } else {
    var padre = borrar_ficha.parentNode;
    padre.removeChild(borrar_ficha);
  }
  return false;
  /*
    eliminar foto por id, 
    1- pasar a la function la id
    2- coger el dom de esa id
    3- borrar el dom*/
}
/*
function mostrar_foto(){
  
  var fr= new FileReader();
  var foto=document.getElementById('file-input').files[0];
 
  fr.onload=function(){
    document.getElementById('fotoN').src=fr.result;
  }
  /*fr.readAsDataURL(foto);
  document.getElementById("fotoPerfil2").innerHTML="";
}*/
/************************************/
function mostrar_foto(evt) {//cambia imagen actual por una nueva
      var files = evt.target.files; // FileList object
       

      var input = document.getElementById("file-input");
      var file = input.files[0];//fichero en posicion 0
      console.log("entraaa"+file.size);
      if(file.size<500000){
           //Obtenemos la imagen del campo "file". 
        for (var i = 0, f; f = files[i]; i++) {         
             //Solo admitimos imágenes.
             if (!f.type.match('image.*')) {
                  continue;
             }
         
             var reader = new FileReader();
             
             reader.onload = (function(theFile) {
                 return function(e) {
                 // Creamos la imagen.
                        document.getElementById("fotoN").src = e.target.result;
                 };
             })(f);
   
             reader.readAsDataURL(f);
         }
      }else{
       alert("El tamaño de la foto debe de ser menor que 500KB");
      }    
}
document.getElementById('file-input').addEventListener('change',mostrar_foto, false);
/************************************/



function cerrarMensajeConIndex(){
     document.getElementById("mensaje").style.zIndex="-1";
     document.getElementById("muro").style.zIndex="-2";
     document.getElementById("mensaje").style.opacity="0";
     document.getElementById("muro").style.opacity="0";
     window.location.assign('index.html');
}