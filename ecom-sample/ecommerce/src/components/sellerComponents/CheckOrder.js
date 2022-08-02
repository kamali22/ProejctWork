import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerNavBar from "./SellerNavBar";
import { Button } from "react-bootstrap";
import "/home/kamali/react/ecommerce/src/styles/CheckOrder.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckOrder() {
  const [cart, setCart] = useState([]);
  const isSeller = true;

  const handleShipped = () => {
    toast.success("Order Shipped", { autoClose: 500 });
    //console.log("handle shipped");
    const status = { status: "shipped", isClicked: 1 };
    const id = 1;
    axios.put("http://localhost:9000/dispatch" + "/" + id, status);
  };

  const handleDelivered = () => {
    toast.success("Order Delivered", { autoClose: 500 });
    //console.log("handle delivered");
    const status = { status: "delivered", isClicked: 1 };
    const id = 1;
    axios.put("http://localhost:9000/dispatch" + "/" + id, status);
  };

  const handleData = () => {
    //console.log("In handle data of a dashboard");
    axios.get("http://localhost:9000/cart").then((res) => {
      //console.log("response data is", res, "res dataaaaaaa", res.data, "local data is", cart);
      setCart([res.data]);
      //console.log("after setvalue", cart)
    });
  }; //useEffect

  useEffect(() => {
    //console.log('useEffect ran');
    handleData();
  }, []);
  return (
    <div>
      <SellerNavBar isSeller={isSeller} />
      <h2>Ordered Items</h2>
      {/* {cartProduct()} */}
      {Object.values(cart).map((item) => {
        //console.log("cart data is", cart, item);
        return (
          <div className="order-table">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th colSpan={2} className='order-action'>Action</th>
            </tr>
            {Object.values(item).map((items) => {
              //console.log("cart item in data is", items);
              return (
                <tr key={items.id}>
                  <td>
                    <img
                      src={items.image}
                      style={{ height: "4rem", width: "4rem" }}
                    />
                  </td>
                  <td>{items.prname}</td>
                  <td>${items.amount}</td>
                  <td>Quantity ({items.quantity})</td>
                  <td>
                    <div className="order-button">
                      <Button className="btn" onClick={() => handleShipped()}>
                        Shipped
                      </Button>
                      <Button className="btn" onClick={() => handleDelivered()}>
                        Delivered
                      </Button>
                    </div>
                  </td>
                  {/* <td>
                <button className="cartbutton" >-</button>
                <button className="cartbutton" >+</button>
                <button className="cartbutton remove" >Remove Item</button>
              </td> */}
                </tr>
              );
            })}
          </div>
        );
      })}

      <div className="order-button">
        <Button className="btn" onClick={() => handleShipped()}>
          Shipped
        </Button>
        <Button className="btn" onClick={() => handleDelivered()}>
          Delivered
        </Button>
      </div>
    </div>
  );
}

export default CheckOrder;
