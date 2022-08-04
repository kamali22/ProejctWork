import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "/home/kamali/react/ecommerce/src/styles/LoginStyle.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [persons, setPersons] = useState([]);
  const [error, setError] = useState(false);
  const cookies = new Cookies();

  let navigate = useNavigate();
  const sellerPage = () => {
    navigate("/dashboard");
    toast.success("Logged in successfully!", { autoClose: 500 });
  };
  const buyerPage = (id) => {
    axios.get("http://localhost:9000/posts" + "/" + id).then((res) => {
      toast.success("Logged in successfully!", { autoClose: 100 });
      navigate("/buyer", { state: res.data });
      cookies.set("name", res.data.id);
    });
  };

  const errorMessage = () => {
    return (
      <div style={{ color: "red" }}>{error ? "Invalid credentials" : ""}</div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:9000/posts").then((res) => {
      const persons = res.data;
      setPersons([persons]);
      Object.values(persons).map((userdata) => {
        if (
          data.email === userdata.email &&
          data.password === userdata.password
        ) {
          if (userdata.category === "seller") {
            sellerPage();
            console.log('seller');
          } 
          if (userdata.category === "buyer") {
            console.log("buyer");
            buyerPage(userdata.id);
            
          }         
        } else {
          setError(true);
        }
      });
    });
  };

  return (
    <div class="login-form">
      <form onSubmit={handleSubmit}>
        <h1 className="login-header">Login Here</h1>
        <div>{errorMessage()}</div>
        <div class="form-content">
          <div class="input-field">
            <label className="form-label">Email </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              placeholder="Enter email"
            />
          </div>
          <div class="input-field">
            <label className="form-label">
              Password <sapn className="required"></sapn>
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              placeholder="Enter Password"
            />
          </div>
        </div>
        <div class="action">
          <button>Login</button>
        </div>
        or
        <div className="login-footer">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
export default LoginForm;
