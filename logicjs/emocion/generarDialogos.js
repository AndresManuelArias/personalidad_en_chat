"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerarDialogos = void 0;
class GenerarDialogos {
    constructor(dialogos) {
        dialogos = dialogos.replace(/<attached: /g, "<attached ");
        let dialogoUsuarios = dialogos.split(/\r\n\[/);
        dialogoUsuarios.splice(0, 1);
        this.dialogoUsuarios = dialogoUsuarios.map((dialogo, index) => this.descomponerDialogo(dialogo, index));
    }
    descomponerDialogo(dialogo, index) {
        var myRe = /\] [\W\w]*: /g;
        let myArray = myRe.exec(dialogo);
        console.log('myArray', myArray);
        let descompuesto = dialogo.split(myArray[0]);
        // console.log('descompuesto',descompuesto)
        let emocionPorDia = { fecha: descompuesto[0],
            usuario: myArray[0],
            dialogo: descompuesto[1],
            idSecuenciaDialogo: index,
            puntajeEmocion: '' };
        console.log("emocionPorDia", emocionPorDia);
        return emocionPorDia;
    }
    mostrarDialogos() {
        return this.dialogoUsuarios;
    }
    limpiarTexto(normasLimpieza) {
    }
}
exports.GenerarDialogos = GenerarDialogos;
//# sourceMappingURL=generarDialogos.js.map