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

var obj; // variable que guarda el objeto XMLHttpRequest

function peticionAJAX_LOGIN(url){
    console.log("ENTRANDO");
obj= crearObjAjax();
    if(obj) { // Si se ha creado el objeto, se completa la petición ...
        // Argumentos:
        var login= document.getElementById("nick").value;
        var password= document.getElementById("contrasenya").value;
        var args= "login=" + login+ "&pwd=" + password;
        args+= "&v=" + (new Date()).getTime(); // Truco: evita utilizar la cache
        // Se establece la función (callback) a la que llamar cuando cambie el estado:
        obj.onreadystatechange= procesarLogin; // función callback: procesarCambio
        obj.open("POST", url, true); // Se crea petición POST a url, asíncrona ("true")
        // Es necesario especificar la cabecera "Content-type" para peticiones POST
        obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        obj.send(args); // Se envía la petición
        console.log(args);
  }
}

function procesarLogin(){
   if(obj.readyState== 4){ // valor 4: respuesta recibida y lista para ser procesada
    console.log(obj.status);
     if(obj.status== 200){ // El valor 200 significa "OK"
     // Aquí se procesa lo que se haya devuelto:
     //document.getElementById("miDiv").innerHTML= obj.responseText;
     var usu=document.getElementById("nick").value;
     var contra=document.getElementById("contrasenya").value;

     sessionStorage.setItem("nombreUsuario",usu);
     sessionStorage.setItem("contrasenya",contra);

     var usuario=JSON.parse(obj.responseText);
     sessionStorage.setItem("email",usuario.EMAIL);
     sessionStorage.setItem("nombre",usuario.NOMBRE);
     sessionStorage.setItem("foto",usuario.FOTO);
     sessionStorage.setItem("clave",usuario.CLAVE);
     sessionStorage.setItem("fecha",usuario.ULTIMO_ACCESO);

     document.getElementById("mensaje").innerHTML="Bienvenido "+usu+"<br>"+" Tu ultima conexión fue el: "+ sessionStorage.getItem("fecha")+"<div id='cerrar' onclick='cerrarMensajeConIndex()'>Cerrar</div>";
     document.getElementById("mensaje").style.zIndex="5";
     document.getElementById("mensaje").style.transition="opacity 1s linear";
     document.getElementById("mensaje").style.opacity="1";

      document.getElementById("muro").style.opacity="0.3";
      document.getElementById("muro").style.zIndex="4";

    
   } 
   else {
     document.getElementById("mensaje").innerHTML="Login o contraseña incorrectos <div id='cerrar' onclick='cerrarMensajeConFocus()'>Cerrar</div>";
     document.getElementById("mensaje").style.zIndex="5";
     document.getElementById("mensaje").style.transition="opacity 1s linear";
     document.getElementById("mensaje").style.opacity="1";

      document.getElementById("muro").style.opacity="0.3";
      document.getElementById("muro").style.zIndex="4";
   }
  }
}

function cerrarMensajeConIndex(){
     document.getElementById("mensaje").style.zIndex="-1";
     document.getElementById("muro").style.zIndex="-2";
     document.getElementById("mensaje").style.opacity="0";
     document.getElementById("muro").style.opacity="0";
     window.location.assign('index.html');
}
function cerrarMensajeConFocus(){
     document.getElementById("mensaje").style.zIndex="-1";
     document.getElementById("muro").style.zIndex="-2";
     document.getElementById("mensaje").style.opacity="0";
     document.getElementById("muro").style.opacity="0";
     document.getElementById("nombreUsuarioL").focus();
}
function cerrarMensajeConLogin(){
     document.getElementById("mensaje").style.zIndex="-1";
     document.getElementById("muro").style.zIndex="-2";
     document.getElementById("mensaje").style.opacity="0";
     document.getElementById("muro").style.opacity="0";
     window.location.assign('login.html');
}

/*--------------  MODIFICAR  ---------------*/

function inicio(){
    
    if(window.sessionStorage){
        if(sessionStorage.getItem("nombreUsuario")){
            document.getElementById("menu").innerHTML='<ul><li><label for="ckb-menu">&equiv;</label></li><li><a href="index.html" id="Inicio"><i class="icon-home"></i> Inicio</a></li><li><a href="buscar.html" id="Busqueda"><i class="icon-search"></i> Búsqueda</a></li><li><a href="Nueva-entrada.html" id="Nueva_entrada"><i class="icon-picture"></i> Nueva entrada</a></li><li><a href="registro.html" onclick="registroInicio()" id="Registro"><i class="icon-user-plus"></i> Registrarse</a></li><li><a href="index.html" id="Logout"><i class="icon-logout"></i> Logout</a></li></ul>';
        }
        else{
            document.getElementById("menu").innerHTML='<ul><li class="navegacion"><a href="index.html">Indice</a><span class="icon-home"></span></li><li class="navegacion"><a href="login.html">Login</a><span class="icon-login"></span></li><li class="navegacion"><a href="registro.html" onclick="registroInicio()">Registro</a><span class="icon-book-open"></span></li><li class="navegacion"><a href="buscar.html">Buscar viajes</a><span class="icon-search"></span></li><li class="navegacion"><a onclick="entrar_viaje()">Crear viaje</a><span class="icon-pencil"></span></li></ul>';
        }
    }
}

function logout(){

    if(window.sessionStorage){
        
        sessionStorage.clear();
            document.getElementById("menu").innerHTML='<ul><li class="navegacion"><a href="index.html">Indice</a><span class="icon-home"></span></li><li class="navegacion"><a href="login.html">Login</a><span class="icon-login"></span></li><li class="navegacion"><a href="registro.html" onclick="registroInicio()">Registro</a><span class="icon-book-open"></span></li><li class="navegacion"><a href="buscar.html">Buscar </a><span class="icon-search"></span></li><li class="navegacion"><a onclick="entrar_viaje()">Nueva entrada</a><span class="icon-pencil"></span></li></ul>';
    window.location.assign('index.html');
    }
}



function peticionComprobarLogin(value){
    
  obj = crearObjAjax();
  if(obj){ // Si se ha creado el objeto, se completa la petición ...
    obj.onreadystatechange = procesarComprobarLogin; // función callback: procesarCambio
    obj.open("GET", "rest/login/"+value, true); // Se crea petición GET a url, asíncrona ("true")
    obj.send(); // Se envía la petición
  }

}
function procesarComprobarLogin(){
    if(obj.readyState == 4){ 
        if(obj.status == 200){ 
           var log=JSON.parse(obj.responseText);
           var disponible=log.DISPONIBLE;
         
          if(disponible=="false"){
           document.getElementById("no2").innerHTML="<p id='no2' class='no'>Ese login no esta disponible</p>";
          }
          else{
            document.getElementById("no2").innerHTML="";
          }
        }
    }
}


function peticionAJAX_PostRegistro() {
       
    url="rest/post/usuario.php";
    usuarioR = crearObjAjax();
    var pwd=document.getElementById("password").value;
    var pw2=document.getElementById("password2").value;

     if(pwd==pw2){//si las contrasenyas son iguales entro
      if (usuarioR) {
       
          var usu=document.getElementById("nombreUsuario").value;
          
          var nombre=document.getElementById("usuario").value;
          var email=document.getElementById("email").value;

          if(window.sessionStorage){
            var clave=sessionStorage.getItem("clave");

            var args = "login=" + usu + "&pwd=" + pwd + "&pwd2=" + pw2 +"&clave="+clave;
            if(nombre!=""){

              args+="&nombre="+nombre;
            }
            else{
              args+="&nombre="+sessionStorage.getItem("nombre");
            }
            if(email!=""){
              args+="&email="+email;
            }
            else{
              args+="&email="+sessionStorage.getItem("email");
            }
          }else{
            var args = "login=" + usu + "&pwd=" + pwd + "&pwd2=" + pw2 + "&nombre=" + nombre + "&email=" + email;
          }
          
          args += "&v=" + (new Date()).getTime();
          console.log(args);
          usuarioR.onreadystatechange = procesarRegistro2;
          usuarioR.open("POST", url, true);
          usuarioR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          usuarioR.send(args);
        }
    }else{
      document.getElementById("no").innerHTML="<p id='no' class='no'>Las contraseñas no coinciden</p>";
      document.getElementById("password").focus();
    }
}


function procesarRegistro2(){
   if(usuarioR.readyState== 4){ // valor 4: respuesta recibida y lista para ser procesada
    console.log(usuarioR.status);
     if(usuarioR.status== 200){ // El valor 200 significa "OK"
     // Aquí se procesa lo que se haya devuelto:
   if(window.sessionStorage.getItem("nombreUsuario")){
    document.getElementById("mensaje").innerHTML="Has modificado tu perfil correctamente<div id='cerrar' onclick='cerrarMensajeConLogin()'>Cerrar</div>";
  }
  else{
     document.getElementById("mensaje").innerHTML="Te has registrado correctamente <div id='cerrar' onclick='cerrarMensajeConLogin()'>Cerrar</div>";

  }
     document.getElementById("mensaje").style.zIndex="5";
     document.getElementById("mensaje").style.transition="opacity 1s linear";
     document.getElementById("mensaje").style.opacity="1";

    document.getElementById("muro").style.opacity="0.3";
    document.getElementById("muro").style.zIndex="4";
   
   } else 
   window.alert("Acceso no Autorizado");

  }
}

function entrar_viaje(){
    
    if(sessionStorage.getItem("nombreUsuario")){
        window.location.assign("Nueva-entrada.html");
    }
    else{
        window.alert("Debes de estar logueado para acceder a este contenido");
        window.location.assign("index.html");
    }
}

/***********************************************************************************************/
/************* MOSTRAR FOTO *************/
function mostrar_foto(){
    
    var fr= new FileReader();
    foto=document.getElementById('foto').files[0];
 
    fr.onload=function(){
    document.getElementById('otrafoto').src=fr.result;
    }
    fr.readAsDataURL(foto);
  document.getElementById("fotoPerfil2").innerHTML="";
}


/*************** COMPROBAR TAMANYO DE LA IMAGEN ****************/
function comprobarTamanyo(){
  var input = document.getElementById("foto");
  var file = input.files[0];

    if(file.size<500000){
      mostrar_foto()
    }else{
        alert("El tamaño de la foto debe de ser menor que 500KB");
    }
}

/* Funcion para campos de nueva entrada */
function nuevaEntrada(formularioEntradaNueva){

    var titulo = formularioEntradaNueva.tituloentrada.value;
    var descripcion = formularioEntradaNueva.descripcion.value;
        
    if (titulo == ""){// No puede estar vacio

        alert ("Debes escribir un titulo para tu entrada");
        return;
    }
    // Longitud del titulo maximo 200 caracteres
    if (!longitud (1, 200, titulo)){

        alert ("La contrase\u00F1a no puede ser mayor de 200 caracteres");
        return;
    }
    if (descripcion == ""){// No puede estar vacio

        alert ("Debes escribir una descripcion");
        return;
    }
}
/* Menú hamburguesa */

$(function(){
    var pull = $('$pull');
        menu = $('nav ul');
        menuHeight = menu.height();
    $(pull).on('click', function(e)){
        e.preventDefault();
        menu.slideToggle();
    });
    $(window).resize(function(){
        var w = $(window).width();
        if(w > 320 && menu.is(':hidden')){
            menu.removeAttr('style');
        }
    });
});


