import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import "/home/kamali/react/ecommerce/src/styles/Dashboard.css";
import SellerNavBar from "../users/NavBar";

function Category({ handleClick, handleClear }) {
  const [product, setProduct] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);
  const [cartPrName, setCartPrName] = useState([]);
  const [cart, setCart] = useState([]);
  const isSeller = false;
  const isMenu = true;
  const location = useLocation();
  const category = location.state.category;
  const handleBuyerSearch = (value) => {
    if (value) {
      return axios.get("http://localhost:9000/cart?prname_like=${s.trim()}");
    } 
  };

  const handleData = () => {
    axios.get("http://localhost:9000/products").then((res) => {
      setProduct([res.data]);
    });
    {
      axios.get("http://localhost:9000/cart").then((res) => {
        setCart([res.data]);
        Object.values(res.data).map((quan) => {
          setCartPrName((cartPrName) => [...cartPrName, quan.prname]);
          setCartQuantity((cartQuantity) => [...cartQuantity, quan.quantity]);
        });
      });
    }
  }; 

  useEffect(() => {
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
                            <p className="item-desc">{items.description}</p>
                          </Card.Text>
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
