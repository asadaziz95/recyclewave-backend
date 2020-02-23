const _ = require("lodash");
const { User } = require("./../models/registerUser");

module.exports = function(app, database) {
  app.post("/user_signup", (req, res) => {
    console.log("in user_signup ");
    var body = _.pick(req.body, ["email", "password", "name","userType"]);
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
        res.status(400).send("User Already Exist");
      }
    });
  });
};
