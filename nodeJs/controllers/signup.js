const Customer = require("../models/customer");
module.exports = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    req.session.userId = customer._id;

    res.json({ data: customer, code: 200 });
    //res.redirect("/")
  } catch (error) {
    //const validationError = Object.keys(error.errors).map(key => error.errors[key].message)
    //req.session.errors = validationError
    res.json({ error: error.message, code: 500 });
    //res.redirect("/signup")
  }
};
