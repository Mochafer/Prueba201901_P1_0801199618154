var express = require('express');
var router = express.Router();

var datosApi = require('./api/datos');

router.use('/datos', datosApi);

module.exports = router;