import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerNavBar from "/home/kamali/react/ecommerce/src/components/users/NavBar";
import { Button } from "react-bootstrap";
import "/home/kamali/react/ecommerce/src/styles/CheckOrder.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckOrder() {
  const [order, setOrder] = useState([]);
  const isSeller = true;

  const handleShipped = (item) => {
    toast.success("Order Shipped", { autoClose: 500 });
    const updatedOrder = {prname:item.prname, image:item.image, amount:item.amount, quantity:item.quantity, category: item.category, description: item.description, status: "Shipped"};
    axios.put("http://localhost:9000/orders" + "/" + item.id, updatedOrder);
  };

  const handleDelivered = (item) => {
    toast.success("Order Delivered", { autoClose: 500 });
    const updatedOrder = {prname:item.prname, image:item.image, amount:item.amount, quantity:item.quantity, category: item.category, description: item.description, status: "Delivered"};
    axios.put("http://localhost:9000/orders" + "/" + item.id, updatedOrder);
  };

  const handleData = () => {
    axios.get("http://localhost:9000/orders").then((res) => {
      setOrder([res.data]);
    });
  }; 

  useEffect(() => {
    handleData();
  }, []);
  return (
    <div>
      <SellerNavBar isSeller={isSeller} />
      <h2>Ordered Items</h2>
      {Object.values(order).map((items) => {
        return (
          <div className="order-table">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            {Object.values(items).map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      style={{ height: "4rem", width: "4rem" }}
                    />
                  </td>
                  <td>{item.prname}</td>
                  <td>${item.amount}</td>
                  <td>Quantity ({item.quantity})</td>
                  <td>
                    <Button className="btn" onClick={() => handleShipped(item)}>
                      Shipped
                    </Button>
                  </td>
                  <td>
                    <Button className="btn" onClick={() => handleDelivered(item)}>
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
