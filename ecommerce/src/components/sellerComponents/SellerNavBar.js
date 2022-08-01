import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Nav , Navbar} from 'react-bootstrap';
import axios from 'axios';
import logo from '/home/kamali/react/ecommerce/src/Asset/images/logo.jpeg';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import ProductForm from './ProductForm';
import "/home/kamali/react/ecommerce/src/styles/SellerNavBar.css";
import electronic from '../../Asset/images/electronic.jpeg';
import furniture from '../../Asset/images/furniture.jpeg';
import grocery from '../../Asset/images/grocery.jpeg';
//import electronic from "home/kamali/react/ecommerce/src/Asset/images";
import { type } from '@testing-library/user-event/dist/type';

function SellerNavBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState([]);
  const [product, setProduct] = useState([]);
  //const user = useContext(UserContext);
  //console.log("cart items in navbar are", props.cart, props);
  const route = useNavigate();

  const togglePopup = () => {
    setIsOpen(true);
    //console.log("ISOPEN VALUE IS", isOpen);
  }
  console.log("USer personal details", props.userdata, props);

  const navigate = useNavigate();
  const handleUserProfile = () => {
      console.log("In retrieving user data")
      navigate('/updateprofile', {state: 'kamali'});
      console.log('-------------->')
  }

  const handleItem = () => {
    axios.get('http://localhost:9000/products').then((res)=>{
      //console.log("response data is", res, "res dataaaaaaa", res.data, "local data is", product);
      setProduct([res.data]);
      //console.log("after setvalue", product)
    });
      Object.values(props.cart).map((items) => {
        setItem([items]);
        //console.log("ITEM IN NAVBAR", item, typeof(props.handleClear));
      })
  }

  useEffect(() => {
    //console.log('useEffect ran');
    if(!props.isSeller) {
    handleItem();
    }
  },[]);

  return (
      <div>
        {props.isSeller ? <div>
            <Navbar className='sell-navbar' bg='dark' variant="dark" expand='lg'>
                <Container>
                    <img className="logo" src={logo} alt="" />
                    <span className="search-bar">
                        <input type="text" placeholder="Search products..." ></input>
                        {/* <span><button type="submit"><i className="fa fa-search search-icon"></i></button></span> */}
                    </span>
                    <Navbar.Brand>Welcome Seller!</Navbar.Brand>
                    <Navbar.Collapse>
                        <Nav className='me-auto'>
                            <Link to="/login"><Button className='sell-navlink'>Logout</Button></Link>
                            <Link to="/checkorder"><Button className='sell-navlink'>Check Orders</Button></Link>
                            <Link to="/addproduct"><Button className='sell-navlink'>Add Product</Button></Link>
                            <Link to="/dashboard"><Button className='sell-navlink'>View Product</Button></Link>
                            {/* <Nav.Link onClick={togglePopup}><Button className='sell-navlink'>Add Product</Button></Nav.Link>
                            {isOpen && <ProductForm />} */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </div>
        : <div>
            <Navbar className='sell-navbar' bg='dark' variant="dark" expand='lg'>
                <Container>
                    <img className="logo" src={logo} alt="" />
                    <span className="search-bar">
                        <input type="text" placeholder="Search products..." onChange={(e) => props.handleBuyerSearch(e.target.value, product)}></input>
                        {/* <span><button type="submit"><i className="fa fa-search search-icon"></i></button></span> */}
                    </span>
                    <Navbar.Brand className='navbar-brand'>Welcome Buyer!</Navbar.Brand>
                    <Navbar.Collapse>
                        <Nav className='me-auto'>
                             <Link to="/login" onClick={(e) => props.handleClear(item)}><Button className='sell-navlink'>Logout</Button></Link>
                            {/* <Link activeclassname={"active"} to="/updateprofile" state={{name:'kamali'}}><Button className='sell-navlink' onClick={() => handleUserProfile()}>Profile</Button></Link> */}
                            <Link activeclassname={"active"} to="/buyer/updateprofile"><Button className='sell-navlink' onClick={() => handleUserProfile()}>Profile</Button></Link>
                            <Link activeclassname={"active"} to="/buyer/buyerorder"><Button className='sell-navlink'>My Orders</Button></Link>
                            <Link activeclassname={"active"} to="/buyer/cart"><Button className='sell-navlink'>Cart</Button></Link>
                            {/* <span class="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger">
                                (length)
                            </span> */}
                            <Link activeclassname={"active"} to="/buyer/menu"><Button className='sell-navlink'>Menu</Button></Link>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* {props.isMenu && 
            <Navbar className='category-navbar'>
                <Container className='category-container'>
                    <Navbar.Brand className='category-header'>Category</Navbar.Brand>
                    <Navbar.Collapse className='category-options'>
                        <Nav>
                            <Nav.Link className='category-navlink' to="/electronics">
                                Electronics
                            </Nav.Link>
                            <Nav.Link className='category-navlink' to="/furniture">
                                Furniture
                            </Nav.Link>
                            <Nav.Link className='category-navlink' to="/grocery">
                                Grocery
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            } */}
        </div> }

    
    </div>
  )
}

export default SellerNavBar