var express = require('express');
var app = express();
var router = express.Router();
var config = require('../../config');

app.set('secret', config.secret);
app.set('tokenDuration', config.tokenDuration);

router.get('/', function(req, res){
    res.json({message: 'hi'});
});

var housing = require('./api/housing');

router.use('/housing', housing);

module.exports = router;
