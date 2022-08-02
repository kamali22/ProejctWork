import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerNavBar from "../sellerComponents/SellerNavBar";
import "/home/kamali/react/ecommerce/src/styles/BuyerOrder.css";

function BuyerOrder() {
  const isSeller = false;
  const isMenu = false;
  const [cart, setCart] = useState([]);
  const [dispatch, setDispatch] = useState();

  const handleData = () => {
    axios.get("http://localhost:9000/cart").then((res) => {
      setCart([res.data]);
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
      <SellerNavBar isSeller={isSeller} isMenu={isMenu} cart={cart} />
      <div className="delivey-data">
        <h2 className="place-header">
          Thanks for your order!!! We will reach soon with your delicious food.
        </h2> 
        <div className="table-body">
          {Object.values(cart).map((item) => {
            return (
              <div>
                <tr>
                  <th>Image</th>
                  <th>Item Name</th>
                  <th>price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
                {Object.values(item).map((product) => {
                  return (
                    <tr>
                    <td className="image">
                      <img src={product.image}  style={{ height: "6rem", width: "9rem" }}/>
                    </td>
                      <td>{product.prname}</td>
                    <td>{product.amount}</td>
                      <td>{product.quantity}</td>
                      <td>{product.amount * product.quantity}</td>
                    </tr>
                  );
                })}
              </div>
            );
          })}
        </div>
        </div>
        <div className="order-footer">
          {dispatch ? <div>{dispatch}</div> : <div>Yet to get shipped!</div>}
        </div>
        </div>
  );
}

export default BuyerOrder;
