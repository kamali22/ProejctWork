import React, {useState, useEffect} from 'react'  
import About from './About'   
import LoginForm from './LoginForm'  
import RegisterForm from './RegisterForm'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './HomePage' 
import Cart from './Cart'
import FoodProduct from './FoodProduct'
import PlaceOrder from './PlacedOrder';

function Routing() {  
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);

	const handleClick = (item) => {
		console.log("ADDED ITEM IS", item)
    console.log("cart.indexOf(item)", cart.indexOf(item))
		if(cart.indexOf(item) !== -1) 
      return item.quantity +=1;
    item.quantity = 1
    console.log("Item quantity is ", item, item.quantity)
		setCart([...cart, item]);
    console.log("ADDED CART IS", cart)
	}

  const handleClear = () => {
    setCart([]);
    console.log("Cart cleared", cart)
  }

  const handleRemove = (id) => {
    console.log("Removing id", id);
    console.log("dataaaaaaaa", cart);
    const arr = cart.filter((item) => 
      item.id != id
    );
    console.log("removing array item is ", arr)
    
    setCart(arr);
    handlePrice();
  };

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => {
      console.log("ITEM IS ", cart)
      console.log("Before price calculation", item.quantity, item.price, ans)
      ans += item.quantity * item.price;
      console.log("After price calculation", item.quantity, item.price, ans)
    });
    console.log("Total price is", ans)
    setPrice(ans);
    return ans;
  };

  useEffect(() => {
    handlePrice();
  });
  // const handleClick = (item) => {
  //   	console.log("Fulled cart", cart, cart[item]);
  //   	{cart.map((data) => {
  //   		//console.log("ACTUAL DATA IS", data, data.quantity)
  //       console.log("ITEM to be added in a cart", item)
  //       console.log("before add cart", cart)
  //   		cart.push(item)
  //   		console.log("after add cart", cart)
  //   	})}
  //   	console.log(item);
  //   	if(cart.indexOf(item) !== -1) return;
  //   	setCart([...cart, item]);
  //   }

	const handleChange = (item, d) => {
    console.log("Came to handel change function");
    console.log("Cart itme in handle change", item, d)
    console.log("to find cart index", cart)
		const ind = cart.indexOf(item);
    console.log("Index ind is ", ind);
		const arr = cart;
		arr[ind].quantity += d;
    console.log("Index after update is ", arr[ind].quantity)

		if(arr[ind].quantity === 0 ) {
      console.log("This is the right place", arr[ind])
			return handleRemove(arr[ind].id);
    }
		setCart([...arr])
	}
   
    return (  
      <Router>
        <div className='App'> 
          <Routes>
            <Route path="" element={<HomePage/>} />
            {/* <Route path="/food" element={<FoodProduct />} /> */}
            <Route path="/order" element={<FoodProduct cart={cart} handleClick={handleClick} handleChange={handleChange}/>} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginForm handleClear={handleClear}/>} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} handleChange={handleChange} handleClear={handleClear} handlePrice={handlePrice} handleRemove={handleRemove} price={price}/>} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/logout" element={<LoginForm handleClear={handleClear}/>} />
          </Routes>
        </div>  
      </Router>
    )  
   
}  
export default Routing;