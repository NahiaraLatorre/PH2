//----- FICHA ROJA ------
var ficha_roja = new Image();
ficha_roja.src = 'ficha_roja.svg';
ficha_roja.width = '40';
ficha_roja.height = '40';

//----- FICHA VERDE ------
var ficha_verde = new Image();
ficha_verde.src = 'ficha_verde.svg';
ficha_verde.width = '40';
ficha_verde.height = '40';

var ficha = -1;
var color_ficha = 'n';
var turnoRojo=true;
var ficha_roja_colocada = [false,false,false,false,false];
var ficha_verde_colocada = [false,false,false,false,false];

var tablero = [];
for(var i=0; i<18; i++) {
    tablero[i] = new Array(10);
  for(var j=0; j<9; j++){
    tablero[i][j]='n';    
  }
}


function f1() {
    if(typeof(Storage) !== "undefined") {
      var usu1=document.getElementById("equipo1").value;
      sessionStorage.setItem("login1",usu1);
      document.getElementById("form1").innerHTML="<legend>Bienvenido "+sessionStorage.getItem("login1")+"</legend></br></br>";
    } else {
        document.getElementById("form1").innerHTML = "Sorry...";
    }
}

function f2() {
    if(typeof(Storage) !== "undefined") {
      var usu1=document.getElementById("equipo2").value;
      sessionStorage.setItem("login2",usu2);
      document.getElementById("form2").innerHTML="<legend>Bienvenido "+sessionStorage.getItem("login2")+"</legend></br></br>";
    } else {
        document.getElementById("form2").innerHTML = "Sorry...";
    }
}

function f3(){
  //console.log("entrooo a la funcion 3: "+ajugar);
  if(sessionStorage.getItem("login1") && sessionStorage.getItem("login2")){
    window.location.href="./juego.html";
    console.log("entra cuando los 2 equipos ponen nombre");
  }
}

function actualizaJuego(){

  if(sessionStorage.getItem("login1") && sessionStorage.getItem("login2")){
    hacerRejilla();
    pinta_ficha_no_colocada();
    pintarTurno();

    document.getElementById("jugador1").innerHTML="<p>Jugador 1: "+sessionStorage.getItem("login1")+"</p>";
    document.getElementById("jugador2").innerHTML="<p>Jugador 2: "+sessionStorage.getItem("login2")+"</p>";
  }else{
    window.location="index.html";
  }

}
/************************************************************/
function colorearCasilla(event){

  var x = event.clientX;
  var y = event.clientY;
  var dim = c.width/20;


  var canvas = document.getElementById("canvasJuego");
  var ctx = canvas.getContext("2d");
  var rect = canvas.getBoundingClientRect();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  hacerRejilla();

  x -= parseInt(rect.left);
  y -= parseInt(rect.top);
  
  
  ctx.strokeStyle = "#00a";
  ctx.strokeRect(parseInt(x/160)*100,parseInt(y/160)*160,160,1180);
  

  pintarFichas();
}

function hacerRejilla(){// OKAY
  var c=document.getElementById("canvasJuego");
  var ctx=c.getContext("2d");
  ctx.strokeStyle = 'black';
  var dim = c.width/20;//lo que mide un cuadrado de ancho y de largo
  //324 sería para alto

  for(i=2; i<=18; i++){

    ctx.moveTo(i*dim,0);
    ctx.lineTo(i*dim, c.height);
  }

  for(i=1; i<=9; i++){

    ctx.moveTo(dim,i*dim);
    ctx.lineTo(c.width-dim, i*dim);
  }
  ctx.stroke();

  //rectangulo grande
  ctx.beginPath();
  ctx.lineWidth;
  ctx.strokeStyle='blue';
  ctx.strokeRect(dim,0,720-dim-dim,324);

  //linea central
  ctx.beginPath();
  ctx.lineWidth=3.5;
  ctx.moveTo(360,0);
  ctx.lineTo(360,324);
  ctx.strokeStyle='red';
  ctx.stroke();

  //circulo centro
  ctx.beginPath();
  ctx.arc(360,162,dim,0,2*Math.PI);
  ctx.stroke();

  //porteria izquierda
  ctx.beginPath();
  ctx.lineWidth;
  ctx.strokeStyle='red';
  ctx.strokeRect(dim,dim*2,dim*3,dim*5);
  
  //porteria derecha
  ctx.beginPath();
  ctx.lineWidth;
  ctx.strokeStyle='red';
  ctx.strokeRect(720-(dim*4),dim*2,dim*3,dim*5);

  //semicirculo izquierda
  ctx.beginPath();
  ctx.arc(dim*4,162,37,Math.PI*-0.5,Math.PI*0.5,false);
  ctx.strokeStyle='red';
  ctx.stroke();
  //semicirculo derecha
  ctx.beginPath();
  ctx.arc(dim*16,162,37,Math.PI*0.5,Math.PI*-0.5,false);
  ctx.strokeStyle='red';
  ctx.stroke();

  //final porteria izquierda
  ctx.beginPath();
  ctx.fillStyle = "gray";
  ctx.fillRect(0, dim*3, dim, dim);
  ctx.fillRect(0, dim*4, dim, dim);
  ctx.fillRect(0, dim*5, dim, dim);
  ctx.fillRect(720-dim, dim*3, dim, dim);
  ctx.fillRect(720-dim, dim*4, dim, dim);
  ctx.fillRect(720-dim, dim*5, dim, dim);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth;
  ctx.strokeStyle='black';
  ctx.strokeRect(720-(dim*20),dim*4,dim,dim);
  ctx.strokeRect(720-(dim*20),dim*3,dim,dim);
  ctx.strokeRect(720-(dim*20),dim*5,dim,dim);
  ctx.strokeRect(720-dim,dim*4,dim,dim);
  ctx.strokeRect(720-dim,dim*3,dim,dim);
  ctx.strokeRect(720-dim,dim*5,dim,dim);

}

function pintarFichas(){
      
  var canvas = document.getElementById("canvasJuego");
  var ctx = canvas.getContext("2d");

    for(var i=0; i<18; i++) {
      for(var j=0; j<9; j++){
        if(tablero[i][j]!='n'){
          if(tablero[i][j]=='r'){
            ctx.drawImage(ficha_roja,(i)*162,(j)*162);
            
          }else{
            ctx.drawImage(ficha_verde,(i)*162,(j)*162);
          }
        } 
      }
    }

}


function clickEnJuego(event){

  if(ficha!=-1 && color_ficha!='n'){

    var x = event.clientX;
    var y = event.clientY;
    alert("hhoooooolaaaa"+x+y);
    var canvas = document.getElementById("canvasJuego");
    var ctx = canvas.getContext("2d");
    var rect = canvas.getBoundingClientRect();

    x -= parseInt(rect.left);
  
    if(color_ficha=='r' && turnoRojo==true){
      var c=document.getElementById("fichar"+ficha);
      var ctx=c.getContext("2d");
      ctx.clearRect(0,0,c.width,c.height);
      ficha_roja_colocada[ficha]=true;
      insertaFicha(parseInt(x/162),'r');
      turnoRojo=false;

    }else if(turnoRojo==false && color_ficha=='v'){
      
      var c=document.getElementById("fichav"+ficha);
      var ctx=c.getContext("2d");
      ctx.clearRect(0,0,c.width,c.height);
      ficha_verde_colocada[ficha]=true;
      insertaFicha(parseInt(x/162),'v');
      turnoRojo=true;
    }

    pintarTurno();
    color_ficha='n';
    ficha=-1;
  }
}

function pintarTurno(){
  if(turnoRojo==true){
    document.getElementById("jugadorRojo").style.backgroundColor="white";
    document.getElementById("jugadorVerde").style.backgroundColor="#A9E2F3";
  }
  else if(turnoRojo==false){
    document.getElementById("jugadorRojo").style.backgroundColor="#A9E2F3";
    document.getElementById("jugadorVerde").style.backgroundColor="white";
  }
}

function insertaFicha(columna,color){
  var hecho=false;

    for(var j=18; j>=0; j--){
        if(tablero[columna][j]=='n' && hecho==false){
          tablero[columna][j]=color;
          console.log("insertado color "+color+" en columna "+columna);
          hecho=true;
        } 
      }   
}

function ficha_seleccionada(color,num){

  limpia_ficha();

  if(color=='r'){
    if(ficha_roja_colocada[num]==false){
    for(i=0;i<=80;i++){
      if(i==num && ficha_roja_colocada[i]==false){

    
      var c=document.getElementById("fichar"+i);
      var ctx=c.getContext("2d");
      ctx.strokeStyle = 'red';
      ctx.strokeRect(0, 0, c.width, c.height);
      ficha=i;
      color_ficha='r';
        }
      }
    }
  }else{
    if(ficha_verde_colocada[num]==false){
    for(i=0;i<=80;i++){
      if(i==num && ficha_verde_colocada[i]==false){
    
      var c=document.getElementById("fichav"+i);
      var ctx=c.getContext("2d");
      ctx.strokeStyle = 'red';
      ctx.strokeRect(0, 0, c.width, c.height);
      ficha=i;
      color_ficha='v';
        }
      }
    }
  }

  console.log(ficha);   
  console.log(color_ficha);


}

function limpia_ficha(){
  if(ficha!=-1 && color_ficha!='n'){
    if(color_ficha=='r'){
    var c=document.getElementById("fichar"+ficha);
  var ctx=c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height);
  ctx.drawImage(ficha_roja,0,0);
  }
    else{
  var c=document.getElementById("fichav"+ficha);
  var ctx=c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height);
  ctx.drawImage(ficha_verde,0,0);
  
    }
  }
}

function pinta_ficha_no_colocada(){
  for(i=0;i<=81;i++){
    if(ficha_roja_colocada[i]==false){
    var c=document.getElementById("fichar"+i);
    var ctx=c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(ficha_roja,0,0);
    }
  }
  for(i=0;i<=81;i++){
    if(ficha_verde_colocada[i]==false){
    var c=document.getElementById("fichav"+i);
    var ctx=c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(ficha_verde,0,0);
    }
  }
}

function reiniciar(){

  for(var i=0; i<18; i++) {
    for(var j=0; j<9; j++){
      tablero[i][j]='n';
    } 
  }

  for(var i=0;i<=80;i++){
    ficha_verde_colocada[i]=false;
    ficha_roja_colocada[i]=false;
  }
    hacerRejilla();
    pinta_ficha_no_colocada();
    pintarTurno();
    pintarFichas();
}

function finalizar(){
  sessionStorage.removeItem("login1");
  sessionStorage.removeItem("login2");
  window.location="index.html";
}

/*function crearObjAjax(){
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
}*/