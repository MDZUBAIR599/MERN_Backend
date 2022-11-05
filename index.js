const express = require("express");
const { connection } = require("./Config/db.js");


const { UserModel } = require("./Models/UserModel.js");

require("dotenv").config()

const bcrypt = require("bcrypt")
const app = express();
const jwt = require("jsonwebtoken");
const { Authentication } = require("./Midlewares/Authentication.js");
// const { BMI_Model } = require("./Models/BMI_Model.js");
const cors = require("cors");
const { ProductRouter } = require("./Routers/Products_Router.js");
app.use(express.json());
app.use(cors())


const PORT= process.env.PORT||7000

app.use("/FlipKart", ProductRouter)

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const isuser = await UserModel.findOne({ email: email });
  if (isuser) {
    res.send({"msg":"try login"});
  }
  else{
    bcrypt.hash(password, 5, async function (err, hashedpas) {
      if (err) {
        res.send({"msg":"something went wrong"});
      }
      const newuser = new UserModel({
        username,
        email,
        password: hashedpas,
      });

      try {
        await newuser.save();
        res.send({"msg":"signup sucessfull"});
      } catch (err) {
        res.send({"msg":"error in signup"});
      }
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hashedpassword = user.password;
  const user_id = user._id;
  console.log(user_id);
  bcrypt.compare(password, hashedpassword, function (err, result) {
    if (err) {
      res.send({"msg":"something wrong please login again"});
    }
    if (result) {
      const token = jwt.sign({ user_id }, process.env.SECRETKEY);
      // console.log(token)
      res.send({ msg: "login sucessfll", token });
    } else {
      res.send({"msg":"please check credentials"});
    }
  });
});


app.listen(PORT, async () => {
  await connection;
  try {
    console.log("connected to db");
  } catch (err) {
    console.log(err, "error in db");
  }
  console.log(`started server on ${PORT}`);
});
