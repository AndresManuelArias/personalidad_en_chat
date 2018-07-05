"use strict";
exports.__esModule = true;
var OrganizarDialogos = /** @class */ (function () {
    function OrganizarDialogos(criterioPropiedad1) {
        this.criterioPropiedad = criterioPropiedad1;
    }
    OrganizarDialogos.prototype.generarDialogos = function (mensajesDescompuestos, nombres) {
        var _this = this;
        var criterioDialogo = {};
        // console.log('nombres',nombres)
        nombres.forEach(function (nombre) {
            // console.log('nombre',nombre);
            criterioDialogo[nombre] = {};
            criterioDialogo[nombre]['dialogoPorDias'] = mensajesDescompuestos.filter(function (dialogo) {
                // console.log('dialogo',dialogo);
                // console.log('this.criterioPropiedad',this.criterioPropiedad);
                return nombre == dialogo[_this.criterioPropiedad];
            });
            criterioDialogo[nombre]['dialogoPorDias'].forEach(function (dialogue) {
                criterioDialogo[nombre]['dialogos'] += dialogue.dialogo + ". ";
            });
        });
        return criterioDialogo;
    };
    OrganizarDialogos.prototype.coleccionar = function (dialogos) {
        // console.log('this.criterioPropiedad',criterioPropiedad)
        var coleccionando = this.guardarColecion(this.criterioPropiedad);
        var resultado = [];
        dialogos.forEach(function (dato) {
            resultado = coleccionando(dato);
        });
        return resultado;
    };
    OrganizarDialogos.prototype.guardarColecion = function (propiedadGuardar) {
        var colecion = [];
        return function (dato) {
            if (!colecion.some(function (info) { return info == dato[propiedadGuardar]; })) {
                colecion.push(dato[propiedadGuardar]);
            }
            return colecion;
        };
    };
    return OrganizarDialogos;
}());
exports.OrganizarDialogos = OrganizarDialogos;
