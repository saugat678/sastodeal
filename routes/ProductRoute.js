import express from 'express';
import { isAdmin,  requireSignIn } from '../middlewares/authMiddleware.js';
import { 
    braintreePaymentController,
     braintreeTokenController,
     createProductController, deletProductController, getProductController, 
    getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController 
} from '../controllers/ProductController.js';
import formidable from 'express-formidable';


const router = express.Router();
// Routes
router.post('/create-product', requireSignIn, isAdmin,
 formidable(), createProductController);
//  updated product
router.put('/update-product/:pid', requireSignIn, isAdmin,
 formidable(), updateProductController);
// get product
router.get('/get-product', getProductController);
// ingle product
router.get("/get-product/:slug", getSingleProductController);
// get photo
router.get('/product-photo/:pid', productPhotoController);

// delet product
router.delete('/delete-product/:pid',deletProductController);
// filter product
router.post('/product-filter', productFiltersController);
// product count
router.get('/product-count', productCountController);
// product list 
router.get('/product-list/:page',productListController);
// search product
router.get ('/search/:keyword',searchProductController);
// similar product
router.get ('/related-product/:Pid/:cid',relatedProductController);
// category wise product 
router.get('/product-category/:slug',productCategoryController);
// payments routes
router.get('/braintree/token',braintreeTokenController );
// payments
 router.post('/braintree/payment',requireSignIn,braintreePaymentController);


export default router;