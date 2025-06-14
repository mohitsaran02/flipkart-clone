import express from  'express';
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
// import { addItemInCart } from '../controller/cart-controller.js';
import { addPaymentGateway, paymentResponse } from '../controller/payment-controller.js';
import payment from '../routes/payment.js'

const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

router.get('/', (req, res) => {
    res.send('Razorpay Payment Gateway Using React And Node Js ')
})

router.get('/api/payment', payment);

// router.post('/cart/add', addItemInCart);

router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);

export default router;