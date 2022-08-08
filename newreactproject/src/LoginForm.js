import axios from "axios";
import React , { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./assests/Styles/style.css";

function LoginForm({handleClear}) {
 
    const [data, setData] = useState({
      email: '',
      password: '',
  });
    const [persons, setPersons] = useState([]);

    const [error, setError] = useState(false);
  
    // const handleChange = name => e => {
    //   setData({ ...data, [name]: e.target.value });
    // };
  
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/order`; 
      navigate(path);
      window.alert("Logged in successfully");
      
    }
    
    const handleDataSubmit = async (e) => {
      console.log("in handle submit")
      e.preventDefault();
      axios.get("http://localhost:9000/posts").then(res => {const persons=res.data; setPersons([persons]); })
      Object.values(persons).map(userdata => {
        for (var i=0; i < userdata.length; i++) { //filter object
          if (data.email === userdata[i].email && data.password === userdata[i].password) {
            routeChange();
        }
        else{
            setError({error: true})
        }
        }
      })         
    };

    const errorMessage = () => {
        return (
          <div
            className="error"
            style={{
              display: error ? '' : 'none',
            }}>
            <h3>Invalid credentials!</h3>
          </div>
        );
      };
   
    return (
        <div className="form">
            <Nav />
            {/* {handleClear} */}
            <div className="border">
                <h2 className="header">Login Here</h2>
                <div style={{textAlign: "center"}}>{ errorMessage() }</div>
                <form >
                    <label className="label">Email</label>
                    <input className="input"
                    value={data.email} type="email" placeholder='Enter Email' name="email" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}/>  
            
                    <label className="label">Password</label>
                    <input className="input"
                    value={data.password} type="password" placeholder='Enter password' name="password" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}/>

                    <button className="button" type="submit" onClick={handleDataSubmit}>
                        Log In
                    </button>
                    <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
  }
export default LoginForm;