'use strict';
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
    var blobService = azure.createBlobService();
    var form = new multiparty.Form();

    form.on('part', function(part) {
        
        if (part.filename) {
            var filename = part.filename;
            var size = part.byteCount;
            var onError = function(error) {
                if(error) {
                    res.send({ grrr: error });
                }
            };
            blobService.createBlockBlobFromStream('audiofiles', filename, part, size, onError);
        } else {
            form.handlePart(part);
        }
    });

    form.parse(req);
    
		blobService.getBlobToText('audiofiles', 'mlPredictionModel.csv', function(error, text) {
			if (!error) {
				// blob retrieved
				csv().fromString(text).then((jsonObj) => {
					res.send(jsonObj);
				});
			}
		});
    
    
    
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
// 	var blobService = azure.createBlobService();
	
	
// });
module.exports = router;
