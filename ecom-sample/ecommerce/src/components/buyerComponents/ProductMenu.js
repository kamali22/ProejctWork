import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate, Outlet } from "react-router-dom";
import { Button, Card, Container, Nav, Navbar } from "react-bootstrap";
import "/home/kamali/react/ecommerce/src/styles/Dashboard.css";
import SellerNavBar from "../sellerComponents/SellerNavBar";
import SearchList from "./SearchList";
import { toast } from "react-toastify";

function ProductMenu({ handleClick, handleClear }) {
  const [product, setProduct] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);
  const [cartPrName, setCartPrName] = useState([]);
  const [cart, setCart] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchName, setSearchName] = useState("");
  const UserContext = createContext();
  // const location = useLocation();
  // const items = location.state.items
  const isSeller = false;
  const isMenu = true;
  const location = useLocation();
  const states = location.state;
  //console.log("STATE VALUE IS", states, location)
  let navigate = useNavigate();
  const addToCart = (items) => {
    //console.log("IN ADD TO CART", items);
    // let cartData = axios.get("http://localhost:9000/cart").then((res) => {
    //   console.log("axios get dataaaaaaaaaaaaa",res.data)
    //   {Object.values(res.data).map((cartItem) => {
    //     console.log("CART ITEM AND ITS NAME", cartItem, "NAME", cartItem.prname);
    //     if(items.prname !== cartItem.prname) {
    //       console.log("The item we try to add is a NEW ITEM");
    //       setCartPrName(false);
    //       console.log("CART PR VALUE", cartPrName);
    //     }
    //     else {
    //       console.log("Item we try to add is ALREADY PRESENT")
    //       setCartPrName(true);
    //       console.log("CART PR VALUE", cartPrName);
    //     }
    //   })}
    // })
    // if(cartPrName) {
    //   items.quantity += 1;
    //   console.log("AFTER QUANTITY UPDATE", items)
    // }
    // else {
    //console.log("CART DATA VALUE IS", cartData)
    items.quantity = 1;
    //console.log("AFTER QUANTITY UPDATE", items);
    axios.post("http://localhost:9000/cart", items);
    //}
  };

  const handleBuyerSearch = (value, product) => {
    //console.log("BEFore search data", searchName);
    let data = value;
    //console.log("Data", data)
    setSearchName(data);
    //name = value;
    //console.log("SEARCH DATA", searchName);
    //console.log("in seracing the request", value, typeof(value), "Product items", product);
    if (value) {
      //return axios.get('http://localhost:9000/cart?prname_like=${s.trim()}')
      // Object.values(product).map((items) => {
      //   console.log("ITEM in seaarch", items);
      //   items.filter((item) => {
      //       //return (
      //         if(item.prname.toLowerCase().includes(value.toLowerCase()) ){
      //             console.log("TRUE VALUE", item.prname.toLowerCase().includes(value.toLowerCase()), item.prname);
      //         }
      //       //);
      //     }
      //   );
      // })
      const filteredItems = Object.values(product[0]).filter((items) => {
        return items.prname.toLowerCase().includes(value.toLowerCase());
        // console.log("ITEM in seaarch", items);
        // if(items.prname.toLowerCase().includes(value.toLowerCase()) ){
        //   console.log("TRUE VALUE", items.prname.toLowerCase().includes(value.toLowerCase()), items.prname);
        // }
      });
      //setFiltered([filteredItems])
      setFiltered([
        Object.values(product[0]).filter((items) => {
          return items.prname.toLowerCase().includes(value.toLowerCase());
        }),
      ]);
      //console.log("Filtered items", filteredItems, "filtered", filtered);
      searchList();
      // const searchList = () => {
      //   console.log("aaaaaaaaaaaaaaaaaaaaaa")
      //   return (
      //     <div>
      //       {/* <SearchList filteredPersons={filtered} /> */}
      //       hiiiiiiiiiiiiiiiiiiiiiiiiiiii
      //     </div>
      //   );
      // }

      //searchList();
    } else {
      //
    }
  };

  const searchList = () => {
    return (
      <div>
        hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
        <SearchList filteredPersons={filtered} />
      </div>
    );
  };

  // const handleQuantity = (items) => {
  //   //console.log("In handle quantity", items, items.id);
  //   axios.get('http://localhost:9000/cart' + '/', items.id).then((res) => {console.log("QUANTITY CHECK", res, "MAIN DATA", res.data)});
  // }
  const handleData = () => {
    //console.log('location.state.toaster', location.state.toaster)
    // if(location.state.toaster == 'true'){
    //   toast("Logged In successfully");
    // }
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
          //console.log(quan.prname, quan.quantity);
          setCartPrName((cartPrName) => [...cartPrName, quan.prname]);
          setCartQuantity((cartQuantity) => [...cartQuantity, quan.quantity]);
          //console.log(cartPrName, cartQuantity);
        });
      });
    }
  }; //useEffect

  useEffect(() => {
    //console.log('useEffect ran');
    handleData();
  }, []);

  return (
    <div>
      <Navbar className="category-navbar">
        <Container className="category-container">
          <Navbar.Brand className="category-header">Category</Navbar.Brand>
          <Navbar.Collapse className="category-options">
            <Nav>
              <Nav.Link className="category-navlink" to="/electronics">
                {/* <img src={electronic}/> */}
                Electronics
              </Nav.Link>
              <Nav.Link className="category-navlink" to="/furniture">
                {/* <img src={furniture}/> */}
                Furniture
              </Nav.Link>
              <Nav.Link className="category-navlink" to="/grocery">
                {/* <img src={grocery}/> */}
                Grocery
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <SellerNavBar isSeller={isSeller} isMenu={isMenu} handleBuyerSearch={handleBuyerSearch} handleClear={handleClear} cart={cart} userdata={states}/> */}
      {searchName ? (
        <div>
          {Object.values(filtered).map((items) => {
            //console.log('filtered item in dashboard', items);
            return (
              <div className="section">
                {Object.values(items).map((item) => {
                  //console.log("qqqqqqqqqqqqqqqqqqq", item);
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
                            {/* <p>{items.quantity}</p> */}
                            <p className="item-desc">{item.description}</p>
                          </Card.Text>
                          {/* {handleQuantity(items)} */}
                          {/* {axios.get('http://localhost:9000/cart/' + '/', items.id).then((res) => {console.log("QUANTITY CHECK", res, "MAIN DATA", res.data)})}; */}
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
          {/* {Object.values(items).map((item) => {
              return(
                <div className='bootstrap-cards'>
                  <Container>
                    <Card.Body className='cards'>
                      <div className='image-box'>
                        <Card.Img src={item.image} alt="" style={{height: '10rem', width: '20rem'}}/>
                      </div>
                      <Card.Title className='card-title'><h2>{item.prname}</h2></Card.Title>
                      <Card.Text className='card-text'>
                        <p>${item.amount}</p>
                        <p>{item.quantity}</p>
                        <p>{item.description}</p>
                      </Card.Text>
                      <Button className='cart-button' onClick={(e) => handleClick(item)}>Add to cart</Button>
                    </Card.Body>
                  </Container>
                </div>
              )})
            }  */}

          {Object.values(product).map((item) => {
            //console.log("PRODUCT", product, typeof(product), typeof(product[0]));
            //console.log("ITEM", item);
            //console.log("ITEM NAME", item.prname);

            return (
              <div className="section">
                {Object.values(item).map((items) => {
                  //console.log("In buyer dashboard", item, items, "type of handle click", typeof(handleClick));
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
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductMenu;
