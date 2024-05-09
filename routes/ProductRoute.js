let express = require('express');
let router = express.Router();
let products = require('./../controllers/ProductController');

router.get('/', products.getAllProduct);
router.get('/:productId', products.getProductById);
router.get('/name/:name',products.findProductByName);
router.post('/',products.newProduct);
router.put('/:productId',products.updateProduct);
router.delete('/:productId',products.deleteProduct);

module.exports = router;