'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index.html');
});

router.post('/uploadFile', function (req, res) {
    console.log(req.files);
    res.end();
});

module.exports = router;
