"use strict";
exports.__esModule = true;
var OrganizarDialogos = require('./organizarDialogos');
var organizarDialogos = new OrganizarDialogos.OrganizarDialogos('fecha');
var DiasMensajes = /** @class */ (function () {
    function DiasMensajes(mensajesDescompuestos) {
        var mensajesConvertido = this.convertirFechaMensajesDescompuestos(mensajesDescompuestos);
        this.fechasDeDialogo = organizarDialogos.coleccionar(mensajesConvertido);
        this.diasDelAnio = organizarDialogos.generarDialogos(mensajesConvertido, this.fechasDeDialogo);
    }
    DiasMensajes.prototype.convertirFechaMensajesDescompuestos = function (mensajesDescompuestos) {
        return mensajesDescompuestos.map(function (mensajes) {
            var soloFecha = new Date(mensajes.fecha);
            mensajes.fecha = soloFecha.getFullYear() + "-" + (soloFecha.getMonth() + 1) + "-" + soloFecha.getDate();
            return mensajes;
        });
    };
    return DiasMensajes;
}());
exports.DiasMensajes = DiasMensajes;
