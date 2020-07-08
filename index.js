const fs = require('fs'),
csvdata = require('csvdata');
const mostrarHistorialEmotion = require('./view/mostrarHistorialEmotion')

const analisarEmocionesChat = require('./logicjs/emocion/analisarEmocionesChat')
const readWordAnalityEmotion = require('./logicjs/emocion/readWordAnalityEmotion')
let filenames = fs.readdirSync("base_data/chat"); 
  
console.log("\nCurrent directory filenames:"); 
filenames.forEach(file => { 
    console.log(file); 
    let archivo = fs.readFileSync(`base_data/chat/${file}/_chat.txt`, 'utf-8');

    analisarEmocionesChat.generarArchivos(archivo).forEach((value)=>{
        fs.writeFileSync(`base_data/${value.name}`,value.text);
        console.log(`El archivo fue creado ${value.name}`);
    });
            
    let personas = JSON.parse(fs.readFileSync('base_data/nombreUsuarios.json', 'utf-8'));
    let mensajesPorDias = JSON.parse(fs.readFileSync('base_data/mensajesPorDias.json', 'utf-8'));

    csvdata.load('base_data/valoracion palabras - calificacion.csv',{
        delimiter: ',',
        encoding: 'utf8',
        log: true,
        objName: false,
        parse: true,
        stream: false
    }).then(data=>{   
        let [emotionDate,coleccionPersona]=readWordAnalityEmotion.generarEmocionesDialogos(data,personas,mensajesPorDias)
        // fs.writeFileSync(`base_data/resultEmotionDate.json`,JSON.stringify(emotionDate));
        console.log(`El archivo fue creado resultEmotionDate`);
        let resultEmotionDate = emotionDate//JSON.parse(fs.readFileSync('base_data/resultEmotionDate.json', 'utf-8'));
        let htmlFile =mostrarHistorialEmotion.encapsularHTML({title:'Emociones chat',
        body:`<canvas id="canvas" width="441" height="220" class="chartjs-render-monitor" style="display: block; width: 441px; height: 220px;"></canvas>`,
        script:mostrarHistorialEmotion.graficaCompleta(resultEmotionDate)});
        fs.writeFile(`public/viewEmotionDate_${file}.html`,htmlFile, error => {
            if (error)
                console.log(error);
            else
                console.log(`El archivo fue creado viewEmotionDate`);
        });
        fs.writeFile(`base_data/promedioEmotionPalabras.json`,JSON.stringify(coleccionPersona['todos']), error => {
            if (error)
                console.log(error);
            else
                console.log(`El archivo fue creado promedioEmotionPalabras`);
        });
    });
});
