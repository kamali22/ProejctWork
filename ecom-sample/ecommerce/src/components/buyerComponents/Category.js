import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import "/home/kamali/react/ecommerce/src/styles/Dashboard.css";
import SellerNavBar from "../sellerComponents/SellerNavBar";

function Category({ handleClick, handleClear }) {
  const [product, setProduct] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);
  const [cartPrName, setCartPrName] = useState([]);
  const [cart, setCart] = useState([]);
  const isSeller = false;
  const isMenu = true;
  const location = useLocation();
  console.log("LOCATION FROM NAVBAR", location, location.state, location.state.category, typeof(location.state.category));
  const category = location.state.category;
  const handleBuyerSearch = (value) => {
    console.log("in seracing the request", value);
    if (value) {
      return axios.get("http://localhost:9000/cart?prname_like=${s.trim()}");
    } else {
      //
    }
  };

  const handleData = () => {
    //console.log("In handle data of a dashboard");
    axios.get("http://localhost:9000/products").then((res) => {
      //console.log("response data is", res, "res dataaaaaaa", res.data, "local data is", product);
      setProduct([res.data]);
      //console.log("after setvalue", product)
    });
    {
      axios.get("http://localhost:9000/cart").then((res) => {
        setCart([res.data]);
        Object.values(res.data).map((quan) => {
          console.log(quan.prname, quan.quantity);
          setCartPrName((cartPrName) => [...cartPrName, quan.prname]);
          setCartQuantity((cartQuantity) => [...cartQuantity, quan.quantity]);
          console.log(cartPrName, cartQuantity);
        });
      });
    }
  }; //useEffect

  useEffect(() => {
    console.log("useEffect ran");
    handleData();
  }, []);

  return (
    <div>
      <SellerNavBar
        isSeller={isSeller}
        isMenu={isMenu}
        handleBuyerSearch={handleBuyerSearch}
        handleClear={handleClear}
        cart={cart}
      />
      <div>
        {Object.values(product).map((item) => {

          return (
            <div className="section">
              {Object.values(item).map((items) => {
                //console.log("In buyer dashboard", item, items, "type of handle click", typeof(handleClick));
                if (items.category.toLowerCase() === category.toLowerCase()) {
                  return (
                    <div className="bootstrap-cards">
                      <Container>
                        <Card.Body className="cards">
                          <div className="image-box">
                            <Card.Img
                              src={items.image}
                              alt=""
                              style={{ height: "10rem", width: "20rem" }}
                            />
                          </div>
                          <Card.Title className="card-title">
                            <h2>{items.prname}</h2>
                          </Card.Title>
                          <Card.Text className="card-text">
                            <p className="item-price">${items.amount}</p>
                            {/* <p>{items.quantity}</p> */}
                            <p className="item-desc">{items.description}</p>
                          </Card.Text>
                          {/* {handleQuantity(items)} */}
                          {/* {axios.get('http://localhost:9000/cart/' + '/', items.id).then((res) => {console.log("QUANTITY CHECK", res, "MAIN DATA", res.data)})}; */}
                          <Button
                            className="cart-button"
                            onClick={() => handleClick(items)}
                          >
                            Add to cart
                          </Button>
                        </Card.Body>
                      </Container>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
