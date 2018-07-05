"use strict";
exports.__esModule = true;
var GenerarDialogos = /** @class */ (function () {
    function GenerarDialogos(dialogos) {
        var _this = this;
        var dialogoUsuarios = dialogos.split('\n');
        dialogoUsuarios.splice(0, 1);
        this.dialogoUsuarios = dialogoUsuarios.map(function (dialogo, index) { return _this.descomponerDialogo(dialogo, index); });
    }
    GenerarDialogos.prototype.descomponerDialogo = function (dialogo, index) {
        var myRe = / - [\W\w]*: /g;
        var myArray = myRe.exec(dialogo);
        // console.log('myArray', myArray);
        var descompuesto = dialogo.split(myArray[0]);
        // console.log('descompuesto', descompuesto);
        var emocionPorDia = { fecha: descompuesto[0],
            usuario: myArray[0],
            dialogo: descompuesto[1],
            idSecuenciaDialogo: index };
        return emocionPorDia;
    };
    GenerarDialogos.prototype.mostrarDialogos = function () {
        return this.dialogoUsuarios;
    };
    GenerarDialogos.prototype.limpiarTexto = function (normasLimpieza) {
    };
    return GenerarDialogos;
}());
exports.GenerarDialogos = GenerarDialogos;
