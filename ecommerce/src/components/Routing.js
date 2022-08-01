import React, { useState } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Dashboard from "./sellerComponents/Dashboard";
import ProductForm from "./sellerComponents/ProductForm";
import SellerNavBar from "./sellerComponents/SellerNavBar";
import EditProduct from "./sellerComponents/EditProduct";
import BuyerDashboard from "./buyerComponents/BuyerDashboard";
import Cart from "./buyerComponents/Cart";
import SampleUseEffect from "../SampleUseEffect";
import CheckOrder from "./sellerComponents/CheckOrder";
import axios from "axios";
import BuyerOrder from "./buyerComponents/BuyerOrder";
import ProductMenu from "./buyerComponents/ProductMenu";
import Electronics from "./buyerComponents/Electronics";
import Furniture from "./buyerComponents/Furniture";
import Grocery from "./buyerComponents/Grocery";
import Toaster from "./Toaster";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProfile from "./buyerComponents/UpdateProfile";

function Routing() {
    
    const [cart, setCart] = useState([]);
    const [name, setName] = useState('');
    const [exist, setExist] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const [searchName, setSearchName] = useState('');
    const isBuyer = false;
    const isSeller = true;
    const isMenu = true;

    const checkExistense = (getData) => {
        //console.log("getdata is",getData, name);
        {Object.values(getData).map((item) => {
            //console.log("CART NAMEEEEEEEEEEEEEEEEEEEEEE", item.prname, name);
            if(item.prname == name) {
                //console.log("quantity already exists before update", item.quantity, typeof(item.quantity));
                setExist(current => !current);
                //console.log("Existence value", exist);
                // item.quantity = parseInt(item.quantity) + 1;
                // const user = {prname: item.prname, image: item.image, amount: item.amount, quantity: item.quantity, category: item.category, description: item.description};
                // console.log("ITEM QUANTITY ISSSSSSSSS", item.quantity);
                // axios.put('http://localhost:9000/cart' + '/' + item.id, user);
                // console.log("quantity already exists", item.quantity);
            }
            else {
                //console.log("IT SEEMS TO BE A NEW ITEM IN CART");
                setExist(0);
                console.log("existense value", exist);
            }
        })}
        // if(getData.includes(name)) {
        //     console.log("quantity already exists");
        // }
        // else {
        //     console.log("IT SEEMS TO BE A NEW ITEM IN CART");
        // }
    }
    const handleClick = (item) => {
        toast.success("Item added to cart!", {autoClose:500});
        setName([item.prname]);
        axios.get('http://localhost:9000/cart').then((res) => checkExistense(res.data));
        // console.log("Bfore checking if", item, "quantity", item.quantity);
        // console.log("Finding cart index", cart.indexOf(item))
        // if(cart.indexOf(item) !== -1) 
        //     console.log("Before quantity update", item.quantity);
        //     item.quantity +=1;
        //     const user = {prname: item.prname, image: item.image, amount: item.amount, quantity: item.quantity, category: item.category, description: item.description};
        //     console.log("ITEM QUANTITY ISSSSSSSSS", item.quantity);
        //     axios.put('http://localhost:9000/cart' + '/' + item.id, user);
        // item.quantity = 1
        // console.log("Item quantity is ", item, item.quantity, "cart", cart);
        // axios.post('http://localhost:9000/cart', item);
        //setCart([...cart, item]);
        //console.log("ADDED CART IS", cart)

        if(exist) {
            item.quantity +=1;
            const user = {prname: item.prname, image: item.image, amount: item.amount, quantity: item.quantity, category: item.category, description: item.description};
            //console.log("ITEM QUANTITY ISSSSSSSSS", item.quantity);
            axios.put('http://localhost:9000/cart' + '/' + item.id, user);
        }
        else {
            item.quantity = 1;
            axios.post('http://localhost:9000/cart', item);
            setCart([...cart, item]);
        }
    }

    const handleRemove = (id, setQuantity) => {
        //console.log("in handle remove", id);
        setQuantity(0);
        return axios.delete('http://localhost:9000/cart' + '/' + id)
    }

    const handleClear = (item, setQuantity) => {
        toast.success("Cart cleared!", {autoClose:500});
        //console.log("IN HANDLE CLEAR", item);
        setQuantity(0);
        Object.values(item).map((items) => {
            axios.delete('http://localhost:9000/cart/' + items.id);
        })
        //return axios.delete('http://localhost:9000/cart', item);
    }

    const handleDelete = (id, setQuantity) => {
        //console.log("in handle remove", id);
        setQuantity(0);
        return axios.delete('http://localhost:9000/cart' + '/' + id)
    }

    const handleChange = (item, d, setQuantity) => {
        //console.log("In item change", item, item.quantity, d, cart);
        axios.get('http://localhost:9000/cart').then((res) => {
        setCart([res.data]);
        item.quantity = parseInt(item.quantity) + d;
        setQuantity(item.quantity);
        //console.log("Item quantity in handle change", item.quantity)
        if(item.quantity == 0) {
            //console.log("WHEN QUANTITY VALUE IS ZERO", item.quantity);
            return handleRemove(item.id, setQuantity);
        }
        //console.log("ITEM QUANTITY IN CARTTTTTTTTTTTTT", quantity);
        //console.log("cart", cart, "res data", res.data, "quantity after update", item.quantity);
        const user = {prname: item.prname, image: item.image, amount: item.amount, quantity: item.quantity, category: item.category, description: item.description};
        axios.put('http://localhost:9000/cart' + '/' + item.id, user);
    });
        
    }

    const handleBuyerSearch = (value, product) => {
        let data = value;
        setSearchName(data);
        if(value) {
          const filteredItems = Object.values(product[0]).filter((items) => {
            return (
              items.prname.toLowerCase().includes(value.toLowerCase())
            );
          })
          setFiltered([
            Object.values(product[0]).filter((items) => {
              return (
                items.prname.toLowerCase().includes(value.toLowerCase())
              );
            })
          ])
        }}
    
    return (
        <Router>
            <Routes>
                <Route path="" element={<LoginForm />} />
                <Route path="/logout" element={<LoginForm />} />
                <Route path="/checkorder" element={<CheckOrder />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addproduct" element={<ProductForm/>} />
                <Route path="/editproduct" element={<EditProduct/>} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="register" element={<RegisterForm />} />
                <Route path="nav" element={<SellerNavBar />} />
                <Route path="/buyer" element={<BuyerDashboard cart={cart} handleClick={handleClick} handleClear={handleClear} />} >
                    <Route path="updateprofile" element={<UpdateProfile cart={cart} handleClick={handleClick} handleClear={handleClear}/>}/>
                    <Route path="menu" element={<ProductMenu handleClick={handleClick} handleClear={handleClear} />}/>
                    <Route path="cart" element={<Cart cart={cart} handleClick={handleClick} handleChange={handleChange} handleRemove={handleRemove} handleClear={handleClear} />} />
                    <Route path="buyerorder" element={<BuyerOrder />} />  
                </Route>
                {/* <Route path="/foodmenu" element={<BuyerDashboard cart={cart} handleClick={handleClick} handleClear={handleClear} />} />  */}
                <Route path="/electronics" element={<Electronics cart={cart} handleClick={handleClick} handleClear={handleClear} />} /> 
                <Route path="/furniture" element={<Furniture cart={cart} handleClick={handleClick} handleClear={handleClear} />} /> 
                <Route path="/grocery" element={<Grocery cart={cart} handleClick={handleClick} handleClear={handleClear} />} /> 
                <Route path="/toaster" element={<Toaster />} /> 
                <Route path="/updateprofile" element={<UpdateProfile cart={cart} handleClick={handleClick} handleClear={handleClear} />} />
            </Routes>
            <ToastContainer/>
        </Router>
    );
}

export default Routing;