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
      var usu2=document.getElementById("equipo2").value;
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
  else{
    window.location.href="./index.html";
  }
}

function actualizaJuego(){

  if(sessionStorage.getItem("login1") && sessionStorage.getItem("login2")){
    hacerRejilla();
    pinta_ficha_no_colocada();
    pintarTurno();

    document.getElementById("jugador1").innerHTML="<p>Equipo 1: "+sessionStorage.getItem("login1")+"</p>";
    document.getElementById("jugador2").innerHTML="<p>Equipo 2: "+sessionStorage.getItem("login2")+"</p>";
  }else{
    window.location="index.html";
  }

}

/********************************/
function dados(){
  var x = Math.floor((Math.random()*10)+1);
  document.getElementById("dados").innerHTML = x;
  ctx.drawImage(x,0,0);
}


function iniciar(){

  console.log("INICIANDO EL JUEGO");

  document.getElementById("marcadorRojo").innerHTML ="<article class='cuadroMarcador'></article><br>";
  document.getElementById("marcadorVerde").innerHTML ="<article class='cuadroMarcador'></article><br>"

  document.getElementById("lanzarDados").innerHTML = "<p>Dado</p><article class='cuadro'><p id='dados'></p></article><br><button onclick='dados();' class='button'>Lanzar</button><button onclick='logout();'' class='button'>Finalizar</button><br><br>";

}

function logout(){

    console.log("----------LOGOUT-----------");
    if(window.sessionStorage){
        
        sessionStorage.clear();
        window.location.assign('index.html');
    }
}







/************************************************************/
/*function colorearCasilla(event){
  console.log("entrooo en colorearCasilla ");
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
  ctx.strokeRect(parseInt(x/40)*40,parseInt(y/40)*40,40,1180);
  

  pintarFichas();
}*/

function hacerRejilla(){// OKAY
  var c=document.getElementById("canvasJuego");
  var ctx=c.getContext("2d");
  ctx.strokeStyle = 'black';
  var dim = c.width/20;//lo que mide un cuadrado de ancho y de largo
  //324 sería para alto

  for(i=0; i<=18; i++){

    ctx.moveTo(i*dim,0);
    ctx.lineTo(i*dim, c.height);
  }

  for(i=0; i<=9; i++){

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
/**************************************************/
function prepararDnD2(){//CODIGO DEL PROFESOR

  //ZONA DRAG
  let v = document.querySelectorAll('body>footer>canvas');

  for(let i = 0; i < v.length; i++){
    v[i].setAttribute('draggable', 'true');
    v[i].id = 'canvas' + i;
    v[i].ondragstart = function(e){
      e.dataTransfer.setData('text/plain', v[i].id);
    };
  }

  //ZONA DROP
  let cv = document.getElementById('canvasJuego');

  cv.ondragover = function(e){
    e.preventDefault();
    e.stopPropagation();
    let x = e.offsetX,
      y = e.offsetY,
      dim = cv.width/20,
      fila= Math.floor(y/dim),
      columna= Math.floor(x/dim),
      ctx=cv.getContext('2d');


      dibujarCuadricula();
      ctx.beginPath();
      ctx.strokeStyle= '#f00';
      ctx.lineWidth= 3;
      ctx.strokeRect(columna*dim, fila*dim, dim, dim);

  }
  cv.ondrop = function(e){
    e.preventDefault();
    e.stopPropagation();

    let x = e.offsetX,
      y = e.offsetY,
      dim = cv.width/20,
      fila= Math.floor(y/dim),
      columna= Math.floor(x/dim),
      id = e.dataTransfer.getData('text/plain'),
      ctx = cv.getContext('2d'),
      img = new Image();

    img.onload = function(){
      //ctx.drawImage(img, x, y);
      ctx.drawImage(img,columna*dim,fila*dim,dim, dim);
      dibujarCuadricula();
    }
    img.src = document.getElementById(id).src;

  }
}
/*******************************************************/

function pintarFichas(){
      
  var canvas = document.getElementById("canvasJuego");
  var ctx = canvas.getContext("2d");
  //var dim = c.width/20;

    for(var i=0; i<18; i++) {
      for(var j=0; j<9; j++){
        if(tablero[i][j]!='n'){
          if(tablero[i][j]=='r'){
            ctx.drawImage(ficha_roja,(i)*40,(j)*40);
            
          }else{
            ctx.drawImage(ficha_verde,(i)*40,(j)*40);
          }
        } 
      }
    }
}

/*

function mostrarMatriz(){

  for(var i=0; i<18; i++) {
    for(var j=0; j<9; j++){
      console.log(tablero[i][j]);
      //document.write(tablero[i][j]);    
    }
  }
}
*/

function clickEnJuego(event){

  if(ficha!=-1 && color_ficha!='n'){

    var x = event.clientX;
    var y = event.clientY;
   
    var canvas = document.getElementById("canvasJuego");
    var ctx = canvas.getContext("2d");
    var rect = canvas.getBoundingClientRect();

    x -= parseInt(rect.left);
  
    if(color_ficha=='r' && turnoRojo==true){
      var c=document.getElementById("fichar"+ficha);
      var ctx=c.getContext("2d");
      ctx.clearRect(0,0,c.width,c.height);
      ficha_roja_colocada[ficha]=true;
      insertaFicha(parseInt(y/40), parseInt(x/40),'r');
      turnoRojo=false;

    }else if(turnoRojo==false && color_ficha=='v'){
      
      var c=document.getElementById("fichav"+ficha);
      var ctx=c.getContext("2d");
      ctx.clearRect(0,0,c.width,c.height);
      ficha_verde_colocada[ficha]=true;
      insertaFicha(parseInt(y/40), parseInt(x/40),'v');
      turnoRojo=true;
    }

    pintarTurno();
    color_ficha='n';
    ficha=-1;
  }
  pintarFichas();
  //mostrarMatriz();
}

function pintarTurno(){// OKEY
  if(turnoRojo==true){
    document.getElementById("jugadorRojo").style.backgroundColor="white";
    document.getElementById("jugadorVerde").style.backgroundColor="#A9E2F3";
  }
  else if(turnoRojo==false){
    document.getElementById("jugadorRojo").style.backgroundColor="#A9E2F3";
    document.getElementById("jugadorVerde").style.backgroundColor="white";
  }
}


/*

function insertaFicha(columna,color){
  var canvas = document.getElementById("canvasJuego");
  var ctx = canvas.getContext("2d");

  
  ctx.drawImage(ficha_roja, 0, 0);

}

*/




function insertaFicha(fila, colum, color){


console.log("columna: "+colum+"   fila: "+fila);

if(tablero[fila][colum]=='n'){
  tablero[fila][colum]=color;

}
/*
    for(var j=18; j>=0; j--){
        if(tablero[i][j]=='n' && hecho==false){
          tablero[i][j]=color;
          console.log("insertado color "+color+" en columna "+columna);
          hecho=true;
        } 
      }   */
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
  for(i=0;i<=21;i++){
    if(ficha_roja_colocada[i]==false){
    var c=document.getElementById("fichar"+i);
    var ctx=c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(ficha_roja,0,0);
    }
  }
  for(i=0;i<=21;i++){
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

