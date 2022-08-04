import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerNavBar from "../users/NavBar";
import { Button } from "react-bootstrap";
import "/home/kamali/react/ecommerce/src/styles/CheckOrder.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckOrder() {
  const [cart, setCart] = useState([]);
  const isSeller = true;

  const handleShipped = () => {
    toast.success("Order Shipped", { autoClose: 500 });
    const status = { status: "shipped", isClicked: 1 };
    const id = 1;
    axios.put("http://localhost:9000/dispatch" + "/" + id, status);
  };

  const handleDelivered = () => {
    toast.success("Order Delivered", { autoClose: 500 });
    const status = { status: "delivered", isClicked: 1 };
    const id = 1;
    axios.put("http://localhost:9000/dispatch" + "/" + id, status);
  };

  const handleData = () => {
    axios.get("http://localhost:9000/cart").then((res) => {
      setCart([res.data]);
    });
  }; 

  useEffect(() => {
    handleData();
  }, []);
  return (
    <div>
      <SellerNavBar isSeller={isSeller} />
      <h2>Ordered Items</h2>
      {Object.values(cart).map((item) => {
        return (
          <div className="order-table">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            {Object.values(item).map((items) => {
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
                    <Button className="btn" onClick={() => handleShipped()}>
                      Shipped
                    </Button>
                  </td>
                  <td>
                    <Button className="btn" onClick={() => handleDelivered()}>
                      Delivered
                    </Button>
                  </td>
                </tr>
              );
            })}
          </div>
        );
      })}

      {/* <div className="order-button">
        <Button className="btn" onClick={() => handleShipped()}>
          Shipped
        </Button>
        <Button className="btn" onClick={() => handleDelivered()}>
          Delivered
        </Button>
      </div> */}
    </div>
  );
}

export default CheckOrder;
