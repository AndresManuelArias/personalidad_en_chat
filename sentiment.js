var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var result = sentiment.analyze('los gatos son estupidos.');
console.dir(result);    // Score: -2, Comparative: -0.666

var sentiment = require('multilang-sentiment');
 
var r1 = sentiment('los gatos son buenos!', 'es');
console.dir(r1);        // Score: -2, Comparative: -0.666
 
var r2 = sentiment('los gatos son bonitos!'); // "en" by default
console.dir(r2);    