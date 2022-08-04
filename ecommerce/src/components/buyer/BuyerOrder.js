import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../users/NavBar";
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
          Thanks for your order!!! We will reach soon with your delicious food.
        </h2> 
        <div className="table-body">
          {Object.values(orders).map((item) => {
            return (
              <div>
                <tr>
                  <th>Image</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
                {Object.values(item).map((product) => {
                  return (
                    <div>
                      {Object.values(product).map((data) => {
                        return(
                          <div>
                            {Object.values(data).map((final_item) => {
                              return (
                                  <tr>
                                  <td className="image">
                                    <img src={final_item.image}  style={{ height: "6rem", width: "9rem" }}/>
                                  </td>
                                  <td>{final_item.prname}</td>
                                  <td>{final_item.amount}</td>
                                  <td>{final_item.quantity}</td>
                                  <td>{final_item.amount * final_item.quantity}</td>
                                  <td>{dispatch ? <div>{dispatch}</div> : <div>Yet to get shipped!</div>}</td>
                                  </tr>
                                );
                            })}
                          </div>
                        );
                      
                    })}
                  </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        </div>
        <div className="order-footer">
          {/* {dispatch ? <div>{dispatch}</div> : <div>Yet to get shipped!</div>} */}
        </div>
        </div>
  );
}

export default BuyerOrder;
