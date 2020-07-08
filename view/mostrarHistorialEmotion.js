[];
[];
function dataLines(emotionDate) {
    var datasetsLine = [];
    var labelsDate = [];
    var usersLabel = new Map();
    emotionDate.forEach(function (info) {
        labelsDate.push(info.date);
        info.scorePersons.forEach(function (data) {
            var arrayScore = usersLabel.get(data.name) == undefined ? [] : usersLabel.get(data.name);
            arrayScore.push(data.score);
            usersLabel.set(data.name, arrayScore);
        });
    });
    var indexAxis = 1;
    usersLabel.forEach(function (data, key) {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        datasetsLine.push({ label: key, borderColor: "#" + randomColor,
            backgroundColor: "#" + randomColor, data: data,
            fill: false,
            lineTension: 0.1 });
    });
    return "{\n        labels: " + JSON.stringify(labelsDate) + ",\n        datasets: " + JSON.stringify(datasetsLine) + "\n    }";
}
function graficaLine(linesData) {
    return "\n        var ctx = document.getElementById('canvas').getContext('2d');\n        window.myLine = Chart.Line(ctx, {\n            data: " + linesData + ",\n            options: {\n                responsive: true,\n                hoverMode: 'index',\n                stacked: false,\n                title: {\n                    display: true,\n                    text: 'Emocion en chat'\n                },\n                scales: {\n                    yAxes: [{\n                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance\n                        display: true,\n                        position: 'left',\n                        id: 'y-axis-1',\n                    }, {\n                        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance\n                        display: true,\n                        position: 'right',\n                        id: 'y-axis-2',\n\n                        // grid line settings\n                        gridLines: {\n                            drawOnChartArea: false, // only want the grid lines for one axis to show up\n                        },\n                    }],\n                }\n            }\n        });";
}
function graficaCompleta(emotionDate) {
    return graficaLine(dataLines(emotionDate));
}
module.exports.graficaCompleta = graficaCompleta;
function encapsularHTML(esqueletoHTML) {
    return "\n<!DOCTYPE html>\n<head>\n    <meta charset=\"UTF-8\">\n    <!-- Latest compiled and minified CSS -->\n    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\">              \n    <title>\n        " + esqueletoHTML.title + "\n    </title>\n</head> \n<body>     \n    <!-- jQuery library -->\n    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>          \n    <!-- Latest compiled JavaScript -->\n    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script>   \n    <script src=\"http://www.chartjs.org/dist/2.7.1/Chart.bundle.js\"></script>   \n    <script src=\"https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js\"></script>                   \n    <h1> " + esqueletoHTML.title + " </h1>\n            " + esqueletoHTML.body + " \n\n    <script>" + esqueletoHTML.script + " </script>\n</body>    \n</html>  ";
}
module.exports.encapsularHTML = encapsularHTML;
