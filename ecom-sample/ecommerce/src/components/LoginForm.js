import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginStyle.css";
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
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const cookies = new Cookies();

  let navigate = useNavigate();
  const sellerPage = () => {
    navigate("/dashboard");
    toast.success("Logged in successfully!", { autoClose: 500 });
  };
  const buyerPage = async (id) => {
    let toast = true;
    axios.get("http://localhost:9000/posts" + "/" + id).then((res) => {
      console.log("Login data to be passed", res.data);
      navigate("/buyer", { state: res.data });
      cookies.set("name", res.data.id);
    });
    toast.success("Logged in successfully!", { autoClose: 500 });
    console.log("cookie value", cookies.get("name"));
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
      console.log("login res", persons);
      console.log("LOGIN CREDENTIALS", persons, "persons[0]", persons[0]);
      Object.values(persons).map((userdata) => {
        console.log(
          "email and password is",
          data.email,
          data.password,
          "userdata email and password",
          userdata.email,
          userdata.password
        );
        if (
          data.email === userdata.email &&
          data.password === userdata.password
        ) {
          console.log("MATCHED");
          console.log("BUYER OR SELLER IS", userdata.category);
          if (userdata.category == "seller") {
            sellerPage();
          } else {
            buyerPage(userdata.id);
            toast.success("Logged In successfully", { autoClose: 500 });
          }
        } else {
          console.log("Not matched");
          setError({ error: true });
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
