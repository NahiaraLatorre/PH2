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
        var password= document.getElementById("password").value;
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

/*

function peticionAJAX_LOGIN(frm){

  console.log('ENTRO');
  let xhr = new XMLHttpRequest(),
  url = 'http://localhost/practica2/rest/login/', //Puesto para mi ruta
  fd  = new FormData(frm);
 
  xhr.open('POST', url, true);
  xhr.onload = function(){ //Cuando llega al paso 4 realiza la ejecudion de este codigo
  console.log(xhr.responseText); //Muestra la respuesta del proceso por consola
  let du = JSON.parse(xhr.responseText); 
  //Lo que hace es guardarlo en el sesion storage si ha funcionado
  if(du.RESULTADO == 'ok'){
    console.log('Bienvenido');
    sessionStorage['du'] = xhr.responseText; //se podria utilizar la funcion stringiflay!
    //window.location = "http://localhost:4443/ph2";
  
  }else{
    console.log('No estas logueado');
  }

  //frm.parentNode.querySelector('p').innerHTML = xhr.responseText; //Text content lo interpreta como texto tal cual (no interpreta el html para luego ponerlo) con inner interpreta el codigo html
 };
 xhr.send(fd);
 return false;
}*/

function procesarLogin(){
  
//console.log(obj.responseText);

//PARA CONSOLA
if(obj.readyState == 4){ // valor 4: respuesta recibida y lista para ser procesada
  var ajax;
  if(window.JSON) // Comprueba si soporta JSON nativo
   ajax = window.JSON.parse( obj.responseText ); // mediante objeto JSON nativo
  else 
   ajax = eval( '(' + obj.responseText + ')' ); // mediante función eval()
  console.log( ajax );
 }

   if(obj.readyState== 4){ // valor 4: respuesta recibida y lista para ser procesada
    console.log(obj.status);
     if(obj.status== 200){ // El valor 200 significa "OK"
     // Aquí se procesa lo que se haya devuelto:
     //document.getElementById("miDiv").innerHTML= obj.responseText;
     var usu=document.getElementById("nick").value;
     var contra=document.getElementById("password").value;

     sessionStorage.setItem("nick",usu);
     sessionStorage.setItem("password",contra);

     var usuario=JSON.parse(obj.responseText);
     sessionStorage.setItem("email",usuario.email);
     sessionStorage.setItem("nombre",usuario.nombre);
     sessionStorage.setItem("clave",usuario.clave);
     sessionStorage.setItem("fecha",usuario.ultimo_acceso);

     document.getElementById("mensaje").innerHTML="Bienvenido "+usu+"<br>"+" Tu ultima conexión fue el: "+ sessionStorage.getItem("fecha")+"<div id='cerrar' onclick='cerrarMensajeConIndex()'>Cerrar</div>";
     document.getElementById("mensaje").style.zIndex="5";
     document.getElementById("mensaje").style.transition="opacity 1s linear";
     document.getElementById("mensaje").style.opacity="1";

      document.getElementById("muro").style.opacity="0.3";
      document.getElementById("muro").style.zIndex="4";

   }else {
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
/*   ESTA EN FUNCION.JS
function inicio(){
    
    if(window.sessionStorage){
        if(sessionStorage.getItem("nick")){  
            document.getElementById("menu").innerHTML='<ul><li><label for="ckb-menu">&equiv;</label></li><li><a href="index.html" id="Inicio"><i class="icon-home"></i> Inicio</a></li><li><a href="buscar.html" id="Busqueda"><i class="icon-search"></i> Búsqueda</a></li><li><a href="Nueva-entrada.html" id="Nueva_entrada"><i class="icon-picture"></i><a onclick="NuevaEntrada()">Nueva entrada</a></li><li><a href="index.html" id="Logout"><i class="icon-logout"></i><a onclick="logout()"> Logout</a></li></ul>';
        }else{
            document.getElementById("menu").innerHTML='<ul><li><label for="ckb-menu">&equiv;</label></li><li><a href="index.html" id="Inicio"><i class="icon-home"></i> Inicio</a></li><li><a href="buscar.html" id="Busqueda"><i class="icon-search"></i> Búsqueda</a></li><li><a href="registro.html" id="Registro"><i class="icon-user-plus"></i> Registrarse</a></li><li><a href="login.html" id="Login"><i class="icon-login"></i> Login</a></li></ul>';
        }
    }
}

function logout(){

    if(window.sessionStorage){
        
        sessionStorage.clear();
        document.getElementById("menu").innerHTML='<ul><li><label for="ckb-menu">&equiv;</label></li><li><a href="index.html" id="Inicio"><i class="icon-home"></i> Inicio</a></li><li><a href="buscar.html" id="Busqueda"><i class="icon-search"></i> Búsqueda</a></li><li><a href="Nueva-entrada.html" id="Nueva_entrada"><i class="icon-picture"></i><a onclick="NuevaEntrada()">Nueva entrada</a></li><li><a href="registro.html" id="Registro"><i class="icon-user-plus"></i> Registrarse</a></li><li><a href="login.html" id="Login"><i class="icon-login"></i> Login</a></li></ul>';
        window.location.assign('index.html');
    }
}
*/



function NuevaEntrada(){
  
  if(sessionStorage.getItem("nick")){
    window.location.assign("Nueva-entrada.html");
  }
  else{
    window.alert("Debes de estar logueado para acceder a este contenido");
    window.location.assign("index.html");
  }

}

function peticionComprobarLogin(value){
    
  obj = crearObjAjax();
  if(obj){ // Si se ha creado el objeto, se completa la petición ...
    obj.onreadystatechange = procesarComprobarLogin; // función callback: procesarCambio
    obj.open("POST", "rest/login/"+value, true); // Se crea petición GET a url, asíncrona ("true")
    obj.send(); // Se envía la petición
  }

}
function procesarComprobarLogin(){
    if(obj.readyState == 4){ 
        if(obj.status == 200){ 
           var log=JSON.parse(obj.responseText);
           var disponible=log.disponible;
         
          if(disponible=="false"){
           document.getElementById("no2").innerHTML="<p id='no2' class='no'>Ese login no esta disponible</p>";
          }
          else{
            document.getElementById("no2").innerHTML="";
          }
        }
    }
}