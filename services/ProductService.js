let Products = require('../model/Product');

const getAllProduct = async ()=>
{
    return Products.find();
};

const getProductById= async (productId)=>{
    return Products.findById(productId);
}

const searchProductByName = async(productName)=>
{
    const products = await Products.find({
        name: {
            $regex:productName
        }
    });
    return  products;
}

const newProduct = async(product)=>
{
    const newProduct = new Products(product);
    return newProduct.save();
}

const updateProduct = async(productId,product)=>{
    const newProduct = await Products.findByIdAndUpdate(productId, product,{new: true});
    return newProduct;
}
const deleteProduct = async(productId)=>{
    const deletedProduct = await Products.findByIdAndDelete(productId);
    return deletedProduct;
}
module.exports = {
    getAllProduct,
    newProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProductByName,

}
