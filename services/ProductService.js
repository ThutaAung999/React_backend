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


/*********************/

const validateProduct = (product) => {
    let date = new Date();
    product.createdAt = date.toISOString();

    if (product.price) product.price = Number(product.price);

    let hasErrors = false;
    let errors = {};

    if (product.name.length < 2) {
        hasErrors = true;
        errors.name = "The name's length should be at least 2 characters";
    }

    if (product.brand.length < 2) {
        hasErrors = true;
        errors.brand = "The brand's length should be at least 2 characters";
    }

    if (product.category.length < 2) {
        hasErrors = true;
        errors.category = "The category's length should be at least 2 characters";
    }

    if (product.price <= 0) {
        hasErrors = true;
        errors.price = "The price is not valid";
    }

    if (product.description.length < 10) {
        hasErrors = true;
        errors.description = "The description's length should be at least 10 characters";
    }

    if (hasErrors) {
        return { error: errors, data: null };
    }

    return { error: null, data: product };
};

/*********************/


const newProduct = async(product)=>
{
    const newProduct = new Products(product);
    return newProduct.save();
}
/*

const newProduct = async(req,res)=>
{
    try {
        const product = new Products({
            name: req.body.name,
            brand: req.body.brand,
            category: req.body.category,
            price: Number(req.body.price),
            description: req.body.description,
            image: req.body.imageFileName
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
*/


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
    validateProduct
}
