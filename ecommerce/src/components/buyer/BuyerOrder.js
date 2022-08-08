import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "/home/kamali/react/ecommerce/src/components/users/NavBar";
import "/home/kamali/react/ecommerce/src/styles/BuyerOrder.css";

function BuyerOrder() {
  const isSeller = false;
  const isMenu = false;
  const [orders, setOrders] = useState([]);
  const [dispatch, setDispatch] = useState();

  const handleData = () => {
    axios.get("http://localhost:9000/orders").then((res) => {
      setOrders([res.data]);
    });
    axios.get("http://localhost:9000/dispatch").then((res) => {
      setDispatch(res.data[0].status);
    });
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div>
      <NavBar isSeller={isSeller} isMenu={isMenu} cart={orders} />
      <div className="delivey-data">
        <h2 className="place-header">
          Thanks for your order!!! We will reach soon with your product!.
        </h2> 
        <div className="table-body">
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
          {Object.values(orders).map((items) => {
            return (
              <div>
                {Object.values(items).map((item) => {
                return (
                  <tr>
                    <td className="image">
                      <img src={item.image}  style={{ height: "6rem", width: "9rem" }}/>
                    </td>
                    <td>{item.prname}</td>
                    <td>{item.amount}</td>
                    <td>{item.quantity}</td>
                    <td>${item.amount * item.quantity}</td>
                    <td>{item.status}</td>
                  </tr>
                );
                })}
              </div>
            );
          })}
        </div>
        </div>
        </div>
  );
}

export default BuyerOrder;
