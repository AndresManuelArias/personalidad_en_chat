'use strict'

const count2Word = require('count2word');
const GenerarDialogos = require('./generarDialogos');
const UsuariosMensajes = require('./usuariosMensajes');
const DiasMensajes = require('./diasMensajes');

//

function generarArchivos(archivo:string):any[]{
let dialogosGenerados = new GenerarDialogos.GenerarDialogos(archivo);

  let usuariosMensajes = new UsuariosMensajes.UsuariosMensajes(dialogosGenerados.mostrarDialogos());
  let diasMensajes = new DiasMensajes.DiasMensajes(dialogosGenerados.mostrarDialogos());
  
  let textoCompletoChat = "";
  dialogosGenerados.mostrarDialogos().forEach(element => {
    textoCompletoChat += " "+element.dialogo;
  });
  // console.log(textoCompletoChat);
  let cloudWord =  count2Word(textoCompletoChat);
  
  let csvCloudWord = "palabra,puntaje\n";
  
  for( let word in cloudWord){
    console.log(`${word},${cloudWord[word]}\n`)
      csvCloudWord += `${word},${cloudWord[word]}\n`;
  } 
  
  return [
    {name:'mensajesPorDias.json',text:JSON.stringify(diasMensajes.diasDelAnio)},
    {name:'nombreUsuarios.json',text:JSON.stringify(usuariosMensajes.nombresUsuarios)},
    {name:'mensajeUsuarios.json',text:JSON.stringify(usuariosMensajes.usuarios)},
    {name:'dialogos.json',text:JSON.stringify(dialogosGenerados.mostrarDialogos())},
    {name:'cvsWordCloud.csv',text:csvCloudWord}
  ]
}

module.exports. generarArchivos  = generarArchivos

