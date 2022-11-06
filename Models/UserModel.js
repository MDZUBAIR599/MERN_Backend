const mongoose = require("mongoose")


const userschema = new mongoose.Schema({
   username:{type: String, required:true},
   email:{type: String, required:true},
   password:{type: String, required:true},

})
const UserModel = mongoose.model("FlipkartUsers", userschema )

const cartschema = new mongoose.Schema({
   image_url:{type:String },
   item:{type: String, required:true},
   price:{type: String, required:true},
   qty:{type: String, required:true},
   
})
const FlipkartModel = mongoose.model("cartproducts", cartschema )


module.exports={UserModel,FlipkartModel}