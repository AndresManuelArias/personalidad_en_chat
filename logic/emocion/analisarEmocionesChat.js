'use strict';
exports.__esModule = true;
var fs = require("fs");
var GenerarDialogos = require('./generarDialogos');
var UsuariosMensajes = require('./usuariosMensajes');
var DiasMensajes = require('./diasMensajes');
var archivo = fs.readFileSync('../../base_data/Chat de WhatsApp con Ingeniería Zemla.txt', 'utf-8');
var dialogosGenerados = new GenerarDialogos.GenerarDialogos(archivo);
var usuariosMensajes = new UsuariosMensajes.UsuariosMensajes(dialogosGenerados.mostrarDialogos());
var diasMensajes = new DiasMensajes.DiasMensajes(dialogosGenerados.mostrarDialogos());
fs.writeFile('../../base_data/diasDeChat.json', JSON.stringify(diasMensajes.fechasDeDialogo), function (error) {
    if (error)
        console.log(error);
    else
        console.log("El archivo fue creado diasDeChat");
});
fs.writeFile('../../base_data/mensajesPorDias.json', JSON.stringify(diasMensajes.diasDelAnio), function (error) {
    if (error)
        console.log(error);
    else
        console.log("El archivo fue creado mensajesPorDias");
});
fs.writeFile('../../base_data/nombreUsuarios.json', JSON.stringify(usuariosMensajes.nombresUsuarios), function (error) {
    if (error)
        console.log(error);
    else
        console.log("El archivo fue creado nombreUsuarios");
});
fs.writeFile('../../base_data/mensajeUsuarios.json', JSON.stringify(usuariosMensajes.usuarios), function (error) {
    if (error)
        console.log(error);
    else
        console.log("El archivo fue creado mensajeUsuarios");
});
fs.writeFile('../../base_data/dialogos.json', JSON.stringify(dialogosGenerados.mostrarDialogos()), function (error) {
    if (error)
        console.log(error);
    else
        console.log('El archivo fue creado dialogos');
});
