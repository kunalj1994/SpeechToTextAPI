﻿'use strict';
var express = require('express');
var router = express.Router();
// var formidable = require('formidable');
var multiparty = require('multiparty');
var azure = require('azure');
var csv = require('csvtojson');
var fs = require('fs');
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index.html');
});

router.post('/uploadFile', function (req, res) {
    
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, file){
        console.log(file);
        console.log(oldPath);
        var oldPath = file.file[0].path;
        var newPath = './' + file.file[0].originalFilename;
        fs.rename(oldPath, newPath, function(err){
            if(err){
                throw err;
            }
            res.send("Uploaded");
        });
    });
    

    // var blobService = azure.createBlobService();

    // form.on('part', function(part) {
        
    //     if (part.filename) {
    //         var filename = part.filename;
    //         var size = part.byteCount;
    //         var onError = function(error) {
    //             if(error) {
    //                 res.send({ grrr: error });
    //             }
    //         };
    //         blobService.createBlockBlobFromStream('audiofiles', filename, part, size, onError);
    //     } else {
    //         form.handlePart(part);
    //     }
    // });

    // form.parse(req);
    
	// 	blobService.getBlobToText('audiofiles', 'mlPredictionModel.csv', function(error, text) {
	// 		if (!error) {
	// 			// blob retrieved
	// 			csv().fromString(text).then((jsonObj) => {
	// 				res.send(jsonObj);
	// 			});
	// 		}
	// 	});
    
    
    
    // var form = new formidable.IncomingForm();
    // form.parse(req, function (err, fields, files) {
    //   var oldPath = files.file.path;
    //   console.log(oldPath);
    //   var newPath = __dirname + files.file.name;
    //   console.log(newPath);
      
    //   fs.rename(oldPath, newPath, function(){
    //       if(err) throw err;
    //       res.end();
    //   });
    // });
    // console.log(req.files);
    // console.log(req.body);
});


// router.get('/getFile', function (req, res) {
//     console.log('here');
//     var py = require('python-shell');
//     var pathPy = __dirname + '\\sttClient.py';
//     console.log(pathPy);
    
//     py.run(pathPy, function(err, results){
//         if(err){
//             console.log(err);
//         }
//         console.log(results);
        
//         res.send("done");
//     });
    
//     // var pythonProcess = spawn('python.exe', ['sttClient.py']);
    
//     // pythonProcess.stdout.on('data', function(data) {
//     //     console.log('asasasa');
        
//     //     console.log(data);
        
//     // });
	
// });
module.exports = router;
