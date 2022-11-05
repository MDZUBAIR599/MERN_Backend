const {Router} = require("express");
const { Authentication } = require("../Midlewares/Authentication");
const { FlipkartModel } = require("../Models/UserModel");

const ProductRouter=Router()


// get All Products
ProductRouter.get("/", Authentication, async(req, res) => {
     

    const getAllproducts= await FlipkartModel.find({})

    res.send({getAllproducts})

    
});


// get  Products By id

ProductRouter.get("/:ProductId", Authentication, async (req, res) => {
       try{
        const singleproduct= await FlipkartModel.findById({_id:req.params.ProductId})
        if(singleproduct){
            res.send({msg:"singleproduct",singleproduct})
        }
        else{
            res.send({msg:"check id"})
        }
        
       }
       catch(err){
        res.status(400).send({ error: err  });
       }
});
ProductRouter.post("/create", Authentication, async(req, res) => {
    const  {item,price, qty, user_id}= req.body;
    const CreateProduct= new FlipkartModel({
          item,
          price,
          qty,
          user_id
          })
          await CreateProduct.save()
         res.send({message: "created" ,CreateProduct})
});


// update  Products By id
ProductRouter.put("/update/:ProductId", Authentication, async (req, res) => {

    const id = req.params.ProductId
    const body =req.body
     try{

        const findid= await FlipkartModel.findOne({_id:id})
        const updatedProduct = await FlipkartModel.findByIdAndUpdate(findid,req.body);
        res.send({ message: 'selected Product was updated' ,body});
     }
     catch(err){
        res.status(400).send({ error: err  });
     }

});


//delete product by id
ProductRouter.delete('/:ProductId', async (req, res) => {
    try {
        const id = req.params.ProductId
        const findid= await FlipkartModel.findOne({_id:id})
      const removeStudent = await FlipkartModel.findByIdAndRemove(findid);
       res.send({ message: 'The product was removed' });
    } catch(err) {
      res.status(400).send({ error: err });
    }
  });


ProductRouter.delete("/", (req, res) => {
    
});

module.exports={ProductRouter}



