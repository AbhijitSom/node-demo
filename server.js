var express = require('express');
//var fileUpload = require('fileupload');
//  var bodyParser = require('body-parser');
//var multer = require('multer');

var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('employeelist', ['employeelist']);
app.use(express.static(__dirname + "/public1"));
app.use(bodyParser.json());
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var multer = require('multer');

var storage = multer.diskStorage({//multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var upload = multer({//multer settings
    storage: storage,
    fileFilter: function (req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');
app.get('/employeelist', function (req, res) {

    console.log("getting Get request");


    db.employeelist.find(req.body,function (err, docs)
    {
        console.log(docs);
        res.json(docs);
    });
});
app.post('/employeelist', function (req, res) {
    console.log(req.body);
    req.body.doj = new Date(req.body.doj);
    console.log(":::::::::::::::::::::::::::::::::::::::"+JSON.stringify(req.body));
    db.employeelist.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});
app.delete('/employeelist/:id', function (req, res)
{
    var id = req.params.id;
    console.log(id);
    db.employeelist.remove({_id: mongojs.ObjectId(id)}, function (err, doc)
    {
        res.json(doc);
    });
});
app.get('/employeelist/:id', function (req, res)
{
    var id = req.params.id;
    console.log(id);
    db.employeelist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc)
    {
        res.json(doc);
    });
});
app.put('/employeelist/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.employeelist.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {empid: req.body.empid, empname: req.body.empname, salary: req.body.salary,doj:new Date(req.body.doj)}},
        new : true}, function (err, doc) {
        res.json(doc);
    }
    );
});
app.post('/employeelistsearch', function (req, res)
{
    console.log("inside server>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    //  console.log(req.body);
    console.log("this is req.body>>>>>>>>>>>>>>>>>>>" + JSON.stringify(req.body));

    db.employeelist.find({empname: {'$regex': req.body.name}}, function (err, docs)
    {

        console.log(docs);
        res.json(docs);
    });
});
//app.post('/employeecount', function (req, res)
//{
//    console.log("inside server to count the number of employee>>>>" + JSON.stringify(req.body));
//    db.employeelist.find({day: req.body.countempd, month: req.body.countempm, year: req.body.countempy}, function (err, doc)
//    {
//        console.log(doc);
//        res.json(doc);
//    });
//});
//app.post('/employeesalary', function (req, res)
//{
//    console.log("inside the server ....got values" + JSON.stringify(req.body));
//    console.log("sending data....");
//    // res.end(res);
//// res.send(req.body);
//    console.log("data sent...");
//    db.employeelist.find({"month": {$gt: req.body.sfrom, $lt: req.body.sto}}, function (err, doc)
//    {
//        console.log(doc);
//        res.json(doc);
//    });
//
//});
app.post('/employeecount3',function(req,res)
{
    console.log("<><><><><><><><><><><><><><>"+req.body.cfrom);
        console.log("this is req.body>>>>>>>>>>>>>>>>>>>" + JSON.stringify(req.body));
db.employeelist.find({"doj":{$gt : new Date(req.body.cfrom)}},function(err,doc)

    
{
        console.log(doc);
        res.json(doc);}
);
});

//app.post('/employeesalarydemo',function(req,res) {"$gt": req.body.cfrom}
//{
//    console.log("inside the server ....got values");db.employeelist.find({"doj" : {"$gt": new Date(req.body.cfrom)}},function(err,doc)

//    console.log("sending data....");
//    // res.end(res);
//// res.send(req.body);
// console.log("data sent...");
// console.log(req.body);
// //db.employeelist.find({"month":{$gt:req.body.sfrom,$lt:req.body.sto}},function(err,doc)
// //{
//     //console.log(doc);
//// });//
//
//});
app.post('/upload', function (req, res) {
    var exceltojson;
    upload(req, res, function (err) {
        if (err) {
            res.json({error_code: 1, err_desc: err});
            return;
        }
        /** Multer gives us file info in req.file object */
        if (!req.file) {
            res.json({error_code: 1, err_desc: "No file passed"});
            return;
        }
        /** Check the extension of the incoming file and 
         *  use the appropriate module
         */
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders: true
            }, function (err, result) {

                var temp1 = result;

                if (err) {
                    return res.json({error_code: 1, err_desc: err, data: null});
                }

                   db.employeelist.insert(temp1, function (err, doc) {
        res.json(doc);
    });
                res.json({error_code: 0, err_desc: null, data: result});

            });
        } catch (e) {
            res.json({error_code: 1, err_desc: "Corupted excel file"});
        }
    })
});
app.listen(8080);

console.log("server running at port 8080");