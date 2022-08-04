import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Dashboard from "../seller/Dashboard";
import AddProduct from "../seller/AddProduct";
import NavBar from "./NavBar";
import EditProduct from "../seller/EditProduct";
import BuyerDashboard from "../buyer/BuyerDashboard";
import Cart from "../buyer/Cart";
import CheckOrder from "../seller/CheckOrder";
import axios from "axios";
import BuyerOrder from "../buyer/BuyerOrder";
import Category from "../buyer/Category";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProfile from "./UpdateProfile";

function Routing() {
  const [cart, setCart] = useState([]);
  const [isCartChanged, setIsCartChanged] = useState("null");
  const [name, setName] = useState("");
  const [exist, setExist] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const checkExistense = (getData) => {
    {
      Object.values(getData).map((item) => {
        if (item.prname == name) {
          setExist((current) => !current);
        } else {
          setExist(0);
        }
      });
    }
  };

  const handleClick = (item) => {
    toast.success("Item added to cart!", { autoClose: 500 });
    setName([item.prname]);
    setIsCartChanged("clicked");
    axios
      .get("http://localhost:9000/cart")
      .then((res) => checkExistense(res.data));
    if (exist) {
      item.quantity += 1;
      const user = {
        prname: item.prname,
        image: item.image,
        amount: item.amount,
        quantity: item.quantity,
        category: item.category,
        description: item.description,
      };
      axios.put("http://localhost:9000/cart" + "/" + item.id, user);
    } else {
      item.quantity = 1;
      axios.post("http://localhost:9000/cart", item);
      setCart([...cart, item]);
    }
  };

  const handleRemove = (id, setQuantity) => {
    setQuantity(0);
    setIsCartChanged("removed");
    return axios.delete("http://localhost:9000/cart" + "/" + id);
  };

  const handlePrice = () => {
    let amnt = 0;
    axios.get("http://localhost:9000/cart").then((res) => {
      Object.values(res.data).map((item) => {
        
        amnt += item.quantity * item.amount;
        
      });
      setTotalAmount(amnt);
    });
    setTotalAmount(amnt);
  };

  const handleClear = (item, setQuantity) => {
    toast.success("Cart cleared!", { autoClose: 500 });
    setQuantity(0);
    const data = [];
    setIsCartChanged("cleared");
    //axios.post("http://localhost:9000/cart/" + []);
    Object.values(item).map((items) => {
     axios.delete("http://localhost:9000/cart" + "/" +items.id);
    });
    //return axios.delete("http://localhost:9000/cart", item);
  };

  const handleChange = (item, d, setQuantity, quantity) => {
    axios.put("http://localhost:9000/dispatch" + "/" + item.id, "");
    axios.get("http://localhost:9000/cart").then((res) => {
      setCart([res.data]);
      item.quantity = parseInt(item.quantity) + d;
      setQuantity(item.quantity);
      if (item.quantity == 0) {
        return handleRemove(item.id, setQuantity);
      }
      const user = {
        prname: item.prname,
        image: item.image,
        amount: item.amount,
        quantity: item.quantity,
        category: item.category,
        description: item.description,
      };
      axios.put("http://localhost:9000/cart" + "/" + item.id, user);
      setIsCartChanged("changed");
    });
  };

  useEffect(() => {
  }, [isCartChanged]);

  return (
    <Router>
      <Routes>
        <Route path="" element={<LoginForm />} />
        <Route path="/logout" element={<LoginForm />} />
        <Route path="/checkorder" element={<CheckOrder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/editproduct" element={<EditProduct />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="nav" element={<NavBar />} />
        <Route
          path="/buyer"
          element={
            <BuyerDashboard
              cart={cart}
              handleClick={handleClick}
              handleClear={handleClear}
            />
          }
        />
        <Route
          path="/updateprofile"
          element={
            <UpdateProfile
              cart={cart}
              handleClick={handleClick}
              handleClear={handleClear}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              handleClick={handleClick}
              handleChange={handleChange}
              handleRemove={handleRemove}
              handleClear={handleClear}
              price={totalAmount}
            />
          }
        />
        <Route path="/buyerorder" element={<BuyerOrder />} />
        <Route
          path="/category"
          element={
            <Category
              cart={cart}
              handleClick={handleClick}
              handleClear={handleClear}
            />
          }
        />
        <Route
          path="/updateprofile"
          element={
            <UpdateProfile
              cart={cart}
              handleClick={handleClick}
              handleClear={handleClear}
            />
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default Routing;
