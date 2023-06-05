const bcrypt = require("bcrypt");
const Customer = require("../models/customer");

module.exports = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  Customer.findOne({ email }, (error, customer) => {
    if (customer) {
      bcrypt.compare(password, customer.password, (error, rightData) => {
        if (rightData) {
          req.session.userId = customer._id;
          req.session.user = customer;
          console.log(customer);
          res.json({ data: customer, code: 200 }); // Make sure to return the customer object instead of user
        } else {
          res.json({ error: "Invalid Password" });
        }
      });
    } else {
      res.json({ error: "No User Found" });
    }
  });
};
