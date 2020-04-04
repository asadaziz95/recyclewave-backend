const _ = require("lodash");
const { Createorder } = require("./../models/createOrder");

module.exports = function (app) {
  app.post("/createorder", (req, res) => {
    console.log('reeeeee', req.body)
    var body = _.pick(req.body, [
      "userId",
      "name",
      "type",
      "amount",
      "address",
      "mobileno",
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




  app.post('/updateorder', (req, res) => {
    var body = _.pick(req.body, ['orderId', 'assigneeId']);
    console.log("While updateing order");
    console.log(body);
    Createorder.update({ _id: body.orderId }, { "assigneeId": body.assigneeId, "status": "assinged" }).then((updatedOrder) => {
      console.log(updatedOrder);
      res.send(updatedOrder);
    }).catch((e) => {
      res.status(400).send("Order Does Not Exist");
    });




  })



  app.get("/orders/:id/:type", (req, res) => {
    // var id = req.query.id;
    let userType = req.params.type;
    console.log("req.params.type", req.params.type);
    if (userType === 'admin') {
      Createorder.find({})
        .then(orderslist => {
          console.log("orderslistadmin", orderslist);
          res.send(orderslist);
        })
        .catch(e => {
          console.log(e);
          res.status(400).send("No order is available");
        });
    }
    else if(userType==='transporter') {
      Createorder.find({ assigneeId: req.params.id })
        .then(orderslist => {
          console.log("orderslist", orderslist);
          res.send(orderslist);
        })
        .catch(e => {
          console.log(e);
          res.status(400).send("No order is available");
        });
    }
    else {
      Createorder.find({ userId: req.params.id })
        .then(orderslist => {
          console.log("orderslist", orderslist);
          res.send(orderslist);
        })
        .catch(e => {
          console.log(e);
          res.status(400).send("No order is available");
        });
    }

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
