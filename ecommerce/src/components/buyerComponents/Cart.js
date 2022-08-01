import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "/home/kamali/react/ecommerce/src/styles/Cart.css";
import SellerNavBar from '../sellerComponents/SellerNavBar';

function Cart({handleChange, handleRemove, handleClear}) {
    // const cartProduct = async () => {
    //     await axios.get('http://localhost:7000/posts').then(res => console.log("CART DATA IS", res.data));
        
    // // }
    // console.log("CART", cart);
    // const result = Object.values(cart);
    // console.log("RESULT VALUE IS", result);

    const [cart, setCart] = useState([]);
    const [cartLength, setCartLength] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState();
    const [confirmOrder, setConfirmOrder] = useState(0);
    const isSeller = false;
    const isMenu = false;

    const handleBuyerSearch = (value) => {
      //console.log("in seracing the request", value);
      if(value) {
        return axios.get('http://localhost:9000/cart?prname_like=${s.trim()}')
      }
      else {
        //
      }
    }

    const handleConfirmOrder = (items) => {
      setConfirmOrder(1);
      //console.log("ITEM IN NADLE CONFIRM ORDER", items);
      let price = totalPrice;
      Object.values(items).map((item)=>{
        //console.log("EACH ITEM IN HANDLE CONFIRM ORDER", item);
        //console.log("PRICE IS", price, item.amount, item.quantity);
        //console.log("Before", totalPrice);
        price = price + item.amount*item.quantity;
        //console.log("ON CALCULATION", price);
        setTotalPrice(price);
        //console.log("After", totalPrice); 
      })
    }
  
    let navigate = useNavigate();
    const placeOrder = () => {
      toast.success("Order placed!", {autoClose:500});
      let path = '/buyerorder';
      axios.post('http://localhost:9000/orders', cart);
      navigate(path, {state: {items: cart, price: totalPrice}})
    }

    // const calculatePrice = (amount, quantity) => {
    //   let price = totalPrice;
    //   console.log("Before", totalPrice);
    //   price = price + amount*quantity;
    //   setTotalPrice(price);
    //   console.log("After", totalPrice); 

    // }
    const handleData = () => {
      //console.log("In handle data of a dashboard");
      axios.get('http://localhost:9000/cart').then((res)=>{
        //console.log("response data is", res, "res dataaaaaaa", res.data, "local data is", cart);
        setCart([res.data]);
        setCartLength(res.data.length);
        //console.log("CART LENGTH IS", cartLength);
        //console.log("after setvalue", cart);
      })
     
    } //useEffect
  
    useEffect(() => {
      //console.log('useEffect ran');
      handleData();
    },[quantity]);

  return (
    <div>
       {/* <SellerNavBar isSeller={isSeller} isMenu={isMenu} handleBuyerSearch={handleBuyerSearch} handleClear={handleClear} cart={cart} /> */}
        {cartLength ? 
        <div>
        {/* <div className='cart-header'>In your cart</div> */}
        {/* {cartProduct()} */}
        {Object.values(cart).map((item) => {
          //console.log("cart data is", cart, item);
            return (
              <div>
                {Object.values(item).map((items)=> {
                  //console.log("cart item in data is", items);
                  return (
                    <div className='cart-items'>
                      <tr key={items.id}>
                        <td>
                          <img src={items.image} style={{height: '6rem', width: '9rem'}} />
                        </td>
                        <td>{items.prname}</td>
                        <td>${items.amount}</td>
                        <td>Quantity ({items.quantity})</td>
                        <td>
                          <button className="cartbutton increment" onClick={() => handleChange(items, -1, setQuantity)}>-</button>
                          <button className="cartbutton increment" onClick={() => handleChange(items, 1, setQuantity)}>+</button>
                          <button className="cartbutton remove" onClick={() => handleRemove(items.id, setQuantity)}>Remove Item</button>
                        </td>
                      </tr>
                    </div>
                );
                })}
                <div>
                  <button className='clear cart' onClick={() => handleClear(item, setQuantity)}>Clear Cart</button>
                  <button className='confirm cart' onClick={() => handleConfirmOrder(item)}>Confirm Order</button>
                </div>
              </div>
              
              );
        })}
        </div> :
        <div>Your cart is empty</div>
      }
      {confirmOrder ? <div>
        Order Placed
        <div className="order-summary">
              <h2>Order Summary</h2>
              <table className=" summary table-borderless"> 
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((items) => {
                    //console.log("item", items);
                    return (
                      <div>
                        {items.map((item) => {
                          //console.log("In item is", item);
                          // calculatePrice(item.amount, item.quantity);
                          return (
                            <div>
                      <tr> 
                        <td>{item.prname}</td>
                        <td>{item.amount}</td>
                        <td>{item.quantity}</td>
                        <td>{item.amount * item.quantity}</td>
                      </tr>
                      </div>
                      );
                      })}
                      </div>
                    );
                  })}
                </tbody>
              </table>
              <hr></hr>
              <div>
                <div><h4 className="total">Subtotal</h4><span className="total value">${totalPrice}</span></div>
                <div><h4 className="delivery">Delivery charges</h4><span className="delivery value">$50</span></div>
              </div>
              <button onClick={() => placeOrder()}><h1>PLACE ORDER</h1></button>
            
            </div>
        </div> : ''}
        <ToastContainer/>

    </div>
  )
}

export default Cart