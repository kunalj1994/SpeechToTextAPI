'use strict';

var express = require('express');

var router = express.Router();
var multiparty = require('multiparty');

var azure = require('azure');

var csv = require('csvtojson');

var fs = require('fs');
var request = require('request');
/* GET home page. */
router.get('/analyze', function (req, res) {
    res.render('index.html');

});

router.get('/', function (req, res) {
    res.render('homePage.html');
});

router.post('/uploadFile', function (req, res) {
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, file) {
        var oldPath = file.file[0].path;
        var newPath = './recordings/' + file.file[0].originalFilename;

        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                throw err;
            }
            request('http://localhost:8080/convert', function (err, response, body) {
                if (err) {
                    console.log(err);
                } else {
                    res.end();
                }
            });
        });
    });

});

router.get('/predict', function(req, res){
    csv().fromFile('./predict.csv').then(function (jsonObj) {
        console.log(jsonObj);
        res.send(jsonObj);
    });
});

router.get('/fluency', function (req, res) {
    request('http://localhost:63445/api/Default', function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            var fluencyResult = [{
                name: 'AGESPV08_26465_PVBDLHWR',
                score: 134.557
                
            }];
            res.send(fluencyResult);
            // res.send(req.body);
        }
    });
});


router.get('/polarity', function (req, res) {
    request('http://localhost:64514/api/Default', function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            var polarityResult = [{
                    name: 'AGESPV08_26465_PVBDLHWR',
                    score: 0.948601246
                    
                },
                {
                    name: 'AGESPV08_26790_FPYPMHCW',
                    score: 0.5
                    
                },
                {
                    name: 'AGESPV08_26999_TFHCHYHT',
                    score: 0.847599149
                    
                },
                {
                    name: 'AGESPV08_805489_ZWWTGWRL',
                    score: 0.177802086
                    
                },
                {
                    name: 'AGESPV08_100082_BGYQNCLJ',
                    score: 0.727348328
                    
                },
                {
                    name: 'AGESPV08_25287_GJQCRTNM',
                    score: 0.98249948
                    
                },
                {
                    name: 'AGESPV08_26135_FQYFZYGW',
                    score: 0.104892522
                    
                },
                {
                    name: 'AGESPV08_100082_BGYQNCLJ',
                    score: 0.727348328
                    
                },
                {
                    name: 'AGESPV08_118872_RLHYNXJB',
                    score: 0.923097014
                    
                },
                {
                    name: 'AGESPV08_25287_GJQCRTNM',
                    score: 0.98249948
                    
                },
                {
                    name: 'AGESPV08_26135_FQYFZYGW',
                    score: 0.104892522
                    
                },
                {
                    name: 'AGESPV08_26180_LPMTJVJX',
                    score: 0.851419449
                    
                },
                {
                    name: 'AGESPV08_26181_LPMTJVJX',
                    score: 0.5

                }



            ];
            res.send(polarityResult);
            // res.send(req.body);
        }
    });
});

router.get('/grammar', function (req, res) {
    request('http://localhost:8000/trigger', function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            var grammarResult = [{
                    name: 'AGESPV08_26465_PVBDLHWR',
                    score: 0.847483584
                },
                {
                    name: 'AGESPV08_26790_FPYPMHCW',
                    score: 0.819548965
                },
                {
                    name: 'AGESPV08_26999_TFHCHYHT',
                    score: 0.843668389
                },
                {
                    name: 'AGESPV08_805489_ZWWTGWRL',
                    score: 0.893358158
                },
                {
                    name: 'AGESPV08_100082_BGYQNCLJ',
                    score: 0.890193747
                },
                {
                    name: 'AGESPV08_25287_GJQCRTNM',
                    score: 0.91895012
                },
                {
                    name: 'AGESPV08_26135_FQYFZYGW',
                    score: 0.855430501
                },
                {
                    name: 'AGESPV08_100082_BGYQNCLJ',
                    score: 0.890193747
                },
                {
                    name: 'AGESPV08_118872_RLHYNXJB',
                    score: 0.861343243
                },
                {
                    name: 'AGESPV08_25287_GJQCRTNM',
                    score: 0.918950127
                },
                {
                    name: 'AGESPV08_26135_FQYFZYGW',
                    score: 0.855430501
                },
                {
                    name: 'AGESPV08_26180_LPMTJVJX',
                    score: 0.794034089
                },
                {
                    name: 'AGESPV08_26181_LPMTJVJX',
                    score: 0.782109956
                }



            ];
            res.send(grammarResult);
            // res.send(req.body);
        }
    });
});

// console.log('convert=======');console.log(body);
// request('http://localhost:8000/trigger', function(err, response, body) {
//   if(err){
//     console.log('grammar======='); console.log(err);
//   }
//   else{
//     console.log('grammar=======');console.log(body);
//     request('http://localhost:64514/api/Default', function(err, response, body){
//       if(err){
//         console.log('polarity======='); console.log(err);
//       }
//       else{
//         console.log('polarity=======');console.log(body);
//         
//       }
//     });
//   }
// });


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