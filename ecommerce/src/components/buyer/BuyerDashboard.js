import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import "/home/kamali/react/ecommerce/src/styles/Dashboard.css";
import NavBar from "/home/kamali/react/ecommerce/src/components/users/NavBar";
import { toast } from "react-toastify";

function BuyerDashboard({ handleClick, handleClear }) {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchName, setSearchName] = useState("");
  const isSeller = false;
  const isMenu = true;
  const location = useLocation();
  const states = location.state;

  const handleBuyerSearch = (value, product) => {
    let data = value;
    setSearchName(data);
    if (value) {
      const filteredItems = Object.values(product[0]).filter((items) => {
        return items.prname.toLowerCase().includes(value.toLowerCase());
      });
      setFiltered([
        Object.values(product[0]).filter((items) => {
          return items.prname.toLowerCase().includes(value.toLowerCase());
        }),
      ]);
    }
  };

  const handleData = () => {
    axios.get("http://localhost:9000/products").then((res) => {
      setProduct([res.data]);
    }); 
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div>
      <NavBar
        isSeller={isSeller}
        isMenu={isMenu}
        handleBuyerSearch={handleBuyerSearch}
        handleClear={handleClear}
        cart={cart}
        userdata={states}
      />
      {searchName ? (
        <div>
          {Object.values(filtered).map((items) => {
            return (
              <div className="section">
                {Object.values(items).map((item) => {
                  return (
                    <div className="bootstrap-cards">
                      <Container>
                        <Card.Body className="cards">
                          <div className="image-box">
                            <Card.Img
                              src={item.image}
                              alt=""
                              style={{ height: "10rem", width: "20rem" }}
                            />
                          </div>
                          <Card.Title className="card-title">
                            <h2>{item.prname}</h2>
                          </Card.Title>
                          <Card.Text className="card-text">
                            <p className="item-price">${item.amount}</p>
                            <p className="item-desc">{item.description}</p>
                          </Card.Text>
                          <Button
                            className="cart-button"
                            onClick={() => handleClick(item)}
                          >
                            Add to cart
                          </Button>
                        </Card.Body>
                      </Container>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {Object.values(product).map((item) => {
            return (
              <div className="section">
                {Object.values(item).map((items) => {
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
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BuyerDashboard;
