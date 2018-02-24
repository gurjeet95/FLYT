let Hapi = require('hapi');
let Path = require('path');
let Vision = require('vision');
let server = new Hapi.Server();
let Inert = require('inert');

 server.connection({
    host: process.env.IP,
    port: Number(process.argv[2] || 8080)
});

server.register(Inert, (err) => {
    if (err) throw err;
});

server.register(Vision, function (err) {
        if (err) throw err;
    });
server.route(require('./routes'));
server.views({
        engines: {
            html: require('handlebars')
        },
        path: Path.join(__dirname, 'templates')
    });
server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log(`server is listening on: ${server.info.uri}`)
})