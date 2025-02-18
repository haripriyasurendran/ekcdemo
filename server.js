const express=require("express")
const mongoose=require("mongoose")
const products=require("./models/products")

const app=express()
app.use(express.json())

//DB Connection
try
{
mongoose.connect("mongodb://localhost:27017/productsdb2")
}
catch(err)
{
    console.log(err.message);
}

app.post("/products",async (req,res)=>
    {
        if(req.body)
        {
            const newprod=new products(req.body)
            await newprod.save()
            res.send("<h1>The product is saved successfully</h1>")
        }            
        else
        {
            res.send("<h1>Please share product details")
        }
    })
app.get("/products",async (req,res)=>
        {
            const result=await products.find({})
            res.send(result)
        })
        
app.delete("/products/:id",async (req,res)=>
            {
                await products.findOneAndDelete({"prodid":req.params.id})
                res.send("<h1>Product deleted</h1>")
            })

app.listen(3800,()=>console.log("api server running on PORT 3800"))
