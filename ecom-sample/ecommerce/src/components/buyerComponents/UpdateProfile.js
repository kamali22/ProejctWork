import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie/es6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/home/kamali/react/ecommerce/src/styles/UpdateProfile.css";
import SellerNavBar from "../sellerComponents/SellerNavBar";

function UpdateProfile({ handleBuyerSearch, handleClear, cart }, props) {
  const isSeller = false;
  const isMenu = false;
  const [data, setData] = useState();
  const cookies = new Cookies();
  const index = cookies.get("name");
  const retrieveData = () => {
    axios.get("http://localhost:9000/posts" + "/" + index).then((res) => {
      console.log("for updating profile", res.data);
      setData(res.data);
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("IN PRODUCT HANDLE SUBMIT", data);
    toast.success("Profile Updated!", { autoClose: 500 });
    const {
      uname,
      email,
      password,
      address1,
      address2,
      address3,
      pincode,
      category,
    } = data;
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
    await axios.put("http://localhost:9000/posts" + "/" + index, user);
    // setData({
    //   uname: "",
    //   email: "",
    //   password: "",
    //   address1: "",
    //   address2: "",
    //   address3: "",
    //   pincode: "",
    //   category: "",
    // });
  };

  const handleChange = (e) => {
    console.log("PRODUCT values is", e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div>
      <SellerNavBar
        isSeller={isSeller}
        isMenu={isMenu}
        handleBuyerSearch={handleBuyerSearch}
        handleClear={handleClear}
        cart={cart}
      />
      <div className="update-form">
      <form onSubmit={handleUpdate}>
        <h1 className="register-header">Update Here</h1>
          <div className="update-input-field">
            <label className="form-label">Name </label>
            <input type="text" name="uname" value={data?.uname} className="update-form-input" placeholder="Product Name"
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              required
              contentEditable
            />
          </div>
          <div className="update-input-field">
            <label className="form-label">Email </label>
            <input
              className="update-form-input"
              type="text"
              name="email"
              value={data?.email}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              placeholder="Enter email"
              required
              contentEditable
            />
          </div>
          <div className="update-input-field">
            <label className="form-label">Password </label>
            <input
              className="update-form-input"
              type="password"
              name="password"
              value={data?.password}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              placeholder="Enter password"
              required
              contentEditable
            />
          </div>
          <div className="update-input-field">
            <label className="form-label">Address </label>
            <input
              className="update-form-input"
              type="text"
              name="address1"
              value={data?.address1}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              placeholder="Enter address"
              required
            />
            <input
              className="update-form-input"
              type="text"
              name="address2"
              value={data?.address2}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              required
            />
            <input
              className="update-form-input"
              type="text"
              name="address3"
              value={data?.address3}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="update-input-field">
            <label className="form-label">Pincode </label>
            <input
              className="update-form-input"
              type="text"
              name="pincode"
              value={data?.pincode}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              placeholder="Enter pincode"
              required
            />
          </div>
        <div className="update-edit-footer">
          <span className="update-edit-button" onClick={handleUpdate}>
            Update
          </span>
        </div>
      </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
