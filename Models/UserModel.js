const mongoose = require("mongoose")


const userschema = new mongoose.Schema({
   username:{type: String, required:true},
   email:{type: String, required:true},
   password:{type: String, required:true},

})
const UserModel = mongoose.model("FlipkartUsers", userschema )

const cartschema = new mongoose.Schema({
   item:{type: String, required:true},
   price:{type: Number, required:true},
   qty:{type: Number, required:true},
})
const FlipkartModel = mongoose.model("Flipcartproducts", cartschema )


module.exports={UserModel,FlipkartModel}