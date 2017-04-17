<<<<<<< HEAD

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
    }
else{
   alert("El tamaño de la foto debe de ser menor que 500KB");
 }
}


=======
/************************************************
*
*           DEBERIAMOS BORRAR ESTE
*
*
*           SERIA MEJOR TENER UN JS PARA CADA HTML
*
*
*
*
*
************************************************/
>>>>>>> origin/master












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
/* Funcion de acceso */
function acceso(formularioacceso){

    var nick = formularioacceso.nick.value;
    var password = formularioacceso.password.value;

    if (nick == ""){// No puede estar vacio

        alert ("Debes escribir tu nick");
        return;
    }

    if(!primerCaracter(nick)){

        alert ("El nombre de usuario no puede empezar por un n\u00FAmero");
        return;
    }

    if (password == ""){// No puede estar vacio

        alert ("Debes escribir tu contrase\u00F1a");
        return;
    }

    if (!longitud (3, 20, nick)){// No pude superar los 20 caracteres

        alert ("Usuario incorrecto");
        return;
    }

    if (!longitud (6, 20, password)){// No pude superar los 20 caracteres

        alert ("password incorrecto");
        return;
    }

    if (!compruebaCaracteres(nick, 1)){// Solo puede contener numeros y letras

        alert ("El usuario debe contener caracteres alfanum\u00E9ricos, sin espacios intermedios");
        return;
    }
    if (!compruebaCaracteres(password, 2)){// Solo puede contener numeros y letras

        alert ("El password debe contener caracteres alfanum\u00E9ricos, sin espacios intermedios (puede contener los signos _ y/o -)");
        return;
    }
}

/* Funcion de registro */
function registrarse(formularioregistro){
    
    var nick = formularioregistro.nick.value;
    var usuario = formularioregistro.usuario.value;
    var password = formularioregistro.password.value;
    var password2 = formularioregistro.password2.value;
    var email = formularioregistro.email.value;
    /*var valido = true;  
    var valido2 = true; // Para validar mediante las expresiones regulares*/

    // Nick no vacio
    if (nick == ""){

        alert ("Debes escribir tu Nick");
        return;
    }

    if(!primerCaracter(nick)){

        alert ("El nick no puede empezar por un n\u00FAmero");
        return;
    }

    // Longitud de nick maxima 20 caracteres
    if (!longitud (3, 20, nick)){

        alert ("El nick no puede ser mayor de 20 caracteres");
        return;
    }

    // Caracteres de usuario
    if (!compruebaCaracteres(nick, 1)){

        alert ("El nick debe contener caracteres alfanum\u00E9ricos");
        return;
    }

    // Usuario no vacio
    if (usuario == ""){

        alert ("Debes escribir tu nombre de usuario");
        return;
    }

    // Contrasenya no vacia
    if (password == ""){

        alert ("Debes escribir tu contrase\u00F1a");
        return;
    }

    // Caracteres de la contrasenya
    if (!compruebaCaracteres(password, 2)){

        alert ("La contrase\u00F1a debe contener caracteres alfanum\u00E9ricos y/o los simbolos (- _)");
        return;
    }

    // Longitud de la contrasenya maximo 20 caracteres
    if (!longitud (6, 20, password)){

        alert ("La contrase\u00F1a no puede ser mayor de 20 caracteres");
        return;
    }

    // Contrasenya debe tener mayusculas, minusculas y numeros
    if (!contieneMayMinNum (password)){

        alert ("La contrase\u00F1a debe tener al menos una may\u00FAscula, una min\u00FAscula y un n\u00FAmero");
        return;
    }

    // Las contrasenyas deben coincidir
     if (password != password2){

        alert ("Las contrase\u00F1as no coinciden");
        return;
    }

    // Email no vacio
    if (email == ""){

        alert ("Debes escribir tu email");
        return;
    }

    // Email valido
    if (!emailValido (email)){

        alert ("El email no es valido");
        return;
    }
    /********************************************
    // Las contrasenyas deben coincidir
    if (password1 != password2){

        alert ("Las contrase\u00F1as no coinciden");
        valido = false;
        return false;
    }
    /* Validacion con expresiones regulares del usuario, las contrasenyas y el email
    
    // Usuario valido -- expresion regular
    var er = new RegExp("^[A-Za-z0-9]{6,20}$");    //Admite letras minusculas, mayusculas, y numeros. Entre 3 y 15 caracteres.
    if(!er.test(usuario))
    {
        alert ("Usuario incorrecto. El usuario solo debe contener caracteres alfanumericos.");
        //valido2 = false;  
        return false;
    }

    // Contrasenya valida -- expresion regular
    var er2 = new RegExp("^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9_]))[A-Za-z0-9_]{6,20}$");    // Tiene que haber al menos una mayuscula, una minuscula y un numero. 
    if(!er2.test(password1))                                                // Solo admite caracteres alfanumericos y el subrayado. Entre 6 y 15 caracteres.
    {
        alert("La contrasenya ha de tener al menos una mayuscula, una minuscula y un numero. Puede contener el caracter _ - y ha de haber entre 6 y 20 caracteres");
        //valido2 = false;
        return false;
    }

    // Email valido -- expresion regular
    var er3 = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-z]{2,4}$");
    if(!er3.test(email))
    {
        alert ("El email no es valido.");
        //valido2 = false;
        return false;
    }
        //return valido;
    return valido2;*/
}

/********** Funciones auxiliares **********/

/* Funcion que comprueba que la longitud esta entre una minima y maxima */
function longitud(min, max, vari){

    if ((vari.length >= min) && (vari.length <= max)){
        return true;
    }else{
        return false;
    }
}

/* Funcion que comprueba que el primer caracter del usuario no sea un numero */
function primerCaracter(vari){

    var c; 
    c = vari.charCodeAt(0);// Cojo la primera posicion del nombre del usuario
    var tieneNum = true;

    // Compruebo que el primer caracter no tenga numeros
    if(c >= 48 && c <= 57){
        tieneNum = false;
    }
    return tieneNum;
}

/* Funcion que comprueba que el tipo de caracteres son correctos */
function compruebaCaracteres(vari, tipo){   

    var i = 0;
    var c;  
    var ok = true;
 
    // Para comprobar que son caracteres alfanumericos
    if(tipo == 1)
    {
        while ( (i<vari.length) && (ok) )
        {
            c = vari.charCodeAt(i);
            if ( (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || (c >= 48 && c <= 57) )
                i++;
            else
                ok = false;
        }
        return ok;
    }
 
    // Para comprobar que son caracteres alfanumericos y los simbolos (_) o (-)
    else if(tipo == 2)
    {
        while ( (i<vari.length) && (ok) )  
        {
            c = vari.charCodeAt(i);
            if ( (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || (c >= 48 && c <= 57) || (c == 95) || (c == 45))
                i++;
            else
                ok = false;
        }
        return ok;
    }   
}

/* Funcion que comprueba si hay mayusculas, minusculas y numeros */
function contieneMayMinNum(vari){

    var i = 0;
    var c;  
    var tieneMayus = false;    
    var tieneMinus = false;
    var tieneNum = false;   

    while ( (i<vari.length) ) 
    {
        c = vari.charCodeAt(i);
        if (c >= 65 && c <= 90) 
            tieneMayus = true;
        if (c >= 97 && c <= 122) 
            tieneMinus = true;
        if(c >= 48 && c <= 57)
            tieneNum = true;
        i++;
    }
    if(tieneMayus && tieneMinus && tieneNum)
        return true;
    else
        return false;
}

/* Funcion que comprueba que el email tiene @ y despues del . tiene entre 2 y 4 caracteres*/
function emailValido(vari){

    var i = 0;
    var j = 0;
    var c;
    var ok = false;
    var arroba = false;
    var dominio = false;

    while ( (i < vari.length) )
    {
        c = vari.charCodeAt(i);

        if (c == 64) // Si vemos una arroba
        {
            arroba = true;   
        }

        if (c == 46) // Si vemos un punto miramos cuantos caracteres hay detras
        {
            while( (i < vari.length - 1) ) // Cuando llegue a la ultima posicion ya no incrementa la j
            {
                j++;
                i++;
            }

            if (j >= 2 && j <= 4)   
            {
                dominio = true;
            }
        }

        i++;
    }
    
    
    if ((arroba == true) && (dominio == true))
    {
        ok = true;
    }

    return ok;
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


