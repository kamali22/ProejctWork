import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import "/home/kamali/react/ecommerce/src/styles/Dashboard.css";
import SellerNavBar from "../users/NavBar";

function Dashboard() {
  const [product, setProduct] = useState([]);
  const isSeller = true;

  const handleData = () => {
    axios.get("http://localhost:9000/products").then((res) => {
      setProduct([res.data]);
    });
  }; 

  useEffect(() => {
    handleData();
  }, []);

  let navigate = useNavigate();
  const handleEdit = (items) => {
    navigate("/editproduct", { state: items });
  };

  return (
    <div>
      <SellerNavBar isSeller={isSeller} />
      <div>
        {Object.values(product).map((item) => {
          return (
            <div className="section">
              {Object.values(item).map((items) => {
                return (
                  <div
                    className="bootstrap-cards"
                    onClick={(e) => handleEdit(items)}
                  >
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
                          <p className="item-desc">{items.description}</p>
                        </Card.Text>
                      </Card.Body>
                    </Container>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
