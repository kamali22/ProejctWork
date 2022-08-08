import React, { Component } from 'react';
import "./App.css";

class Nav extends Component {
  render() {
    return (
     <nav>
         <ul className='nav-link'>
             <li>Home</li>
             <li>About</li>
             <li>Shop</li>
         </ul>
     </nav>
    )
  }
}

export default Nav