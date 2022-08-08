import React from "react";
import {Container ,Card, Col, Row, Button} from 'react-bootstrap';
import { useCart } from "react-use-cart"; 
import "./assests/Styles/ItemCard.css";
import Routing from './routing';

const ItemCard = (props) => {
    //console.log("PROPS VALUE IS ", props)
    console.log("props.quantity is", props.quantity)
    const quantities = props.quantity
    return (
        <div className="bootstrap-card">
            {/* <Container fluid='true' className="p-2 col-sm-8">
                <div className="row col-md-20 itemcard">
                    <Row md="5">
                            <div className="col">
                                <Card.Body>
                                    <Card.Title>{props.itemName}</Card.Title>
                                    <Card.Text>
                                        Price: {props.price} <br></br>
                                        Vegan: {props.vegan}
                                    </Card.Text>
                                    <button onClick={ () => props.handleClick(props.item)}>Add to cart</button>
                                </Card.Body>
                            </div>
                            <div className="col">
                                <Card.Img src={props.img} style={{height: '10rem', width: '20rem'}} />
                            </div>
                    </Row>	
                </div>	
            </Container> */}
            {/* <div className="cards">
                <div className="image_box">
                    <img src={props.img} alt="" style={{height: '10rem', width: '20rem'}}/>
                </div>
                <div className="details">
                    <h4>{props.itemName}</h4>
                    <h6>{props.vegan}</h6>
                    <h6>₹{props.price}</h6>
                    <button className="card-button" onClick={(e) => props.handleClick(props.item, e)}>Add to cart</button>
                </div>
            </div> */}

            <Container>
                <Card.Body className="cards">
                    <div className="image_box">
                        <Card.Img src={props.img} alt="" style={{height: '10rem', width: '20rem'}}/>
                    </div>
                    <Card.Body>
                        <Card.Title>{props.itemName}</Card.Title>
                        <Card.Text>
                            <p>{props.vegan}</p>
                            <p>₹{props.price}</p>
                        </Card.Text>
                        { quantities ? <div className="cartbutton" style={{width: "17rem"}}> <center>
                                        <button onClick={() => props.handleChange(props.item, -1)}>-</button>
                                        <span>{props.quantity}</span>
                                        <button  onClick={() => props.handleChange(props.item, 1)}>+</button>
                                        </center>
                                    </div>
                            : <Button variant='info' onClick={(e) => props.handleClick(props.item, e)} active style={{width: "17rem"}}>Add to cart</Button>
                        }
                        {/* <button className="card-button" onClick={handlePopup}>Add to cart</button> */}
                        {/* <Button variant='info' onClick={(e) => props.handleClick(props.item, e)} active style={{width: "17rem"}}>Add to cart</Button> */}
                    </Card.Body>
                </Card.Body>
            </Container>
        </div>
    );
}

export default ItemCard;