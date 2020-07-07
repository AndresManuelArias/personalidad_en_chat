"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiasMensajes = void 0;
const OrganizarDialogos = require('./organizarDialogos');
let organizarDialogos = new OrganizarDialogos.OrganizarDialogos('fecha');
class DiasMensajes {
    constructor(mensajesDescompuestos) {
        let mensajesConvertido = this.convertirFechaMensajesDescompuestos(mensajesDescompuestos);
        this.fechasDeDialogo = organizarDialogos.coleccionar(mensajesConvertido);
        this.diasDelAnio = organizarDialogos.generarDialogos(mensajesConvertido, this.fechasDeDialogo);
    }
    convertirFechaMensajesDescompuestos(mensajesDescompuestos) {
        return mensajesDescompuestos.map((mensajes) => {
            let soloFecha = new Date(mensajes.fecha);
            mensajes.fecha = `${soloFecha.getFullYear()}-${soloFecha.getMonth() + 1}-${soloFecha.getDate()}`;
            return mensajes;
        });
    }
}
exports.DiasMensajes = DiasMensajes;
//# sourceMappingURL=diasMensajes.js.map