var productService =  require('./../services/ProductService')

const handle = function(func,httpErrorCode)
{
    return async function(req,res,next)
    {
        try
        {
            func(req,res,next).catch(err=> {
                return res.status(httpErrorCode).json({message: err})
            });
        }catch (err)
        {
            console.log("Error is ",err);
            await res.status(httpErrorCode).json({message: err})
        }
    }

}
async function getAllProductHandler(req,res,next)
{
    const products = await productService.getAllProduct();
    if(!products) throw Error('No products');
    await res.status(200).json(products);
}



const getAllProduct = async function (req, res, next) {
    console.log('Product controller user ',req.user);

    await handle(getAllProductHandler,400)
    (req,res,next);

}
async function getProductByIdHandler(req,res,next)
{
    let productId = req.params['productId'];
    console.log('Req product Id ', productId);
    const products = await productService.getProductById(productId);
    if(!products) throw Error('No product found');
    await res.status(200).json(products);

}

const getProductById = async function (req,res,next)
{
    await handle(getProductByIdHandler,404)
    (req,res,next);
}

const findProductByName = async function (req,res,next)
{
    let name = req.params['name'];
    try {
        const products = await productService.searchProductByName(name);
        if(!products) throw Error('No products found');
        await res.status(200).json(products);

    }catch(err)
    {
        await res.status(404).json({message: err})
    }
}

const newProduct = async function(req,res,next)
{
    console.log("new product ",req.body);
    try {
        const product = await productService.newProduct(req.body);
        if(!product) throw Error('Cannot save product');
        await res.status(201).json(product);

    }catch(err)
    {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

const updateProduct = async function (req,res,next)
{
    let productId = req.params['productId'];
    let product = req.body;
    console.log(`new product ${productId} `,req.body);
    try {
        const updateProduct = await productService.updateProduct(productId,product);
        if(!updateProduct) throw Error('Cannot update product');
        await res.status(200).json(updateProduct);

    }catch(err)
    {
        await res.status(400).json({message: err})
    }
}
const deleteProduct = async (req,res,next)=>{
    let productId = req.params['productId'];
    try {
        const deletedProduct = await productService.deleteProduct(productId);
        if(!deletedProduct) throw Error('Cannot delete product');
        await res.status(200).json(deletedProduct);

    }catch(err)
    {
        await res.status(400).json({message: err})
    }
}

module.exports = {
    getAllProduct,
    getProductById,
    findProductByName,
    newProduct,
    updateProduct,
    deleteProduct,
}
