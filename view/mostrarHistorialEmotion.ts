

interface EsqueletoHTML {
    title:string,
    body:string,
    script:string
}
interface ScorePerson{
    name:string,
    score:number
}[]
interface EmotionDate{
    scorePersons:ScorePerson[],
    date:string
}[]
interface LineData{
    label:string,
    borderColor:string,
    backgroundColor:string,
    data:number[],
    fill:boolean,
    lineTension:number
}
function dataLines(emotionDate:EmotionDate[]):string{
    
    let datasetsLine:LineData[] = [];
    let labelsDate:string[]=[];
    let usersLabel:Map<string,number[]> = new Map() ;

    emotionDate.forEach(info => {
        labelsDate.push(info.date);
        info.scorePersons.forEach(data =>{
           let arrayScore = usersLabel.get(data.name) == undefined?[]:usersLabel.get(data.name);
           arrayScore.push(data.score);
           usersLabel.set(data.name,arrayScore);
        });
    });
    let indexAxis = 1;
    usersLabel.forEach((data,key) =>{      
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        datasetsLine.push({    label:key,
            borderColor:`#${randomColor}`,
            backgroundColor:`#${randomColor}`,
            data:data,
            fill:false,
            lineTension:0.1});
    });
    return  `{
        labels: ${JSON.stringify(labelsDate)},
        datasets: ${JSON.stringify(datasetsLine)}
    }`;
}
function graficaLine(linesData:string):string {
   return  `
        var ctx = document.getElementById('canvas').getContext('2d');
        window.myLine = Chart.Line(ctx, {
            data: ${linesData},
            options: {
                responsive: true,
                hoverMode: 'index',
                stacked: false,
                title: {
                    display: true,
                    text: 'Emocion en chat'
                },
                scales: {
                    yAxes: [{
                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                    }, {
                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',

                        // grid line settings
                        gridLines: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    }],
                }
            }
        });`
} 
function graficaCompleta(emotionDate:EmotionDate[]):string{   
   return graficaLine(dataLines(emotionDate));
}

module.exports. graficaCompleta = graficaCompleta
function encapsularHTML(esqueletoHTML:EsqueletoHTML):string{
    return `
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">              
    <title>
        ${esqueletoHTML.title}
    </title>
</head> 
<body>     
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>          
    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>   
    <script src="http://www.chartjs.org/dist/2.7.1/Chart.bundle.js"></script>   
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>                   
    <h1> ${esqueletoHTML.title} </h1>
            ${esqueletoHTML.body} 

    <script>${esqueletoHTML.script} </script>
</body>    
</html>  `;
}
module.exports.encapsularHTML = encapsularHTML;
