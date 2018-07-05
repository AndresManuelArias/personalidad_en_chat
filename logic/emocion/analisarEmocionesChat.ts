'use strict'

import * as fs from 'fs';
const GenerarDialogos = require('./generarDialogos');
const UsuariosMensajes = require('./usuariosMensajes');
const DiasMensajes = require('./diasMensajes');


let archivo = fs.readFileSync('../../base_data/Chat de WhatsApp con Ingeniería Zemla.txt', 'utf-8');
let dialogosGenerados = new GenerarDialogos.GenerarDialogos(archivo);
let usuariosMensajes = new UsuariosMensajes.UsuariosMensajes(dialogosGenerados.mostrarDialogos());
let diasMensajes = new DiasMensajes.DiasMensajes(dialogosGenerados.mostrarDialogos());


fs.writeFile('../../base_data/diasDeChat.json',JSON.stringify(diasMensajes.fechasDeDialogo), error => {
  if (error)
    console.log(error);
  else
    console.log(`El archivo fue creado diasDeChat`);
});
fs.writeFile('../../base_data/mensajesPorDias.json',JSON.stringify(diasMensajes.diasDelAnio), error => {
  if (error)
    console.log(error);
  else
    console.log(`El archivo fue creado mensajesPorDias`);
});

fs.writeFile('../../base_data/nombreUsuarios.json',JSON.stringify(usuariosMensajes.nombresUsuarios), error => {
  if (error)
    console.log(error);
  else
    console.log(`El archivo fue creado nombreUsuarios`);
});

fs.writeFile('../../base_data/mensajeUsuarios.json',JSON.stringify(usuariosMensajes.usuarios), error => {
  if (error)
    console.log(error);
  else
    console.log(`El archivo fue creado mensajeUsuarios`);
});

fs.writeFile('../../base_data/dialogos.json',JSON.stringify(dialogosGenerados.mostrarDialogos()), error => {
  if (error)
    console.log(error);
  else
    console.log('El archivo fue creado dialogos');
});
