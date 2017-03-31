function mostrarEntradas(frm)
{
    let xhr = new XMLHttpRequest(),
        url = 'http://localhost:8036/ph2/curso2016-2017/practicas/practica2/rest/entrada/',
        section = frm.parentNode.parentNode;

    url += '?pag=' + frm.pag.value + '&lpag=' + frm.lpag.value;

    xhr.open('GET', url, true);
    xhr.onload = function(){
        console.log(xhr.responseText);
        let v = JSON.parse(xhr.responseText);
        console.log(v);
        if(v.RESULTADO == 'ok')
        {
            let a;
            while(a = section.querySelector('div>article') )
                a.remove();

            for(let i=0;i<v.FILAS.length;i++){
                let e = v.FILAS[i],
                    foto =
'http://localhost:8036/ph2/curso2016-2017/practicas/practica2/fotos/'
+ e.fichero;
                let article =
section.querySelector('div>template').content.cloneNode(true);

                article.querySelector('h3').innerHTML    = e.nombre;
                article.querySelector('div>img').src     = foto;
                article.querySelector('div>img').alt     = e.descripcion_foto;
                article.querySelector('div>p').innerHTML = e.descripcion;

article.querySelector('footer>p:first-of-type').innerHTML = e.login;
                article.querySelector('footer>time').innerHTML = e.fecha;

article.querySelector('footer>time').setAttribute('datetime',
e.fecha);

article.querySelector('footer>p:nth-of-type(2)').innerHTML = e.nfotos;

article.querySelector('footer>p:nth-of-type(3)').innerHTML =
e.ncomentarios;

                section.querySelector('h2+div').appendChild(article);
            } // for(let i=0;i<v.FILAS.length;i++){
        }
    }
    xhr.send();
    return false;
}
function mostrarEntradas2(frm)
{
    let xhr = new XMLHttpRequest(),
        url = 'http://localhost:8036/ph2/curso2016-2017/practicas/practica2/rest/entrada/',
        section = frm.parentNode.parentNode;

    url += '?pag=' + frm.pag.value + '&lpag=' + frm.lpag.value;

    xhr.open('GET', url, true);
    xhr.onload = function(){
        console.log(xhr.responseText);
        let v = JSON.parse(xhr.responseText);
        console.log(v);
        if(v.RESULTADO == 'ok')
        {
            let html = '';
            for(let i=0;i<v.FILAS.length;i++){
                let e = v.FILAS[i],
                    foto =
'http://localhost:8036/ph2/curso2016-2017/practicas/practica2/fotos/'
+ e.fichero;
                html += '<article>';
                html +=   '<h3>' + e.nombre + '</h3>';
                html +=   '<div>'
                html +=     '<img src="' + foto + '" alt="' +
e.descripcion_foto + ' ">';
                html +=     '<p>' + e.descripcion + '</p>';
                html +=   '</div>';
                html +=   '<footer>';
                html +=      '<p>' + e.login + '</p>';
                html +=      '<time datetime="' + e.fecha + '">' +
e.fecha + '</time>';
                html +=      '<p>' + e.nfotos + ' fotos</p>';
                html +=      '<p>' + e.ncomentarios + ' comentarios</p>';
                html +=   '</footer>';
                html += '</article>';
            } // for(let i=0;i<v.FILAS.length;i++){
            section.querySelector('h2+div').innerHTML = html;
        }
    }
    xhr.send();
    return false;
}
