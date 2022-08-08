import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import "./assests/Styles/Cart.css";
import DataNav from "./DataNav";
import PlaceOrder from "./PlacedOrder";
import { useNavigate } from "react-router-dom";

const Cart = ({cart, price, handleChange, handleClear, handlePrice, handleRemove}) => {
   const { 
  //   isEmpty,
  //   totalUniqueItems,
  //    items,
  //   totalItems,
  //   cartTotal,
  //   updateItemQuantity,
  //   removeItem,
  //   emptyCart 
   } = useCart();
  // console.log("ITEM VALUE IS ", items)
  // const [show, setShow] = useState(false);
  //console.log("CART DATA IS ", cart)
  // const [price, setPrice] = useState(0);

  // const handleRemove = (id) => {
  //   console.log("Removing id", id);
  //   console.log("dataaaaaaaa", cart);
  //   const arr = cart.filter((item) => 
  //     item.id != id
  //   );
  //   console.log("removing array item is ", arr)
  //   setCart(arr);
  //   handlePrice();
  // };

  // const handlePrice = () => {
  //   let ans = 0;
  //   Object.keys(cart).map((item) => (ans += item.quantity * item.price));
  //   setPrice(ans);
  // };

  // useEffect(() => {
  //   handlePrice();
  // });

  let navigate = useNavigate(); //use redirect
    const routeChange = () =>{ 
      let path = `/placeorder`; 
      navigate(path, {state: {items: cart, price: handlePrice, quantity: cart.total}});
  }
 
  const result = Object.values(cart);
  //console.log("RESULT IS ", result, result[0]);
  if (cart.length == 0) return <h1 className="food-list"><DataNav />Your cart is empty!</h1>

  return (
    <div> <DataNav total={cart.length} handleClear={handleClear}/>
    {console.log("cart length",cart.length)}
      <div className="food-list">
        <h2 className="cart-header">In Your Cart ({cart.length})</h2>
        <table className="table" style={{width: '1500px'}}>
          <tbody>
            {result.map((item) => {
              return (
                <div>
                <tr key={item.id}>
                  <td>
                    <img src={item.img} style={{height: '6rem', width: '9rem'}} />
                  </td>
                  <td>{item.itemName}</td>
                  <td>${item.price}</td>
                  <td>Quantity ({item.quantity})</td>
                  <td>
                    <button className="cartbutton" onClick={() => handleChange(item, -1)}>-</button>
                    <button className="cartbutton" onClick={() => handleChange(item, 1)}>+</button>
                    <button className="cartbutton remove" onClick={() => handleRemove(item.id)}>Remove Item</button>
                  </td>
                </tr>
                </div>
              );
            })} 
          </tbody>
        </table>
        <div className="footerdiv">
          <span className="span">
            <h2 className="footer">Total Price: ${price}</h2>
            <button className="footer remove cartbutton" onClick={() => handleClear()}>Clear Cart</button>
            <button className="footer place-order cartbutton" onClick={ ()=> routeChange()}>Place Order</button>
            
          </span>
        </div>
      </div>
    </div>
  );
}

export default Cart;