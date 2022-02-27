const {createReadStream} = require('fs');
const {createServer} = require('http');
const path = require('path');

// configuramos con una variable de entorno el puerto
const {PORT  = 3009} = process.env;

// creamos con el content type del archivo que vamos a servir
const CSS_CONTENT_TYPE = 'text/css';
const JS_CONTENT_TYPE = 'text/javascript';
const JSON_CONTENT_TYPE = 'application/json';
const HTML_CONTENT_TYPE = 'text/html';

const PUBLIC_FODLER = path.join(__dirname, 'public');

// creamos un requestListener para pasarle a nuestro servidor
const requestListener = (req,res) => {
  const {url} = req;
  const urlSplited = url.split('/');
  console.log(url.split('/'),url)
  let statusCode = 200;
  let contentType = HTML_CONTENT_TYPE;
  let stream

  if (url === '/') {
    stream = createReadStream(`${PUBLIC_FODLER}/index.html`)
  }
  else if (urlSplited[1] === 'css') {
    stream = createReadStream(`${PUBLIC_FODLER}${'/main.css'}`)
    contentType = CSS_CONTENT_TYPE
  }
  else if (urlSplited[1] === 'js') {
    stream = createReadStream(`${PUBLIC_FODLER}${'/main.js'}`)
    contentType = JS_CONTENT_TYPE
  }
  else if (urlSplited[1] === 'json') {
    stream = createReadStream(`${PUBLIC_FODLER}${'/main.json'}`)
    contentType = JSON_CONTENT_TYPE
  }
  else {
    statusCode = 404
  }
  // escribimos en la respuesta el status code de 200 y el content type que necesitamos
  res.writeHead(statusCode, {'Content-Type': contentType})

// si tenemos un stream, lo enviamos a la respuesta
  if (stream) {
    stream.pipe(res)
  }
// si no, devolvemos un string diciendo que no hemos encontrado nada
  else {
    return res.end('Not found')
  }
};

// creamos un servidor con el requestListener
const server = createServer(requestListener);

// hacemos que el servidor escuche el puerto configurado
server.listen(PORT)
