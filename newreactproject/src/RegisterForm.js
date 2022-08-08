import { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import "./assests/Styles/style.css";
import "./assests/Styles/required_style.css";
import Nav from './Nav';
import axios from 'axios';

export default function RegisterForm() {
 
  const [values, setValues] = useState({
    email: '',
    password: '',
    address: "",
    loggedIn: true,
});
  
  const [emailErr, setEmailErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [addressErr, setAddressErr] = useState({});

  // const handleChange = name => (e) => {
  //   setValues({ ...values, [name]: e.target.value });
  // };  

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/order`; 
    navigate(path);
    window.alert("Registered successfully");
  }
  
  const handleDataSubmit = async (e) => {
    e.preventDefault();
    console.log("In handle data submit")
    const isValid = formValidation();
    console.log("IS VALID VALUE IS ", isValid)
    if(isValid) {
      const { email, password, address , loggedIn} = values;
      const user = { email, password, address , loggedIn};
      await axios.post('http://localhost:9000/posts', user);
      setValues({ email: '', password: '', address:'' });
      routeChange();
    }
};

  const formValidation = () => {
    const emailErr = {};
    const passwordErr = {};
    const addressErr = {};
    let isValid = true;

    if(!(values.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))){
      emailErr.emailInvalid = "Invalid mail id";
      isValid = false;
    }
    if (values.password.length < 6 || values.password.length > 12) {
      console.log("Within password validation")
      passwordErr.passwordLength = "Password should contains min 6 and max 12 chars";
      isValid = false;
    }
    if(values.address.length == 0) {
      addressErr.addressErrLen = "Address should not be empty";
      isValid = false;
    }

    setEmailErr(emailErr);
    setPasswordErr(passwordErr);
    setAddressErr(addressErr);
    console.log("isValid value in email validation", isValid, emailErr, passwordErr, addressErr)
    return isValid;
  } 
  
  return (
    <div className="form">
        <Nav />
        <div className='border'>
            <div><h2 className='header'>Register Here</h2></div>
 
            <form > 
                <label className="label">Email</label>
                <input onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} className="input" value={values.email} type="email" name="email" placeholder='Enter Email' />
                {Object.keys(emailErr).map((key) => {
                  return <div style={{color: "red"}}>{emailErr[key]}</div>
                })}

                <label className="label">Password</label>
                <input onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} className="input required-field" value={values.password} type="password" name="password" placeholder='Enter password' />
                {Object.keys(passwordErr).map((key) => {
                  return <div style={{color: "red"}}>{passwordErr[key]}</div>
                })}

                <label className="label">Address</label>
                <textarea onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} className="input address required-field" value={values.address} type="text" name="address" placeholder='Enter Address' />  
                {Object.keys(addressErr).map((key) => {
                  return <div style={{color: "red"}}>{addressErr[key]}</div>
                })}

                <button className="button" type="submit" onClick={handleDataSubmit}>
                  Sign Up
                </button>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    </div>
  );
}