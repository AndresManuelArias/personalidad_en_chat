"use strict";
exports.__esModule = true;
var Persona = /** @class */ (function () {
    function Persona() {
    }
    Persona.prototype.agregarDialogo = function (dialogo) {
        return { fecha: dialogo.fecha,
            numeroSecuencia: dialogo.numeroSecuencia,
            escrito: dialogo.escrito };
    };
    return Persona;
}());
exports.Persona = Persona;
