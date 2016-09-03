var path    = require('path');
var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var pokemon = require('pokemon');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/pokemon', function(req,res){
  var results = [];
  for (var i = 1; i < 152; i++){
    results.push({
      id: i, 
      name: pokemon.getName(i)
    });
  }
  res.send(results);
}); 
app.listen(port, function(){
  console.log('server listening on localhost:' + port);
});
