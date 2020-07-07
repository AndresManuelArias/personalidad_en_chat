"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosMensajes = void 0;
const OrganizarDialogos = require('./organizarDialogos');
let organizarDialogos = new OrganizarDialogos.OrganizarDialogos('usuario');
class UsuariosMensajes {
    constructor(mensajesDescompuestos) {
        this.nombresUsuarios = organizarDialogos.coleccionar(mensajesDescompuestos);
        this.usuarios = organizarDialogos.generarDialogos(mensajesDescompuestos, this.nombresUsuarios);
    }
}
exports.UsuariosMensajes = UsuariosMensajes;
//# sourceMappingURL=usuariosMensajes.js.map