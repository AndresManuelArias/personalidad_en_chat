"use strict";

const fs = require('fs'),Sentiment = require('sentiment'),
csvdata = require('csvdata');
let personas = JSON.parse(fs.readFileSync('../../base_data/nombreUsuarios.json', 'utf-8'));
let mensajesPorDias = JSON.parse(fs.readFileSync('../../base_data/mensajesPorDias.json', 'utf-8'));



interface palabra{
    palabra:string,
    persona:string,
    calificacion:number
}
interface ScorePerson{
    name:string,
    score:number
}[]
interface EmotionDate{
    scorePersons:ScorePerson[],
    date:string
}
class SentimentLenguajeNatural{
    private natural:any
    private Analyzer:any
    private stemmer:any  
    private analyzer:any
    private tokenizer:any
    constructor(){
        this.natural = require('natural');
        this.Analyzer = this.natural.SentimentAnalyzer;
        this.stemmer = this.natural.PorterStemmer;
        this.analyzer = new this.Analyzer("Spanish", this.stemmer, "afinn");
        this.tokenizer = new this.natural.WordTokenizer();
    }
    public calificacionLenguajeNatural(palabras:string):number{ 
    let words = this.tokenizer.tokenize(palabras);
    console.log(words);
    return this.analyzer.getSentiment(words);
    }
}
const sentimentLenguajeNatural = new SentimentLenguajeNatural();

function calificacionPalabrasPersona(datos:palabra[],persona:string):any{
   let completo = {};
    datos.forEach((data)=>{
        if(data.persona === persona){
            completo[data.palabra] = data.calificacion;
        }
    });
    return completo;
}
function calificacionPromedioPalabras(datos:palabra[]):any{

    interface Llevador{
        cuenta:number,
        suma:number,
        promedio: number
    }
    let completo: any= {}; 
    var contador:Map<string,Llevador> = new Map() ;
    datos.forEach((data)=>{
        let palabraBuscada:Llevador = contador.get(data.palabra);
        if( palabraBuscada !== undefined){
            palabraBuscada.cuenta++;
            palabraBuscada.suma += data.calificacion;
            palabraBuscada.promedio =palabraBuscada.suma /palabraBuscada.cuenta
            contador.set(data.palabra,palabraBuscada);
        }else{
            let llevador:Llevador = {cuenta:1,
            suma:data.calificacion,
            promedio:data.calificacion}
            contador.set(data.palabra,llevador);
            palabraBuscada = contador.get(data.palabra);
        }
        completo[data.palabra] = palabraBuscada.promedio;        
    });
    return completo;
}

function valoracionTexto(dataCalification1:Object){
    let  dataCalification = dataCalification1;
    return(texto:string):any=>{
        var variasCalificaciones = {};
        console.log('dataCalification',dataCalification);
        for (var persona in dataCalification) {
            
            var esLanguage = {
                labels: dataCalification[persona],
                scoringStrategy: {
                    apply: function (tokens, cursor, tokenScore) {
                        if (cursor > 0) {
                            var prevtoken = tokens[cursor - 1];
                            if (prevtoken === 'no') {
                                tokenScore = -tokenScore;
                            }
                        }
                        return tokenScore;
                    }
                }
            };
            // console.log("esLanguage",esLanguage)
            let sentiment = new Sentiment();
            sentiment.registerLanguage('es', esLanguage);
            variasCalificaciones[persona]= sentiment.analyze(texto, { language: 'es' });
        }
        return variasCalificaciones;
    }
}
csvdata.load('../../base_data/valoracion palabras - calificacion.csv',{
    delimiter: ',',
    encoding: 'utf8',
    log: true,
    objName: false,
    parse: true,
    stream: false
    }).then(data=>{   
       let coleccionPersona = {};
    personas.forEach((nombre)=>{
        coleccionPersona[nombre] =  calificacionPalabrasPersona(data,nombre);
    });
    coleccionPersona['todos'] = calificacionPromedioPalabras(data);
    // console.log(data);
    console.log(coleccionPersona);
    let trainOpinionPersona = valoracionTexto(coleccionPersona);
    let emotionDate:EmotionDate[]=[];
    for(let fecha in  mensajesPorDias){
        mensajesPorDias[fecha].dialogos;
        var results =  trainOpinionPersona(mensajesPorDias[fecha].dialogos);
        console.log( results);
        let scorePerson:ScorePerson[]=[];
        for(let person in results){
            scorePerson.push({name:person,score:results[person].score});
        }
        //aqui se va a colocar la opinion del sentimiento de las palabras de ese dia por otras apis
        scorePerson.push({name:'sentiment natural',score:sentimentLenguajeNatural.calificacionLenguajeNatural(mensajesPorDias[fecha].dialogos)});
        emotionDate.push({scorePersons:scorePerson,date:fecha});
    }
    fs.writeFile(`../../base_data/resultEmotionDate.json`,JSON.stringify(emotionDate), error => {
        if (error)
          console.log(error);
        else
          console.log(`El archivo fue creado resultEmotionDate`);
      });
      fs.writeFile(`../../base_data/promedioEmotionPalabras.json`,JSON.stringify(coleccionPersona['todos']), error => {
        if (error)
          console.log(error);
        else
          console.log(`El archivo fue creado promedioEmotionPalabras`);
      });
});