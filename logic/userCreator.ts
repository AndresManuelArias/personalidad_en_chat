'use strict'

import * as fs from 'fs';
// import * as Persona from './persona';
const Persona = require('./persona')
let persona:any = new Persona.Persona();
let archivo = fs.readFileSync('../base_data/Chat de WhatsApp con Ingeniería Zemla.txt', 'utf-8');
let usuarios = fs.readFileSync('../base_data/usuarios.txt', 'utf-8');
let infoUsuario = generarDialogosUsuarios(usuarios,archivo);
console.log(infoUsuario);
function generarDialogosUsuarios(usuarios:string,archivo:string):any {
    const personas = {};
    let arrayUsuarios:any[] = usuarios.split('\n');
    let dialogos :any[] = archivo.split('\n');
    arrayUsuarios.forEach((usuario)=>{
        personas[usuario] = {};
        personas[usuario]['dialogos'] = [];
    })
    for(let dialogo:number=1;dialogo < dialogos.length;dialogo++){
        // console.log(dialogos[dialogo]);
        arrayUsuarios.forEach((usuario)=>{
            if(dialogos[dialogo].includes(usuario)){
                let informacionUsuario:any = dialogos[dialogo].split(usuario);
                personas[usuario].dialogos.push( persona.agregarDialogo({fecha:informacionUsuario[0],
                    numeroSecuencia:dialogo,
                    escrito:informacionUsuario[1]}));
            }
        })

    }  
    return personas;
}


fs.writeFile('../base_data/infoUsuarios.json',JSON.stringify(infoUsuario), error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });