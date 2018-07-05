"use strict";
exports.__esModule = true;
var OrganizarDialogos = require('./organizarDialogos');
var organizarDialogos = new OrganizarDialogos.OrganizarDialogos('usuario');
var UsuariosMensajes = /** @class */ (function () {
    function UsuariosMensajes(mensajesDescompuestos) {
        this.nombresUsuarios = organizarDialogos.coleccionar(mensajesDescompuestos);
        this.usuarios = organizarDialogos.generarDialogos(mensajesDescompuestos, this.nombresUsuarios);
    }
    return UsuariosMensajes;
}());
exports.UsuariosMensajes = UsuariosMensajes;
