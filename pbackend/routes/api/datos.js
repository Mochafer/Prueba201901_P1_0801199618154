var express = require('express');
var router = express.Router();
var fileModel = require('./jsonmodel');
var data = null;
var uuidv4 = require('uuid/v4');

var infor = {
    '_id':'',
    'empresa':'',
    'url':'',
    'nombre':'',
    'year':null,
    'rating':null,
    'date': null
};

//Obtener Datos De La Empresa
router.get('/', function(req, res, next){
    if(!data){
        fileModel.read(function(err,Filedata){
            if(err){
                console.log(err);
                return res.status(500).json({'error':'Error al obtener informacion'});
            }
            data = JSON.parse(Filedata);
            return res.status(200).json(data);
        });
    } else {
        return res.status(200).json(data);
    }
    res.json({"msg":"ok"});
}); //get 

router.post('/new', function(req,res,next){
    var informacion = Object.assign({}, infor, req.body);
    var fecha = new Date();
    informacion._id = uuidv4();
    informacion.date = fecha;
       if(!data){
        data = [];
    }
    data.push(informacion)
    fileModel.write(data,function(err){
        if(err){
            console.log(err);
            return res.status(500).json({'error':'fallecio'});   
        }
         res.status(200).json(informacion);
    });
   
}); //nuevo dato ingresado

module.exports = router;