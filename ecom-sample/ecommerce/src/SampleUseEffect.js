import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Container } from "react-bootstrap";

function SampleUseEffect() {
  const [num, setNum] = useState(0);
  const [product, setProduct] = useState([]);

  const handleData = () => {
    console.log("in handle Data");
    axios.get("http://localhost:8000/posts").then((res) => {
      console.log("response data is", res, "local data is", product);
      setProduct([res.data]);
      console.log("after setvalue", product);
    });
  };

  useEffect(() => {
    console.log("useEffect ran");
    handleData();
  }, []);

  return (
    <div>
      <h2>Number is {num}</h2>
      {Object.values(product[0]).map((item) => {
        console.log("PRODUCT", product[0], typeof product[0]);
        console.log("ITEM", item);
        console.log("ITEM NAME", item.prname);
        return (
          // <table>
          //     <td>{item.prname}</td>
          //     <td>{item.image}</td>
          //     <td>{item.amount}</td>
          //     <td>{item.quantity}</td>
          //     <td>{item.description}</td>
          // </table>
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
                  <p>${item.amount}</p>
                  <p>{item.quantity}</p>
                  <p>{item.description}</p>
                </Card.Text>
                <Button className="cart-button">Edit/Delete</Button>
              </Card.Body>
            </Container>
          </div>
        );
      })}
    </div>
  );
}

export default SampleUseEffect;
