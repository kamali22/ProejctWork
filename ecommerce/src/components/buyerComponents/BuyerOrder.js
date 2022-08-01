import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "/home/kamali/react/ecommerce/src/styles/BuyerOrder.css";
import {useLocation} from "react-router-dom";

function BuyerOrder() {
    const [cart, setCart] = useState([]);
    const [dispatch, setDispatch] = useState();
    // const location = useLocation();
    // const items = location.state.items
    // const total = location.state.price
    // console.log("Your order is placed!!!", items);

    const handleData = () => {
        //console.log("In handle data of a dashboard");
        axios.get('http://localhost:9000/cart').then((res) => {
          //console.log("response data is", res, "res dataaaaaaa", res.data, "local data is", cart);
          setCart([res.data]);
          //console.log("after setvalue", cart)
        })
        axios.get('http://localhost:9000/dispatch').then((res) => {
          // console.log("RES data for dispatch", res.data, res.data[0], "local state", dispatch);
          setDispatch(res.data[0].status);
          //console.log(res.data[0].status,"--->");
          //console.log("after setDispatch", dispatch);
        })
        //console.log("after setDispatch", dispatch);
      }
      //console.log("cart outer", cart, dispatch);
      useEffect(() => {
        //console.log('useEffect ran',dispatch);
        handleData();
      }, []);

    return (
      <div>
        <div className="delivery-image"></div>
        <div className="delivey-data">
          <h2 className="place-header">Thanks for your order!!! We will reach soon with your delicious food.</h2>
          <div className="order-detail-summary">
            <div className="order-summary">
              <h2>Order Summary</h2>
              <table className=" summary table-borderless"> 
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(cart).map((item, index) => {
                      //console.log("IN PLACE ORDER",item);
                    return (
                        <div>
                            {item.map((product) => {
                                return(
                      <tr> 
                        <td><img src={product.image}/></td>
                        <td>{product.prame}</td>
                        <td>{product.amount}</td>
                        <td>{product.quantity}</td>
                        <td>{product.amount * product.quantity}</td>
                      </tr>
                      );
                      })}
                      </div>
                    );
                  })}
                </tbody>
              </table>
              <hr></hr>
            </div>
            {dispatch ? <div>{dispatch}</div> : <div>order not taken</div>}
          </div>
        </div>
      </div>
    );
}

export default BuyerOrder