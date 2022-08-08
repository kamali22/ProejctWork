import {useLocation} from "react-router-dom";
import '/home/kamali/react/newreactproject/src/assests/images/food.jpeg';

const PlaceOrder = () => {
    const location = useLocation();
    const items = location.state.items
    const total = location.state.price
    console.log("Your order is placed!!!");
    return (
      <div>
        <div className="delivery-image"></div>
        <div className="delivey-data">
          <h2 className="place-header">Thanks for your order!!! We will reach soon with your delicious food.</h2>
          <div className="order-detail-summary">
            <div className="order">
              <h2>Order Details</h2>
              <table className="details table-borderless">
                <tr>
                  <th>Name</th>
                  <td>Kamali</td>
                </tr>
                <tr>
                  <th>Payment Mode</th>
                  <td>Cash</td>
                </tr>
                <tr>
                  <th>Order Time</th>
                  <td>9.30 pm</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>Namakkal</td>
                </tr>
              </table>
            </div>
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
                  {items.map((item, index) => {
                    return (
                      <tr> 
                        <td>{item.itemName}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <hr></hr>
            </div>
            <div className="">
              <div><h4 className="total">Subtotal</h4><span className="total value">${total}</span></div>
              <div><h4 className="delivery">Delivery charges</h4><span className="delivery value">$50</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default PlaceOrder;