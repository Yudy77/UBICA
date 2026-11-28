const http = require('node:http');
const { mkdir, writeFile } = require('node:fs/promises');
const path = require('node:path');

const carpeta = path.join(__dirname, 'datos');

function responder(res, estado, datos) {
  res.writeHead(estado, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(datos));
}

http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/salud') {
    return responder(res, 200, { activo: true });
  }

  const ruta = /^\/registros\/(\d+)$/.exec(req.url);
  if (req.method !== 'PUT' || !ruta) {
    return responder(res, 404, { error: 'Ruta no disponible' });
  }

  let registro;
  try {
    let contenido = '';
    for await (const parte of req) {
      contenido += parte;
      if (contenido.length > 65536) {
        return responder(res, 413, { error: 'Registro demasiado grande' });
      }
    }
    registro = JSON.parse(contenido);
    if (String(registro?.id) !== ruta[1] || !registro.nombre?.trim()) {
      return responder(res, 400, { error: 'Registro invalido' });
    }
  } catch {
    return responder(res, 400, { error: 'JSON invalido' });
  }

  try {
    await mkdir(carpeta, { recursive: true });
    // Si UBICA reintenta un envio, se guarda con el mismo identificador.
    await writeFile(
      path.join(carpeta, `${ruta[1]}.json`),
      JSON.stringify(registro, null, 2),
      'utf8'
    );
    console.log(`Registro recibido: ${registro.id} - ${registro.nombre}`);
    return responder(res, 200, { id: registro.id, sincronizado: true });
  } catch (error) {
    console.error(error);
    return responder(res, 500, { error: 'No se pudo guardar el registro' });
  }
}).listen(3100, '127.0.0.1', () => {
  console.log('Servidor de UBICA activo en http://127.0.0.1:3100');
});
