import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/TokenService/TokenService";

export default class Register extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            error: ""
        }
    }

    handleFirstName = (e) =>{
        this.setState({ first_name: e.target.value});
    }

    handleLastName = (e) => {
        this.setState({ last_name: e.target.value});
    };

    handleEmail = (e)=>{
        this.setState({ email: e.target.value});
    }

    handlePassword = (e)=>{
        this.setState({ password: e.target.value});
    }

    handleconfirmPassword = (e)=>{
        this.setState({ confirmPassword: e.target.value});
    };

    passwordMatch = ()=>{
        
        if(this.state.password === this.state.confirmPassword){

            return <p>Great! Your password matches</p>
        } else{

            return <p>Your passwords do not match</p>
        }
        
    };

    validatePassword = (password) => {
        
        const REGEX_UPPER_LOWER_NUMBER_SPECIAL = (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/);

        if (password.length < 8) {
          return <span className="reg_error" style={{color: 'red'}}>Password must be longer than 8 characters</span>
        }
        if (password.length > 72) {
          return <span className="reg_error" style={{color: 'orange'}}>Password must be less than 72 characters</span>
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
          return <span className="reg_error" style={{color: 'orange'}}>Password must not start or end with empty spaces</span>
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
          return <span className="reg_error" style={{color: 'orange'}}>Password must contain one upper case, lower case, number and special character</span>
        }
        return <span className="reg_error" style={{color: 'green'}}>Looking good!</span>
    }

    handleForm = (e)=>{
        e.preventDefault();

        if(this.state.password !== this.state.confirmPassword){
            this.setState({ error: "Your password must match. Please confirm your password"});
            return;
        }

        fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then( res => {
                if( !res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                
                TokenService.saveToken(resData.token);

                this.props.history.push("/");

            })
            .catch( err => this.setState({ error: err.error}));

    }

    errorHandler = (error) => {
        if(error == "You seem to have account already. Log in"){
            return (
                <p>{error} <Link to="/login"> here</Link></p>
            );
        } else{
            return <p>{error}</p>
        };
    }

    render(){
        return (
            <section>
                <form onSubmit={this.handleForm}>
                    <fieldset>

                        <label htmlFor="register-first-name">First name</label>
                        <input
                            type="text"
                            onChange={this.handleFirstName}
                            required></input>

                        <label htmlFor="register-Last-name">Last name</label>
                        <input 
                            type="text"
                            onChange={this.handleLastName}
                            required></input>

                        <label htmlFor="register-email">Email</label>
                        <input 
                            type="email" 
                            id="register-email" 
                            onChange={this.handleEmail}
                            required></input>

                        <label htmlFor="register-password">Password</label>
                        <input 
                            type="password" 
                            id="register-password" 
                            onChange={this.handlePassword}
                            required></input>
                        {this.state.password ? this.validatePassword(this.state.password) : ""}

                        <label htmlFor="register-confirm-password">Retype your password</label>
                        <input 
                            type="password"
                            id="register-confirm-password"
                            onChange={this.handleconfirmPassword}
                            required></input>
                        {this.state.password && this.state.confirmPassword ? this.passwordMatch() : ""}


                        {this.state.error ? this.errorHandler(this.state.error) : ""}

                        <button type="submit">Sign Up</button>
                    </fieldset>
                </form>
            </section>
        );
    };
};