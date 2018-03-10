var express = require('express'),
  app = express(),
  port = process.env.PORT || 3030,
  mongoose = require('mongoose'),
  NDC = require('./api/models/phoneNumberCheckModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/ndcdb');
mongoose.connect('mongodb://myUser:Itter@localhost:27017/ndcdb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/phoneNumberCheckRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('phoneNumberCheck listener port: ' + port);
