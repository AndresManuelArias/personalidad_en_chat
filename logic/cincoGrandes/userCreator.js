'use strict';
exports.__esModule = true;
var fs = require("fs");
// import * as Persona from './persona';
var Persona = require('./persona');
var persona = new Persona.Persona();
var archivo = fs.readFileSync('../base_data/Chat de WhatsApp con Ingeniería Zemla.txt', 'utf-8');
var usuarios = fs.readFileSync('../base_data/usuarios.txt', 'utf-8');
var infoUsuario = generarDialogosUsuarios(usuarios, archivo);
console.log(infoUsuario);
function generarDialogosUsuarios(usuarios, archivo) {
    var personas = {};
    var arrayUsuarios = usuarios.split('\n');
    var dialogos = archivo.split('\n');
    arrayUsuarios.forEach(function (usuario) {
        personas[usuario] = {};
        personas[usuario]['dialogos'] = [];
    });
    var _loop_1 = function (dialogo) {
        // console.log(dialogos[dialogo]);
        arrayUsuarios.forEach(function (usuario) {
            if (dialogos[dialogo].includes(usuario)) {
                var informacionUsuario = dialogos[dialogo].split(usuario);
                personas[usuario].dialogos.push(persona.agregarDialogo({ fecha: informacionUsuario[0],
                    numeroSecuencia: dialogo,
                    escrito: informacionUsuario[1] }));
            }
        });
    };
    for (var dialogo = 1; dialogo < dialogos.length; dialogo++) {
        _loop_1(dialogo);
    }
    return personas;
}
fs.writeFile('../base_data/infoUsuarios.json', JSON.stringify(infoUsuario), function (error) {
    if (error)
        console.log(error);
    else
        console.log('El archivo fue creado');
});
