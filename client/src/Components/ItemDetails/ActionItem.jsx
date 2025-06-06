import { useState } from 'react';

import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm';
//import dotenv from 'dotenv';
import toast, { Toaster } from "react-hot-toast";

import { addToCart } from '../../redux/actions/cartActions';
import { getProductDetails } from '../../redux/actions/productActions';



const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px 20px',
    border: '1px solid #f0f0f0',
    width: '95%'
});

const StyledButton = styled(Button)`
    width: 46%;
    border-radius: 2px;
    height: 50px;
    color: #FFF;
`;

const ActionItem = ({ product }) => {

    
    // useEffect(() => {
    //     if(product && id !== product.id)   
    //         dispatch(getProductDetails(id));
    // }, [dispatch, product, id, loading]);

    const navigate = useNavigate();
    const { id } = product;
        
    const [quantity, setQuantity] = useState(1);
    const [amount, setamount] = useState(product.price.cost);
    const dispatch = useDispatch();

    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'codeforinterview01@gmail.com'});
        var information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response   
        }
        post(information);
    }




    // handlePayment Function
    const handlePayment = async () => {
        try {
            console.log("amount : ",amount);
            console.log("url : ",process.env.REACT_APP_BACKEND_HOST_URL);
            
            //console.log("key : ",process.env.REACT_APP_RAZORPAY_KEY_ID);
            
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/payment/order`, {
                
                
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    amount
                })
            });

            const data = await res.json();
            console.log(data);
            handlePaymentVerify(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    // handlePaymentVerify Function
    const handlePaymentVerify = async (data) => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Mohit Saran",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                    })

                    const verifyData = await res.json();

                    if (verifyData.message) {
                        toast.success(verifyData.message)
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }

    return (
        <LeftContainer>
            <Image src={product.detailUrl} /><br />
            <StyledButton onClick={() => addItemToCart()} style={{marginRight: 10, background: '#ff9f00'}} variant="contained"><Cart />Add to Cart</StyledButton>
            <StyledButton onClick={() => handlePayment()} style={{background: '#fb641b'}} variant="contained"><Flash /> Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;