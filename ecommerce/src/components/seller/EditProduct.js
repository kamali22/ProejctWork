import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/home/kamali/react/ecommerce/src/styles/ProductStyle.css";

function EditProduct() {
  const location = useLocation();
  const items = location.state;
  const navigate = useNavigate();

  const [values, setValues] = useState({
    prname: items.prname,
    image: items.image,
    amount: items.amount,
    quantity: items.quantity,
    category: items.category,
    description: items.description,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { prname, image, amount, quantity, category, description } = values;
    const user = { prname, image, amount, quantity, category, description };
    await axios.put("http://localhost:9000/products" + "/" + items.id, user);
    setValues({
      prname: "",
      image: "",
      amount: "",
      quantity: "",
      category: "",
      description: "",
    });
    toast.success("Product updated!", { autoClose: 500 });
    navigate("/dashboard");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.delete("http://localhost:9000/products" + "/" + items.id);
    setValues({
      prname: "",
      image: "",
      amount: "",
      quantity: "",
      category: "",
      description: "",
    });
    toast.error("Product deleted!", { autoClose: 500 });
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="product-form">
        <form>
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
              contentEditable
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
          <div className="product-input-field">
            <label className="form-label">Category </label>
            <input
              type="text"
              name="category"
              value={values.category}
              className="product-form-input"
              placeholder="Product Category"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              required disabled
            />
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
          <div className="product-edit-footer">
            <span className="product-edit-button" onClick={handleUpdate}>
              Update
            </span>
            <span className="product-edit-button" onClick={handleDelete}>
              Delete
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
