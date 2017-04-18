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
     var contra=document.getElementById("password").value;

     sessionStorage.setItem("nombreUsuario",usu);
     sessionStorage.setItem("password",contra);

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
        if(sessionStorage.getItem("nick")){   
            document.getElementById("menu").innerHTML='<ul><li class="navegacion"><a href="index.html">Indice</a><span class="icon-home"></span></li><li class="navegacion"><a href="registro.html" onclick="registroInicio()">Perfil</a><span class="icon-user"></span></li><li class="navegacion"><a onclick="logout()">Logout</a><span class="icon-logout"></span></li><li class="navegacion"><a href="buscar_viajes.html">Buscar viajes</a><span class="icon-search"></span></li><li class="navegacion"><a onclick="entrar_viaje()">Crear viaje</a><span class="icon-pencil"></span></li></ul>';
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