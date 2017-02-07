var https = require('https');
var http = require('http');

var searchSpotify = function(search, type) {
  
  // Traemos los datos
  https.get("https://api.spotify.com/v1/search?q=" + search + "&type=" + type, function(response) {
    var output = '';
    response.on('data', function (found) {
      output += found;
    })
    response.on('end', function () {
      if (response.statusCode === 200) {
        
        // Convertimos el JSON en Objeto
        var result = JSON.parse(output);
        // Mostramos los resultados según el tipo de búsqueda
        if (type == 'track') {
          var results = result.tracks.items;
        } else if (type == 'artist') {
          var results = result.artists.items;
        } else if (type == 'album') {
          var results = result.albums.items;
        }
        // Imprimimos los resultados
        console.log('RESULTADO DE BUSQUEDA PARA "' + search + '"')
        results.forEach(function(element){
          console.log(element.name)
        })
        
      } else {
        
        console.error("Hubo un error al hacer la búsqueda '" + search +"' con el tipo '" + type + "'. (" + http.STATUS_CODES[response.statusCode] + ")");
        
      }
    })
  })
  
}

// Traemos la búsqueda de los datos ingresados como atributos en línea de comandos
var search = process.argv[3];
var type = process.argv[2];
searchSpotify(search, type);
