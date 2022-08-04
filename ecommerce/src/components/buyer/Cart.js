import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/home/kamali/react/ecommerce/src/styles/Cart.css";
import NavBar from "../users/NavBar";

function Cart({ handleChange, handleRemove, handleClear }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState();
  const [confirmOrder, setConfirmOrder] = useState(0);
  const isSeller = false;
  const isMenu = false;

  const handleBuyerSearch = (value) => {
    if (value) {
      return axios.get("http://localhost:9000/cart?prname_like=${s.trim()}");
    } 
  };

  const handleConfirmOrder = (items) => {
    setConfirmOrder(1);
    let price = totalPrice;
    Object.values(items).map((item) => {
      price = price + item.amount * item.quantity;
      setTotalPrice(price);
    });
  };

  let navigate = useNavigate();
  const placeOrder = () => {
    toast.success("Order placed!", { autoClose: 500 });
    let path = "/buyerorder";
    axios.post("http://localhost:9000/orders", cart);
    setOrders(cart);
    navigate(path, { state: { items: cart, price: totalPrice } });
  };

  const calculatePrice = () => {
    let amnt = 0;
    axios.get("http://localhost:9000/cart").then((res) => {
      Object.values(res.data).map((item) => {
        amnt += item.quantity * item.amount;
      });
    });
  };

  const handleData = () => {
    axios.get("http://localhost:9000/cart").then((res) => {
      setCart([res.data]);
      setCartLength(res.data.length);
    });
    calculatePrice();
  }; 

  useEffect(() => {
    handleData();
  }, [quantity]);

  return (
    <div>
      <NavBar
        isSeller={isSeller}
        isMenu={isMenu}
        handleBuyerSearch={handleBuyerSearch}
        handleClear={handleClear}
        cart={cart}
      />
      {cartLength ? (
        <div>
          <h2 className="cart-header">In your cart ({cartLength})</h2>
          {Object.values(cart).map((item) => {
            return (
              <div>
                <table>
                  <tbody>
                    {Object.values(item).map((items) => {
                      return (
                        <div className="cart-items">
                          <tr key={items.id}>
                            <td>
                              <img
                                src={items.image}
                                style={{ height: "6rem", width: "9rem" }}
                              />
                            </td>
                            <td className="product-name">{items.prname}</td>
                            <td className="product-price">${items.amount * items.quantity}</td>
                            <td>Quantity ({items.quantity})</td>
                            <td>
                              <button
                                className="cartbutton increment"
                                onClick={() =>
                                  handleChange(items, -1, setQuantity, quantity)
                                }
                              >
                                -
                              </button>
                              <button
                                className="cartbutton increment"
                                onClick={() =>
                                  handleChange(items, 1, setQuantity, quantity)
                                }
                              >
                                +
                              </button>
                              <button
                                className="cartbutton remove"
                                onClick={() =>
                                  handleRemove(items.id, setQuantity)
                                }
                              >
                                Remove Item
                              </button>
                            </td>
                          </tr>
                        </div>
                      );
                    })}
                  </tbody>
                </table>
                <div>
                  <button
                    className="clear cart"
                    onClick={() => handleClear(item, setQuantity)}
                  >
                    Clear Cart
                  </button>
                  <button
                    className="confirm cart"
                    onClick={() => handleConfirmOrder(item)}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Your cart is empty</div>
      )}
      {confirmOrder ? (
        <div>
          <div className="order-summary">
            <h2>Order Summary</h2>
            <table className=" summary table-borderless">
              <tbody>
                {cart.map((items) => {
                  return (
                    <div className="placeorder-table">
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total per item</th>
                      </tr>
                      {items.map((item) => {
                        return (
                            <tr>
                              <td>{item.prname}</td>
                              <td>{item.amount}</td>
                              <td>{item.quantity}</td>
                              <td>{item.amount * item.quantity}</td>
                            </tr>
                        );
                      })}
                    </div>
                  );
                })}
              </tbody>
            </table>
            <div>
              <div>
                <span className="total"><h3>Sub Total: ${totalPrice}</h3></span>
                <span className="delivery"><h3>Delivery Charge: $50</h3></span>
              </div>
            </div>
            <br></br>
            <div className="placeorder-btn">
            <button onClick={() => placeOrder()}>
              <h2>PLACE ORDER</h2>
            </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
}

export default Cart;
