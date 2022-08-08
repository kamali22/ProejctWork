import React from "react";
import { Nav, NavLink } from "react-router-dom";
import profile from "./assests/images/profile.png";
import cart from "./assests/images/cart.png";
import logo from "./assests/images/y-logo.png";
import foodicon from "./assests/images/foodicon.jpeg";
import Cart from "./Cart";
import "./assests/Styles/DataNav.css";
import SearchBar from "./SearchBar";

function DataNav(props) {
    
        const handleSearchChange = (e) => {
            console.log("IN HANDLE SEARCH BAR", e.target.value);
            return <SearchBar value={e.target.value}/>
            console.log("HIIIIIIIIIIIIIIIIII")
        } 
        console.log("cart items", props.total);
        return (
            <nav className="navbar fixed-top navbar-expand-sm bg-dark">
                <h2><img className="logo" src={logo} alt="" />
                Yumito</h2>
                <div className="search-bar">
                    <input type="text" placeholder="Search your food..." onChange={handleSearchChange}></input>
                    <button type="submit"><i class="fa fa-search"></i></button>
                </div>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item content_img" >
                        <NavLink to="/order"><img className='icon food-icon' src={foodicon}/></NavLink>
                        <div className="food-menu">Food menu</div>
                    </li>
                    <li className="nav-item content_img" > 
                        <NavLink to="/cart"><img className='icon cart-icon' src={cart} />
                            <span class="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger">
                                ({props.total})
                            </span>
                        </NavLink>
                        <div className="cart">Cart</div>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" onClick={props.handleClear}>Logout</NavLink>
                    </li>
                </ul>
            </nav>
        );
    
}

export default DataNav;