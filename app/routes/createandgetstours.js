const _ = require('lodash');
const {Createorder} = require('./../models/createOrder');

module.exports=function(app)
{
      
     app.post('/createtour',(req,res)=>{
      var body = _.pick(req.body,['travellingagencyid','name','price','numberofdays','numberofnights','tourdetails','departurelocation','returnlocation','departuretime','email']);
      var tours = new Createtour(body);
      console.log(body.travellingagencyid);
   //   if(tours.travellingagencyid){
      tours.save().then((tour) => {
          console.log("tour");
          console.log(tour);
         res.send(tour);
      }).catch((e) => {  
        console.log(e);
        res.status(400).send("Tour is not added");
      });
    //    }
   });

   app.get('/gettourlist',(req,res)=>{
    var id = req.query.id;
  console.log(id);
    Createtour.find({}).then((tour) => {
       res.send(tour);
    }).catch((e) => {  
      console.log(e);
      res.status(400).send("Tour is Available");
    });
 });


//  app.get('/gettourlistbyid/:id',(req,res)=>{
//   // var id = req.query.id;
//   console.log(req.params.id);
//   Createtour.find({travellingagencyid: req.params.id}).then((tourlist) => {
//      res.send(tourlist);
//   }).catch((e) => {  
//     console.log(e);
//     res.status(400).send("No tour available is Available");
//   });
// });



// app.delete('/deletetour/:id',(req,res)=>{
// var tourid = req.params.id;
// //Tank.remove({ size: 'large' }
// Createtour.remove({_id: req.params.id}).then((deletedtour) => {
//   res.send(deletedtour);

// }).catch((e) => {  
//    console.log(e);
//    res.status(400).send(e);
//  });


// })
  


}