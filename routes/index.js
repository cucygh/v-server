var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer({
    dest: 'tmpupload/'
});
var fs = require('fs');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


// 上传文件
router.post('/upload', upload.any(), function (req, res, next) {
    var file = req.files[0];
    if (file) {
        fs.readFile(file.path, 'UTF-8', function (err, txt) {
            if (err) {
                return;
            } else {
                fs.writeFile('uploads/' + file.originalname, txt, function (err) {
                    if (err) {
                        throw err;
                    } else {
                        res.send('<script>window.top.onupload("' + file.originalname + '")</script>');
                    }
                });
            }
        });

    } else {
        res.send('<script>window.top.onupload("false")</script>');
    }
});

// 下载文件
router.get('/download/:name', function (req, res, next) {
    var fileName = req.params.name;
    res.download('uploads/' + fileName, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log('Sent:', fileName);
        }
    });
});


module.exports = router;
