const _ = require("lodash");
const { Createorder } = require("./../models/createOrder");

module.exports = function(app) {
  app.post("/createorder", (req, res) => {
    var body = _.pick(req.body, [
      "userId",
      "name",
      "type",
      "amount",
      "address",
      "email",
      "status"
    ]);
    var orders = new Createorder(body);
    //   if(orders.travellingagencyid){
    orders
      .save()
      .then(order => {
        console.log("order");
        console.log(order);
        res.send(order);
      })
      .catch(e => {
        console.log(e);
        res.status(400).send("Order is not added");
      });
    //    }
  });

  // app.get("/gettourlist", (req, res) => {
  //   var id = req.query.id;
  //   console.log(id);
  //   Createtour.find({})
  //     .then(tour => {
  //       res.send(tour);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       res.status(400).send("Tour is Available");
  //     });
  // });

  app.get("/orders/:id", (req, res) => {
    // var id = req.query.id;
    console.log("req.params.id",req.params.id);
    Createorder.find({ userId: req.params.id })
      .then(orderslist => {
        console.log(orderslist);
        res.send(orderslist);
      })
      .catch(e => {
        console.log(e);
        res.status(400).send("No order is available");
      });
  });

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
};
