const _ = require('lodash');
const {Traveller} = require('./../models/travellersignup');
const {TravellingAgency} = require('./../models/travellingagencysignup')
const {PropertyLender} = require('./../models/propertylendersignup');
const multer = require('multer');
var cloudinary = require('cloudinary');
const upload = multer({
    dest: 'uploads/'
});

var fs = require('fs');

cloudinary.config({ 
    cloud_name: 'asadaziz', 
    api_key: '424826386583599', 
    api_secret: 'CNWFgEJuoKWFZDCGjAu7SUE-lJc' 
  });
  
  
  

module.exports = function (app, database) {


    app.get('/gettravellerbyid/:id', (req, res) => {
        Traveller.find({
            '_id': req.params.id
        }).then((traveller) => {
            res.send(traveller);
        }).catch((e) => {
            console.log(e);
            res.status(400).send("traveller");
        });

    });

    app.get('/gettravellers', (req, res) => {

        Traveller.find({}).then((travellers) => {
            res.send(travellers);
        }).catch((e) => {
            console.log(e);
            res.status(400).send("travellers list");
        });
    });

    app.get('/gettravellingagencybyid', (req, res) => {

    });

    app.get('/gettravellingagencies', (req, res) => {
        TravellingAgency.find({}).then((travellingagencies) => {
            res.send(travellingagencies);
        }).catch((e) => {
            console.log(e);
            res.status(400).send("travellingagencies list");
        });
    });

    app.get('/getpropertlenderbyid', (req, res) => {

    });

    app.get('/getpropertlenders', (req, res) => {
        PropertyLender.find({}).then((propertylender) => {
            res.send(propertylender)
        }).catch((e) => {
            console.log(e);
            res.status(400).send("propertylender list");
        });
    });


    app.post('/getimage', upload.any(), (req, res) => {

        console.log("req.files");
        console.log(req.files);
        //res.send(req.files);
        if (req.files) {
            req.files.forEach(function (file) {
              //  console.log(file)
                var filename = (new Date).valueOf() + "-" + file.originalname;
                fs.rename(file.path, 'public/images/' + filename, function (err) {
                    if (err) throw err;
                   //console.log('public/images/' +filename);
                    cloudinary.uploader.upload('public/images/' +filename, function(result) { 
                        console.log(result.url) 
                      });
                    console.log("File Uploded");
                })

            })
        }
    })


}