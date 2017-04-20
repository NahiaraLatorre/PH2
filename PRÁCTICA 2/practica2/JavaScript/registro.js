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

function peticionAJAX_PostRegistro() {
       
    url="rest/post/usuario.php";
    usuarioR = crearObjAjax();
    var pwd=document.getElementById("password").value;
    var pw2=document.getElementById("password2").value;

     if(pwd==pw2){//si las contrasenyas son iguales entro
      if (usuarioR) {
       
          var usu=document.getElementById("nick").value;
          var nombre=document.getElementById("usu").value;
          var email=document.getElementById("email").value;

          if(window.sessionStorage){
            var clave=sessionStorage.getItem("clave");

            var args = "login=" + usu + "&pwd=" + pwd + "&pwd2=" + pw2 +"&clave="+clave;
            if(nombre!=""){

              args+="&nombre="+nombre;
            }
            else{
              args+="&nombre="+sessionStorage.getItem("usu");
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
   if(window.sessionStorage.getItem("nick")){
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
function inicio(){
    
    if(window.sessionStorage){
        if(sessionStorage.getItem("nick")){  
            document.getElementById("menu").innerHTML='<ul><li><label for="ckb-menu">&equiv;</label></li><li><a href="index.html" id="Inicio"><i class="icon-home"></i> Inicio</a></li><li><a href="buscar.html" id="Busqueda"><i class="icon-search"></i> Búsqueda</a></li><li><a href="Nueva-entrada.html" id="Nueva_entrada"><i class="icon-picture"></i><a onclick="NuevaEntrada()">Nueva entrada</a></li><li><a href="index.html" id="Logout"><i class="icon-logout"></i><a onclick="logout()"> Logout</a></li></ul>';
        }else{
            document.getElementById("menu").innerHTML='<ul><li><label for="ckb-menu">&equiv;</label></li><li><a href="index.html" id="Inicio"><i class="icon-home"></i> Inicio</a></li><li><a href="buscar.html" id="Busqueda"><i class="icon-search"></i> Búsqueda</a></li><li><a href="registro.html" id="Registro" onclick="registroInicio()"><i class="icon-user-plus"></i> Registrarse</a></li><li><a href="login.html" id="Login"><i class="icon-login"></i> Login</a></li></ul>';
        }
    }
}

function logout(){

    if(window.sessionStorage){
        
        sessionStorage.clear();
        document.getElementById("menu").innerHTML='<ul><li><label for="ckb-menu">&equiv;</label></li><li><a href="index.html" id="Inicio"><i class="icon-home"></i> Inicio</a></li><li><a href="buscar.html" id="Busqueda"><i class="icon-search"></i> Búsqueda</a></li><li><a href="Nueva-entrada.html" id="Nueva_entrada"><i class="icon-picture"></i><a onclick="NuevaEntrada()">Nueva entrada</a></li><li><a href="registro.html" id="Registro" onclick="registroInicio()"><i class="icon-user-plus"></i> Registrarse</a></li><li><a href="login.html" id="Login"><i class="icon-login"></i> Login</a></li></ul>';
        window.location.assign('index.html');
    }
}
function NuevaEntrada(){
  
  if(sessionStorage.getItem("nick")){
    window.location.assign("Nueva-entrada.html");
  }
  else{
    window.alert("Debes de estar logueado para acceder a este contenido");
    window.location.assign("index.html");
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