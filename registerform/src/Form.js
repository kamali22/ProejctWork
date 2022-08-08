import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';
import './style.css';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      formErrors: {username: '', email: '', password: ''},
      usernameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'username':
        usernameValid = value.match(/^[a-zA-Z\-]+$/);
        fieldValidationErrors.username = usernameValid ? '' : 'accepts only alphabets';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    usernameValid: usernameValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.usernameValid && this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className="navbar">
            <h1 className="head">Go</h1>
            <h1 className="head">Simpletax</h1>
        </div>
        <div>
            <h1 className="sidebar">Start your free trial</h1>
            <h1 className="sidebar one">- no credit card required!</h1>
            <p> ✔ Simple and easy to use </p>
            <p>✔ Save time and hassle </p>
            <p>✔ Save money</p>               
            <p>✔ Nothing to install, runs everywhere </p> 
            <p>✔ 100% compatible with HMRC </p>   
            <p>✔ Making Tax Digital ready </p>
           <p>✔ No obligation, cancel at anytime!</p>
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.username)}`}>
          <label htmlFor="email">First Name</label>
          <input type="text" required className="form-control" name="username"
            placeholder="First Name"
            value={this.state.username}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
      </form>
    )
  }
}

export default Form;