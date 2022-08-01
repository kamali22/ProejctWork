import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie/es6';
import SellerNavBar from '../sellerComponents/SellerNavBar';

function UpdateProfile({handleBuyerSearch, handleClear, cart}, props) {
    const isSeller = false;
    const isMenu = false;
    const [data,setData] = useState();
    const location = useLocation();
    const cookies = new Cookies();
    //const { from } = location.state;
    const index = cookies.get('name');
    console.log("user personal details in update profile", location, location.state, props, cookies.get('name'));
    const retrieveData = () => {
      axios.get('http://localhost:9000/posts' + '/' + index).then((res) => {
        console.log("for updating profile", res.data);
        setData(res.data);
      })
    }

    const handleSubmit = () => {
      console.log("in handle submit");
    }

    const handleUpdate = async (e) => {
      e.preventDefault();
      console.log("IN PRODUCT HANDLE SUBMIT", data);
      const {uname, email, password, address1, address2, address3, pincode, category} = data;
      const user = {uname, email, password, address1, address2, address3, pincode, category};
      await axios.put('http://localhost:9000/posts' + '/' + index, user);
      setValues({uname:'', email:'', password:'', address1:'', address2:'', address3:'', pincode:'', category:''});
      //toast.success("Product updated!", {autoClose:500})
      //navigate('/dashboard');
  }

    const handleChange = (e) => {
      console.log("PRODUCT values is", e.target.value);
      setValues({...data, [e.target.name]: e.target.value})
  }

    console.log("DAta after set", data);
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
    console.log("VALUESSSSSSSSSSSS", values)
    useEffect(() => {
      retrieveData()
    }, []);

  return (
    <div>
        {/* <SellerNavBar isSeller={isSeller}  isMenu={isMenu} handleBuyerSearch={handleBuyerSearch} handleClear={handleClear} cart={cart} /> */}
         <h1>Update Profile</h1>
        <form onSubmit={handleUpdate}>
        <h1 className='register-header'>Update Here</h1>
        <div className='form-content'>
        <div className='product-input-field'>
                <label className='form-label'>Name </label>
                <input type="text" name="uname" value={data.uname} className='product-form-input' placeholder="Product Name" onChange={handleChange} required contentEditable/>
            </div>
          <div className='input-field'>
            <label className="form-label">Email </label>
            <input className="form-input" type="text" name="email" value={data?.email} onChange={(e) => handleChange(e)} placeholder="Enter email" required />
          </div>
          <div className='input-field'>
            <label className="form-label">Password </label>
            <input className="form-input" type="password" name="password" value={data?.password} onChange={(e) => handleChange(e)} placeholder="Enter password" required editable/>
          </div>
          <div className='input-field'>
            <label className="form-label">Address </label>
            <input className="form-input" type="text" name="address1" value={data?.address1} onChange={(e) => setValues({...data, [e.target.name]: e.target.value})} placeholder="Enter address" required/>
            <input className="form-input" type="text" name="address2" value={data?.address2} onChange={(e) => setValues({...data, [e.target.name]: e.target.value})} required/>
            <input className="form-input" type="text" name="address3" value={data?.address3} onChange={(e) => setValues({...data, [e.target.name]: e.target.value})} />
          </div>
          <div className='input-field'>
            <label className="form-label">Pincode </label>
            <input className="form-input" type="text" name="pincode" value={data?.pincode} onChange={(e) => handleChange(e)} placeholder="Enter pincode" required/>
          </div>
          <div className='input-field radio-box'>
            <label className="form-label">Category </label>
            <Form.Check inline label="Buyer" type="radio" name="category" value="buyer" onChange={(e)=>{setValues({...data, [e.target.name]: e.target.value})}}/>
            <Form.Check inline label="Seller" type="radio" name="category" value="seller"  onChange={(e)=>{setValues({...data, [e.target.name]: e.target.value})}}/>
          </div>
        </div>
        <div className='product-edit-footer'>
                <span className="product-edit-button" onClick={handleUpdate}>Update</span>
            </div>
      </form> 
    </div>
  )
}

export default UpdateProfile