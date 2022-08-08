import React, { Component } from 'react'

export class UserForm extends Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
        }
        this.changeFields=this.changeFields.bind(this);
        this.submitUserForm=this.submitUserForm.bind(this);
    }

    changeFields(event) {
        let fields = this.state.fields;
        fields[event.target.name]=event.target.value;
        this.setState({
            fields
        }, ()=>{
            console.log(this.state.fields);
        })
    }

    submitUserForm(event){
        event.preventDefault();
        if(this.validateForm()){
            let fields = {};
            fields["userName"] = " ";
            fields["mobile"] = " ";
            this.setState({
                fields:fields
            })
            alert("Form submitted");
        }
    }

    validateForm() {
        let field = this.state.fields;
        let error = {};
        let formIsValid = true;

        if(!field["userName"]){
            formIsValid = false;
            error["userName"] = "Please enter username";
        }
        if(typeof field["userName"] != "undefined"){
            if (!field["userName"].match(/^[a-zA-Z]*$/)){
                formIsValid = false;
                error["userName"] = "Username accepts alphabets only";
            }
        }
        if(!field["mobile"]){
            formIsValid = false;
            error["mobile"] = "Please enter mobile no";
        }
        if(typeof field["mobile"] != "undefined"){
            if (!field["mobile"].match(/^[0-9]{10}$/)){
                formIsValid = false;
                error["mobile"] = "Mobile no accepts 10 digit numbers only";
            }
        }
        this.setState({
            errors:error
        })
        return formIsValid;
    }

    render() {
        return (
        <div>
            <h4>UserForm</h4>
            <form method="post" name="userRegisteration" onSubmit={ (e)=>this.submitUserForm(e)}>
                <div>
                    <label>Username: </label>
                    <input type="text" name="userName" value={this.state.fields.userName} onChange={ (e) => this.changeFields(e) }/>
                    <span>{this.state.error.userName}</span>
                </div>
                <div>
                    <label>Mobile No: </label>
                    <input type="text" name="userName" value={this.state.fields.mobile} onChange={ (e) => this.changeFields(e) }/>
                    <span>{this.state.error.mobile}</span>
                </div>
                <input type="submit" value="Proceed" />
            </form>
        </div>
        )
    }
}

export default UserForm