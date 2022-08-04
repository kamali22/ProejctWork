import React, { useState } from 'react'
import axios from 'axios';

function ValidateForm({fieldName, value}) {
        // const nameErr = {};
        // const emailErr = {};
        // const passwordErr = {};
        // const pincodeErr = {};
        let isValid = true;
        const [formErrors, setFormError] = useState({});
        const [nameErr, setNameErr] = useState({});
        const [emailErr, setEmailErr] = useState({});
        const [passwordErr, setPasswordErr] = useState({});
        const [pincodeErr, setPincodeErr] = useState({});
    
        switch (fieldName) {
          case "uname":
            if (!value.match(/^[a-zA-Z\-]+$/)) {
              nameErr.nameInvalid = "Name accepts only alphabets";
              isValid = false;
              formErrors.nameErr = nameErr;
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
                  if (item.email == value) {
                    emailErr.emailExists = "Email already exists";
                    isValid = false;
                  } 
                });
              });
              formErrors.emailErr = emailErr;
            }
          case "password":
            if (value.password.length != 0) {
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
              formErrors.passwordErr = passwordErr;
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
            formErrors.pincodeErr = pincodeErr;
        }
    
        setNameErr(nameErr);
        setEmailErr(emailErr);
        setPasswordErr(passwordErr);
        setPincodeErr(pincodeErr);
        setFormError(formErrors)

        return (
            <div>ValidateForm
                {Object.keys(formErrors).map((fieldName, i) => {
                    if(formErrors[fieldName].length > 0){
                        return (
                        <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                        )        
                    } else {
                        return '';
                    }
                    })}
                        </div>
                    )
                };
  


export default ValidateForm