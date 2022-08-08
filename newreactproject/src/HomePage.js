import {Container ,Card, Col, Row, Button} from 'react-bootstrap';
import stockData from "./assests/Data/foodData";  
import Nav from './Nav';
import "./assests/Styles/style.css";
import "./assests/Styles/ItemCard.css";
import PopupModal from './PopupModal';
import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import {Link} from "react-router-dom";

function HomePage() {  
	var count=0;
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handlePopup = () => {
		console.log("Popup opened");
		return <PopupModal />;
	}
  return (   
	
    <div className="App"> 
	<div > 
		<Nav />
		<div className='food-list'>
			{stockData.map(function(data) {
				count=-1;
				return (
					<div className='row'>
						<div className='food-category'><h2>{data.category}</h2></div>
						<div className='section'>
							{Object.keys(data.items).map(item => {
								count++;
								return (
									// <Container fluid='true' className='p-2  col-sm-7'>
									// 	<div className='row col-md-10'>
									// 		<Row xs="4">
									// 				<div className='col'>
									// 					<Card.Body>
									// 						<Card.Title>{data.items[count].itemName}</Card.Title>
									// 						<Card.Text>
									// 							Price: {data.items[count].price} <br></br>
									// 							Vegan: {data.items[count].vegan}
									// 						</Card.Text>
									// 						<button>Add to cart</button>
									// 					</Card.Body>
									// 				</div>
									// 				<div className='col'>
									// 					<Card.Img src={data.items[count].img} style={{height: '10rem', width: '15rem'}}/>
									// 				</div>
									// 		</Row>	
									// 	</div>
										
									// </Container>
									// <div className='bootstrap-card'>
									// 	<div className="cards">
									// 		<div className="image_box">
									// 			<img src={data.items[count].img} alt="" style={{height: '10rem', width: '20rem'}}/>
									// 		</div>
									// 		<div className="details">
									// 			<h4>{data.items[count].itemName}</h4>
									// 			<h6>{data.items[count].vegan}</h6>
									// 			<h6>₹{data.items[count].price}</h6>
									// 			{/* <button className="card-button" onClick={handlePopup}>Add to cart</button> */}
									// 			<Button variant='info' onClick={handleShow}>Add to cart</Button>
									// 		</div>
									// 	</div>
									// </div>

									<Container>
										<Card.Body>
											<div className="image_box">
												<Card.Img src={data.items[count].img} alt="" style={{height: '10rem', width: '20rem'}}/>
											</div>
											<Card.Body>
												<Card.Title>{data.items[count].itemName}</Card.Title>
												<Card.Text>
													<p>{data.items[count].vegan}</p>
													<p>₹{data.items[count].price}</p>
												</Card.Text>
												{/* <button className="card-button" onClick={handlePopup}>Add to cart</button> */}
												<Button variant='info' onClick={handleShow} active style={{width: "17rem"}}>Add to cart</Button>
											</Card.Body>
										</Card.Body>
									</Container>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
    </div>  
	<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Oops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You're not logged in or signed up!</Modal.Body>
        <Modal.Footer >
          <Button variant="primary">
          	<Link to="/login" style={{color:"white"}}>Login</Link>
          </Button>
          <Button variant="primary">
          	<Link to="/register" style={{color:"white"}}>Sign Up</Link>
          </Button>
        </Modal.Footer>
      </Modal>
	</div>
  );  
}  

export default HomePage;