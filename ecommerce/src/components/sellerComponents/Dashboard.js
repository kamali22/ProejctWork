import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import { type } from '@testing-library/user-event/dist/type';
import { Button, Card, Container } from 'react-bootstrap';
import "/home/kamali/react/ecommerce/src/styles/Dashboard.css";
import SellerNavBar from './SellerNavBar';
import ProductForm from './ProductForm';
import { toast } from 'react-toastify';
//import "/home/kamali/react/ecommerce/products.json";

function Dashboard() {
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const isSeller = true;
  //console.log("FROM LOGIN DATA", location.state, items);

  const handleData = () => {
    //console.log("In handle data of a dashboard", location.state.showToast);
    axios.get('http://localhost:9000/products').then((res)=>{
      console.log("response data is", res, "res dataaaaaaa", res.data, "local data is", product);
      setProduct([res.data]);
      console.log("after setvalue", product)
    })
   
  } //useEffect

  useEffect(() => {
    console.log('useEffect ran');
    handleData();
  },[]);

  let navigate = useNavigate();
  const handleEdit = (items) => {
    console.log("IN HANDLEE EDIT", items);
    navigate('/editproduct', {state: items});

  }
  
  return (
    <div>
      <SellerNavBar isSeller={isSeller} />
        <div >
           {Object.values(product).map((item) => {
            console.log("PRODUCT", product, typeof(product), typeof(product[0]));
            console.log("ITEM", item);
            console.log("ITEM NAME", item.prname);
            
            return(
              <div className='section'>
                {Object.values(item).map((items) => {
                  return(
                <div className='bootstrap-cards' onClick={(e) => handleEdit(items)}>
                  <Container>
                    <Card.Body className='cards'>
                      <div className='image-box'>
                        <Card.Img src={items.image} alt="" style={{height: '10rem', width: '20rem'}}/>
                      </div>
                      <Card.Title className='card-title'><h2>{items.prname}</h2></Card.Title>
                      <Card.Text className='card-text'>
                        {/* <p>${items.amount}</p>
                        <p>{items.quantity}</p> */}
                        <p className='item-desc'>{items.description}</p>
                      </Card.Text>
                      {/* <Button className='cart-button' onClick={(e) => handleEdit(items)}>Edit/Delete</Button> */}
                    </Card.Body>
                  </Container>
                </div> );
                })}
              </div>
            )})
          } 
        </div>
    </div>
  )
}

export default Dashboard