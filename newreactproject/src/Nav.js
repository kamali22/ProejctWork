import React from "react";
import { NavLink , Link} from "react-router-dom";
import logo from "./assests/images/y-logo.png";

class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen : false
        }
        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup = () => {
        this.setState({isOpen:true})
    }
    handleClose = () => {
        this.setState({isOpen:false})
    }
    render() {
        const Popup = (props) => {
            return (
              <div className="popup-box">
                <div className="box" align="right">
                  <h1 className="popup-title">Who we are?</h1>
                  <span className="close-icon" onClick={this.handleClose}>x</span>
                  <hr></hr>
                  {props.content}
                </div>
              </div>
            );
          }; 

        return (
            <nav className="navbar fixed-top navbar-expand-sm bg-dark">
                <h2 className="logo-header"><img className="logo" src={logo} alt="" />
                Yumito</h2>

                <ul className="nav-link navbar-nav ms-auto">
                    <li>
                        <NavLink to="/about" activeClassName="active" onClick={this.togglePopup} >About</NavLink>
                    </li>
                    {this.state.isOpen && <Popup
                        content={<>
                            <p className="popup">
                                Our technology platform connects customers,
                                restaurant partners and delivery partners, 
                                serving their multiple needs. Customerrs use
                                our platform to search and discover their
                                favourite food items, read and write customer
                                generated reviews, offers various deals on food 
                                items, order food delivery and make payments
                                while dining-out at restaurants. We provide 
                                high quality food items delivered within a 
                                short span of time.
                            </p>
                            <Link to="/login" className="about-nav">Login</Link>
                            <Link to="/register" className="about-nav">Sign Up</Link>
                        </>}
                        handleClose={this.togglePopup} 
                    />}
                    <li>
                        <NavLink to="/login" activeClassName="active">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" activeClassName="active">Signup</NavLink>
                    </li>
                    
                </ul>
            </nav>
        );
    }
}

export default Nav;