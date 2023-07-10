const mongoose= require('mongoose');
const ProductShema=mongoose.Schema(
{
    name:{
        type: String,
        required: [true,'product name is required']

    },
    description:{
        type: String,
        required:true,
        default: 'Product is available in our ecommerse applicationb'
    },
    price:{
        type:Number,
        required:true,
    },
    status:{
         type:String,
         required:true,
         default: 'Available'
    },
    image:{
        type:String,
        required:true
    }
    
},{
    timestamps:true,
}
)
const product=mongoose.model('Product',ProductShema);
module.exports=product;