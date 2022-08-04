import React, { useState, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import logo from "/home/kamali/react/ecommerce/src/Asset/images/logo.jpeg";
import { Link } from "react-router-dom";
import "/home/kamali/react/ecommerce/src/styles/NavBar.css";

function NavBar(props) {
  const [item, setItem] = useState([]);
  const [product, setProduct] = useState([]);
  const categories = ['Electronics', 'Furniture', 'Grocery', 'Cosmetics'];

  const handleItem = () => {
    axios.get("http://localhost:9000/products").then((res) => {
      setProduct([res.data]);
    });
    Object.values(props.cart).map((items) => {
      setItem([items]);
    });
  };

  useEffect(() => {
    if (!props.isSeller) {
      handleItem();
    }
  }, []);

  return (
    <div>
      {props.isSeller ? (
        <div>
          <Navbar className="sell-navbar" bg="dark" variant="dark" expand="lg">
            <Container>
              <img className="logo" src={logo} alt="" />
              <span className="search-bar">
                <input type="text" placeholder="Search products..."></input>
              </span>
              <Navbar.Brand>Welcome Seller!</Navbar.Brand>
              <Navbar.Collapse>
                <Nav className="me-auto">
                  <Link to="/login">
                    <Button className="sell-navlink">Logout</Button>
                  </Link>
                  <Link to="/checkorder">
                    <Button className="sell-navlink">Check Orders</Button>
                  </Link>
                  <Link to="/addproduct">
                    <Button className="sell-navlink">Add Product</Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button className="sell-navlink">View Product</Button>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      ) : (
        <div>
          <Navbar className="sell-navbar" bg="dark" variant="dark" expand="lg">
            <Container>
              <img className="logo" src={logo} alt="" />
              <span className="search-bar">
                <input
                  type="text"
                  placeholder="Search products..."
                  onChange={(e) =>
                    props.handleBuyerSearch(e.target.value, product)
                  }
                ></input>
              </span>
              <Navbar.Brand className="navbar-brand">
                Welcome Buyer!
              </Navbar.Brand>
              <Navbar.Collapse>
                <Nav className="me-auto">
                  <Link to="/login" onClick={(e) => props.handleClear(item)}>
                    <Button className="sell-navlink">Logout</Button>
                  </Link>
                  <Link activeclassname={"active"} to="/updateprofile">
                    <Button className="sell-navlink">Profile</Button>
                  </Link>
                  <Link activeclassname={"active"} to="/buyerorder">
                    <Button className="sell-navlink">My Orders</Button>
                  </Link>
                  <Link activeclassname={"active"} to="/cart">
                    <Button className="sell-navlink">Cart</Button>
                  </Link>
                  {/* <span class="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger">
                                (length)
                            </span> */}
                  <Link activeclassname={"active"} to="/buyer">
                    <Button className="sell-navlink">Menu</Button>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {props.isMenu && (
            <Navbar className="category-navbar">
              <Container className="category-container">
                <Navbar.Brand className="category-header">
                  Category
                </Navbar.Brand>
                <Navbar.Collapse className="category-options">
                  <Nav>
                    {categories.map((category) => {
                      return (
                        <Link className="category-navlink" to="/category" state={{ category: category }}>
                          {category}
                        </Link>
                      );
                    })}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
