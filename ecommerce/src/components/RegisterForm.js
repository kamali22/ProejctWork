import React ,{useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/RegisterStyle.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {

  const [values, setValues] = useState({
    uname: "",
    email: "",
    password: "",
    address1: "",
    address2: "",
    address3: "",
    pincode: "",
    category: ""
  });

  const [nameErr, setNameErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [addressErr, setAddressErr] = useState({});
  const [pincodeErr, setPincodeErr] = useState({});
  const [searchFilter, setSearchFilter] = useState({});

  let navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log("in handle change");
    setValues({...values, [name]: value});
    validateField(name, value);
  }

  const validateField = (fieldName, value) => {
    //console.log("in validate field", fieldName, value);
    const nameErr = {};
    const emailErr = {};
    const passwordErr = {};
    const addressErr = {};
    const pincodeErr = {};
    let isValid = true;

    switch(fieldName) {
      case 'uname':
        //console.log("fieldname", fieldName, values.uname.match(/^[a-zA-Z\-]+$/))
        if(!(value.match(/^[a-zA-Z\-]+$/))) {
          nameErr.nameInvalid = "Name accepts only alphabets";
          isValid = false;
          break;
        }
      case 'email':
        if(!(value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))){
          emailErr.emailInvalid = "Invalid mail id";
          isValid = false;
          break;
        }
        else {
          axios.get('http://localhost:9000/posts').then((res) => {
            //console.log(res.data);
            Object.values(res.data).map((item) => {
              //console.log("Email", item.email);
              if(item.email == value) {
                //console.log("ALREADY EXISTS", item.email, value);
                emailErr.emailExists = "Email already exists";
                isValid = false;
              }
              else {
                //console.log("NEW EMAIL");
              }
            })
          })
        }
      case 'password':
        if(values.password.length != 0) {
          if(value.length < 6) {
            passwordErr.passwordShort = "Password is too short";
            isValid = false;
            break;
          }
          if(value.length > 12) {
            passwordErr.passwordLong = "Password is too long";
            isValid = false;
            break;
          }
          if(!(value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))) {
            passwordErr.passwordInvalid = "Password must contain atleast one uppercase, lowercase letters, number and special characters";
            isValid = false;
            break;
          }
        }
      case 'pincode':
        if(!(value.match(/^[0-9]+$/))) {
          pincodeErr.pinInvalid = "Pincode accepts numbers only";
          isValid = false;
          break;
        }
        if(value.length != 6) {
          pincodeErr.picodeLength = "Pincode must contain 6 digits only";
          isValid = false;
          break;
        }
    }

    setNameErr(nameErr);
    setEmailErr(emailErr);
    setPasswordErr(passwordErr);
    setPincodeErr(pincodeErr);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("input values are ", values);
    //console.log("CATEGORY", values.category);
    const isValid = formValidation();
    //console.log("isValid in handlesubmit is ", isValid);
    if(isValid) {
      const { uname, email, password, address1, address2, address3, pincode, category} = values;
      const user = { uname, email, password, address1, address2, address3, pincode, category};
      await axios.post('http://localhost:9000/posts', user);
      setValues({ uname:'', email:'', password:'', address1:'', address2:'', address3:'', pincode:'', category:''});
      if(values.category == 'buyer') {
        navigate('/buyer');
        toast.success('Signed up successfully!');
      }
      else {
        navigate('/dashboard');
        toast.success('Signed up successfully!');
      }
    }
  }

  const formValidation = () => {
    const nameErr = {};
    const emailErr = {};
    const passwordErr = {};
    const addressErr = {};
    const pincodeErr = {};
    let isValid = true;
    
    if(!(values.uname.match(/^[a-zA-Z\-]+$/))) {
      nameErr.nameInvalid = "Name accepts only alphabets";
      isValid = false;
    }
    
    if(!(values.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))){
      emailErr.emailInvalid = "Invalid mail id";
      isValid = false;
    }
    // fetch('http://localhost:9000/posts')
    // .then(res => res.json()
    // .then((data) => setSearchFilter(data)));

    // if(searchFilter.filter((info) => info.email.includes(values.email))) {
    //   emailErr.emailTaken = "Email already taken";
    //   isValid = false;
    // }

    if(!(values.pincode.match(/^[0-9]+$/))) {
      pincodeErr.pinInvalid = "Pincode accepts numbers only";
      isValid = false;
    }
    if(values.pincode.length != 6) {
      pincodeErr.picodeLength = "Pincode must contain 6 digits only";
      isValid = false;
    }

    if(values.password.length != 0) {
      if(values.password.length < 6) {
        passwordErr.passwordShort = "Password is too short";
        isValid = false;
      }
      if(values.password.length > 12) {
        passwordErr.passwordLong = "Password is too long";
        isValid = false;
      }
      if(!(values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))) {
        passwordErr.passwordInvalid = "Password must contain atleast one uppercase, lowercase letters, number and special characters";
        isValid = false;
      }
    }
    else{
      passwordErr.passwordEmpty = "Password should not be empty";
      isValid = false;
    }

    setNameErr(nameErr);
    setEmailErr(emailErr);
    setPasswordErr(passwordErr);
    setPincodeErr(pincodeErr);
    //console.log("isValid value in validation", isValid);
    return isValid;
  }

  return (
    <div className='register-form'>
      <form onSubmit={handleSubmit}>
        <h1 className='register-header'>Register Here</h1>
        <div className='form-content'>
          <div className='input-field'>
            <label className="form-label">Name </label>
            <input className="form-input" type="text" name="uname" value={values.uname} onChange={(e) => handleChange(e)} placeholder="Enter your name" required/>
          </div>
          {Object.keys(nameErr).map((key) => {
            return <div style={{color: "red"}}>{nameErr[key]}</div>
          })}
          <div className='input-field'>
            <label className="form-label">Email </label>
            <input className="form-input" type="text" name="email" value={values.email} onChange={(e) => handleChange(e)} placeholder="Enter email" required/>
          </div>
          {Object.keys(emailErr).map((key) => {
            return <div style={{color: "red"}}>{emailErr[key]}</div>
          })}
          <div className='input-field'>
            <label className="form-label">Password </label>
            <input className="form-input" type="password" name="password" value={values.password} onChange={(e) => handleChange(e)} placeholder="Enter password" required/>
          </div>
          {Object.keys(passwordErr).map((key) => {
            return <div style={{color: "red"}}>{passwordErr[key]}</div>
          })}
          <div className='input-field'>
            <label className="form-label">Address </label>
            <input className="form-input" type="text" name="address1" value={values.address1} onChange={(e) => setValues({...values, [e.target.name]: e.target.value})} placeholder="Enter address" required/>
            <input className="form-input" type="text" name="address2" value={values.address2} onChange={(e) => setValues({...values, [e.target.name]: e.target.value})} required/>
            <input className="form-input" type="text" name="address3" value={values.address3} onChange={(e) => setValues({...values, [e.target.name]: e.target.value})} />
          </div>
          <div className='input-field'>
            <label className="form-label">Pincode </label>
            <input className="form-input" type="text" name="pincode" value={values.pincode} onChange={(e) => handleChange(e)} placeholder="Enter pincode" required/>
          </div>
          {Object.keys(pincodeErr).map((key) => {
            return <div style={{color: "red"}}>{pincodeErr[key]}</div>
          })}
          <div className='input-field radio-box'>
            <label className="form-label">Category </label>
            <Form.Check inline label="Buyer" type="radio" name="category" value="buyer" onChange={(e)=>{setValues({...values, [e.target.name]: e.target.value})}}/>
            <Form.Check inline label="Seller" type="radio" name="category" value="seller"  onChange={(e)=>{setValues({...values, [e.target.name]: e.target.value})}}/>
          </div>
        </div>
        <div className="action">
          <button>Register</button>
        </div>
        or
        <div className='register-footer'>Already have an account? <Link to="/login">Log In</Link></div>
      </form>
    </div>
  )
}

export default RegisterForm