import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SellerNavBar from "./SellerNavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/home/kamali/react/ecommerce/src/styles/ProductStyle.css";

function ProductForm() {
  const [values, setValues] = useState({
    prname: "",
    image: "",
    amount: "",
    quantity: "",
    category: "",
    description: "",
  });

  const isSeller = true;
  const location = useLocation();
  const items = location.state;
  let navigate = useNavigate();
  console.log("REDIRECTED ITEM IS", items);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("IN PRODUCT HANDLE SUBMIT", values);
    const { prname, image, amount, quantity, category, description } = values;
    const user = { prname, image, amount, quantity, category, description };
    await axios.post("http://localhost:9000/products", user);
    const variety = {type: values.category};
    setValues({
      prname: "",
      image: "",
      amount: "",
      quantity: "",
      category: "",
      description: "",
    });
    toast.success("New product added!", { autoClose: 500 });
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    console.log("PRODUCT values is", e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <SellerNavBar isSeller={isSeller} />
      <div className="product-form">
        <form onSubmit={handleSubmit}>
          <div className="product-input-field">
            <label className="form-label">Name </label>
            <input
              type="text"
              name="prname"
              value={values.prname}
              className="product-form-input"
              placeholder="Product Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="product-input-field">
            <label className="form-label">Image </label>
            <input
              type="text"
              name="image"
              value={values.image}
              className="product-form-input"
              placeholder="Add image path"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div className="product-input-field">
            <label className="form-label">Amount </label>
            <input
              type="text"
              name="amount"
              value={values.amount}
              className="product-form-input"
              placeholder="Product Amount"
              onChange={(e) => {
                console.log("AMOUNT is ", [e.target.name], e.target.value);
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
              required
            />
          </div>
          <div className="product-input-field">
            <label className="form-label">Quantity </label>
            <input
              type="number"
              name="quantity"
              value={values.quantity}
              className="product-form-input"
              placeholder="Product Quantity"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Choose category:</label>
            <select name='category' onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })}>
              <option value='electronics'>Electronics</option>
              <option value='furniture'>Furniture</option>
              <option value='grocery'>Grocery</option>
              <option value='cosmetics'>Cosmetics</option>
            </select>
          </div>
          <div className="product-input-field">
            <label className="form-label">Description </label>
            <textarea
              type="text"
              name="description"
              value={values.description}
              className="product-form-input-description"
              rows="3"
              placeholder="Product Description"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="product-footer">
            <button className="product-action">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
