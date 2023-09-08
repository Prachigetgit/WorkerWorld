import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import '../styles/CartStyles.css';

const CartPage = () => {
  const [auth,setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
 const [clientToken, setClientToken] = useState("");
 const [instance, setInstance] = useState("");
 const [loading, setloading] = useState(false); 
 
 //total price
 const totalPrice = () => {
  try {
     let total = 0;
     cart?.map((item) => { 
      total = total + item.price;
     });
     return total.toLocaleString("en-US", {
      style:"currency",
      currency : "USD",
     });
  } catch (error) {
     console.log(error);
  }
 };
 //delete item
 const removeCartItem = (sid) => {
  try {
     let myCart = [...cart]
     let index = myCart.findIndex(Item => Item._id === sid)
     myCart.splice(index, 1)
     setCart(myCart);
     localStorage.setItem("cart", JSON.stringify(myCart));
  } catch (error) {
     console.log(error);
  }
 }

 //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get('/api/v1/service/braintree/token');
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getToken();

  },[auth?.token]);

 //handle payments
 const handlePayment = async () => {
  try {
    setloading(true);
    const { nonce } = await instance.requestPaymentMethod();
   const {data} = await axios.post('/api/v1/service/braintree/payment',{
     nonce,
     cart,
   });
   setloading(false);
   localStorage.removeItem('cart');
   setCart([]);
   navigate('/dashboard/user/bookings')
   toast.success('Payment Completed Successfully')
  } catch (error) {
    console.log(error)
    setloading(false);
  }
 }

  return (
    <Layout>
        <div className='cart-page'>
            <div className='row'>
                <div className='col-md-12'>
                  <h1 className='text-center bg-light p-2 mb-1'>
                    {!auth?.user
                    ? "Hello Guest" : `Hello ${auth?.token &&  auth?.user?.name}`}
                  
                  <p className='text-center'>
                    {cart?.length  ? 
                    `You have ${cart.length} items in your cart ${auth?.token ?  "" 
                     : "Please login to checkout"}`
                     : "Your cart is empty"}
                  </p>
                  </h1>
                </div>
            </div>
            <div className='container'>
            <div className='row '>
              <div className='col-md-7 p-0 m-0'>
                {
                  cart?.map(s => (
                    <div className='row  card flex-row m-3' key={s._id}>
                    <div className='col-md-4'>
                    <img src={`/api/v1/service/service-photo/${s._id}`} 
                     className ="card-img-top"
                      alt={s.name} />
                    </div>
                    <div className='col-md-4'>
                      <p>{s.name}</p>
                      <p>{s.description.substring(0, 30)}</p>
                      <p>Price: {s.price}</p>

                    </div>
                    <div className='col-md-4 cart-remove-btn'>
                    <button className='btn btn-danger ' onClick={() => removeCartItem(s._id) }>Remove</button>
                    </div> 
                    </div>
                  ))
                }
              </div>
              <div className='col-md-5 cart-summary'>
               <h2> cart Summary</h2>
               <p>Total | Checkout | Payment</p>
               <hr />
               <h4>Total: {totalPrice()} </h4>
                {auth?.user?.address ? (
                  <>
                  <div className='mb-3'>
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button className='btn btn-outline-warning'
                  onClick={() => navigate('/dashboard/user/profile')}
                  >Update Address</button>
                  </div>
                  </>
                ) : (
                  <div className='mb-3'> 
                  {
                    auth?.token ? (
                      <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}> Update address</button>
                    ) : (
                      <button 
                      className='btn btn-outline-warning' 
                      onClick={() => 
                      navigate('/login',{
                          state: "/cart",
                      } )}>Please login to checkout</button>
                    )
                  }
                  </div>
                )}
                <div className='mt-2'>
                {!clientToken || !auth?.token || !cart?.length ? ("") : (
                    <>
                    <DropIn
                        options={{
                         authorization: clientToken,
                         paypal:{
                           flow:'vault',
                         },
                       }}
                        onInstance={(instance) => setInstance(instance)}
                     />
                     <button className='btn btn-primary' onClick={handlePayment} 
                     disabled={loading || !instance || !auth?.user?.address}
                     >
                     {loading ? "Processing...." : "Make Payment"}
                     </button>
                    </>
                  )
                }
                </div>
                </div>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage;