import React, { useState } from 'react';
import { useCart } from "react-use-cart";
import 'bootstrap/dist/css/bootstrap.min.css';   
import stockData from "./assests/Data/foodData";
import ItemCard from './ItemCard';
import DataNav from './DataNav';
import "./assests/Styles/ItemCard.css";
import Cart from './Cart';
import {Container ,Card, Col, Row} from 'react-bootstrap';

function FoodProduct({cart, handleClick, handleChange}) {
    var count=0;
	console.log("Cart length is ", cart.length)
	//console.log("Cart data in food menu", cart)
	// const { totalUniqueItems,} = useCart();
	// const [show, setShow] = useState(true);
	// const [cart, setCart] = useState([]);
	// console.log("Empty cart is ", cart)
	// const handleClick = (item) => {
	// 	console.log("Fulled cart", cart, cart[item]);
	// 	{cart.map((data) => {
	// 		console.log("ACTUAL DATA IS", data, data.quantity)
	// 		cart.push(item)
	// 		console.log("after add cart", cart)
	// 	})}
	// 	console.log(item);
	// 	if(cart.indexOf(item) !== -1) return;
	// 	setCart([...cart, item]);
	// }

	// const handleChange = (item, d) => {
	// 	const ind = cart.indexOf(item);
	// 	console.log("IN HANDLE CHANGE")
	// 	// {cart.map((data) => {
	// 	// 	if(data.id === id) {
	// 	// 		data.quantity += d;
	// 	// 		console.log("DATA QUANTITY", data, id, data.id, data.quantity)
	// 	// 	}
	// 	// })}
	// 	const arr = cart;
	// 	arr[ind].quantity += d;
	// 	console.log("ARRAY", arr, arr[ind])

	// 	// if(arr[id].quantity === 0 )
	// 	// 	arr[id].quantity = 1;
	// 	// setCart([...arr])
	// 	setCart([...cart])
	// }

    return (
            <div className="App"> 
			<DataNav total={cart.length} />
			{/* {show ? ( */}
			<div className='food-list'>
				{stockData.map(function(data) {
					count=-1;
					return ( 
						<div key={data} className="App">
							<div className='food-category'><h2>{data.category}</h2></div>
							<div className='section'> 
								{Object.keys(data.items).map((item, index) => {
									count++;
									return (
										<ItemCard img={data.items[count].img} itemName={data.items[count].itemName} price={data.items[count].price} vegan={data.items[count].vegan} quantity={data.items[count].quantity} item={data.items[count]} key={index} handleClick={handleClick} handleChange={handleChange}/>
									);
									
								})}
							</div>
						</div>
					);
					
				})}
			</div> 
			{/* ) : (
				<Cart cart={cart} setCart={setCart} handChange={handleChange} />
			)} */}
		</div>  
        
    )
}

export default FoodProduct;