import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "/home/kamali/react/ecommerce/src/styles/RegisterStyle.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ValidateForm from "./ValidateForm";

function RegisterForm() {
  const [values, setValues] = useState({
    uname: "",
    email: "",
    password: "",
    address1: "",
    address2: "",
    address3: "",
    pincode: "",
    category: "",
  });

  const [nameErr, setNameErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [pincodeErr, setPincodeErr] = useState({});

  let navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    validateField(name, value);
    // <ValidateForm name={name} value={value} />
  };

  const validateField = (fieldName, value) => {
    const nameErr = {};
    const emailErr = {};
    const passwordErr = {};
    const pincodeErr = {};
    let isValid = true;

    switch (fieldName) {
      case "uname":
        if (!value.match(/^[a-zA-Z\-]+$/)) {
          nameErr.nameInvalid = "Name accepts only alphabets";
          isValid = false;
          break;
        }
      case "email":
        if (!value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
          emailErr.emailInvalid = "Invalid mail id";
          isValid = false;
          break; 
        } else {
          axios.get("http://localhost:9000/posts").then((res) => {
            Object.values(res.data).map((item) => {
              if (item.email === value) { 
                emailErr.emailExists = "Email already exists";
                isValid = false;
              } 
            });
          });
          break;
        }
      case "password":
        if (values.password.length != 0) {
          if (value.length < 6) {
            passwordErr.passwordShort = "Password is too short";
            isValid = false;
            break;
          }
          if (value.length > 12) {
            passwordErr.passwordLong = "Password is too long";
            isValid = false;
            break;
          }
          if (
            !value.match(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            )
          ) {
            passwordErr.passwordInvalid =
              "Password must contain atleast one uppercase, lowercase letters, number and special characters";
            isValid = false;
            break;
          }
        }
      case "pincode":
        if (!value.match(/^[0-9]+$/)) {
          pincodeErr.pinInvalid = "Pincode accepts numbers only";
          isValid = false;
          break;
        }
        if (value.length != 6) {
          pincodeErr.picodeLength = "Pincode must contain 6 digits only";
          isValid = false;
          break;
        }
    }
    setNameErr(nameErr);
    setEmailErr(emailErr);
    setPasswordErr(passwordErr);
    setPincodeErr(pincodeErr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const {
        uname,
        email,
        password,
        address1,
        address2,
        address3,
        pincode,
        category,
      } = values;
      const user = {
        uname,
        email,
        password,
        address1,
        address2,
        address3,
        pincode,
        category,
      };
      await axios.post("http://localhost:9000/posts", user);
      setValues({
        uname: "",
        email: "",
        password: "",
        address1: "",
        address2: "",
        address3: "",
        pincode: "",
        category: "",
      });
      if (values.category == "buyer") {
        navigate("/buyer");
        toast.success("Signed up successfully!", { autoClose: 500 });
      } else {
        navigate("/dashboard");
        toast.success("Signed up successfully!", { autoClose: 500 });
      }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <h1 className="register-header">Register Here</h1>
        <div className="form-content">
          <div className="input-field">
            <label className="form-label">Name </label>
            <input
              className="form-input"
              type="text"
              name="uname"
              value={values.uname}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your name"
              required
            />
          </div>
          {Object.keys(nameErr).map((key) => {
            return <div style={{ color: "red" }}>{nameErr[key]}</div>;
          })}
          <div className="input-field">
            <label className="form-label">Email </label>
            <input
              className="form-input"
              type="text"
              name="email"
              value={values.email}
              onChange={(e) => handleChange(e)}
              placeholder="Enter email"
              required
            />
          </div>
          {Object.keys(emailErr).map((key) => {
            return <div style={{ color: "red" }}>{emailErr[key]}</div>;
          })}
          <div className="input-field">
            <label className="form-label">Password </label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={values.password}
              onChange={(e) => handleChange(e)}
              placeholder="Enter password"
              required
            />
          </div>
          {Object.keys(passwordErr).map((key) => {
            return <div style={{ color: "red" }}>{passwordErr[key]}</div>;
          })}
          <div className="input-field">
            <label className="form-label">Address </label>
            <input
              className="form-input"
              type="text"
              name="address1"
              value={values.address1}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              placeholder="Enter address"
              required
            />
            <input
              className="form-input"
              type="text"
              name="address2"
              value={values.address2}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              required
            />
            <input
              className="form-input"
              type="text"
              name="address3"
              value={values.address3}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="input-field">
            <label className="form-label">Pincode </label>
            <input
              className="form-input"
              type="text"
              name="pincode"
              value={values.pincode}
              onChange={(e) => handleChange(e)}
              placeholder="Enter pincode"
              required
            />
          </div>
          {Object.keys(pincodeErr).map((key) => {
            return <div style={{ color: "red" }}>{pincodeErr[key]}</div>;
          })}
          <div className="input-field radio-box">
            <label className="form-label">Category </label>
            <Form.Check
              inline
              label="Buyer"
              type="radio"
              name="category"
              value="buyer"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
            <Form.Check
              inline
              label="Seller"
              type="radio"
              name="category"
              value="seller"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="action">
          <button>Register</button>
        </div>
        or
        <div className="register-footer">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
