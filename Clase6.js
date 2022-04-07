const http = require('http');
var moment = require('moment');
moment().format(); 

const time = moment().format("H");

function getMsj(time) {
    if (time > 6 && time < 12 ) {
        return 'Buenos dias!'
        } else if (time > 13 && time < 19) {
            return 'Buenas tardes!'
            }   else if (time > 20) {
                return 'Buenas noches!'
            }
    }

const server = http.createServer((peticion, respuesta) => {
    respuesta.end(getMsj(time));
});

const connectedServer = server.listen(8080, () => {
    console.log(`El servidor http escuchando en el puerto ${connectedServer.address().port}`);
});