const _ = require("lodash");
const { Transporter } = require("./../models/Transporter");
const { User } = require("./../models/User");

module.exports = function(app, database) {
  app.post("/transpoter_signup", (req, res) => {
    console.log("in transpoter_signup ");
    var body = _.pick(req.body, ["email", "password", "name","userType","adminId"]);
    console.log("trans body",body);
    var user = new User(body);

    User.findOne({ email: body.email }, function(err, data) {
      if (!data) {
        user
          .save()
          .then(rt => {
            return user.generateAuthToken();
          })
          .then(token => {
            res.send({ user: user, token: token });
          })
          .catch(e => {
            res.status(400).send(e);
          });
      } else {
        res.status(400).send("Transporter Already Exist");
      }
    });
  });



  app.get("/transporters/:id", (req, res) => {
    // var id = req.query.id;
    console.log("req.params.id",req.params.id);
    User.find({ adminId: req.params.id })
      .then(transporterlist => {
        //console.log("transporter list",transporterlist);
        res.send(transporterlist);
      })
      .catch(e => {
        console.log(e);
        res.status(400).send("No transporter is available");
      });
  });




};



