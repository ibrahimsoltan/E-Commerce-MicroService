const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");

// Put your origin here (What you see in the browser in the client side)
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

app.use(express.json());
app.use(cookieParser());
// This should be hidden in a .env file


  const DbURI = 'mongodb+srv://ibrahim:ibrahim1234@student.lmygtpz.mongodb.net/customersDB?retryWrites=true&w=majority'
  mongoose.connect(DbURI,
      { useNewUrlParser: true, useUnifiedTopology: true })
      .then(result => app.listen(PORT, () => {
          console.log(`server started on port ${PORT}`);
        }))
      .catch(err => console.log(err)
  )


app.use(
  expressSession({
    secret: "This should be a hidden secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: false,
        secure: false,
    },
    
    rolling: true,
  })
);

// app.get("/", async (req, res) => {
//   const notes = await Note.find();
//   res.json({ data: notes });
// });

// app.post("/add/", require("./controllers/addNote"));
// app.get("/notes/", require("./controllers/getAllNote"));
// app.get("/note/:id", require("./controllers/getNoteById"));
app.post("/signup", require("./controllers/signup"));
app.post("/signin", require("./controllers/signin"));
// app.get("/signout", require("./controllers/signout"));
app.post("/addToOrder", require("./controllers/addToOrder"));
app.get("/customerOrder", require("./controllers/getCustomerOrder"));
app.post("/completeOrder", require("./controllers/completeOrder"));
app.get("/oldOrders", require("./controllers/getOldOrders"));
app.get("/getAllProducts", require("./controllers/getAllProducts"));
app.get("/shippedOrders" , require("./controllers/getShippedOrders"))

const removeFromOrder = require("./controllers/removeFromOrder");

// Add the removeFromOrder route
app.delete("/removeFromOrder/:id", removeFromOrder);
app.get("/getAllCustomers", require("./controllers/getAllCustomers"));

app.post("/shipOrder", require("./controllers/shipOrder"));


