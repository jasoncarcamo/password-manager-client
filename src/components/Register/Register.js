import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/TokenService/TokenService";
import "./Register.css";

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
        const div = document.getElementById("password-matches");
        
        if(this.state.password === this.state.confirmPassword){
            div.style.backgroundColor = "green"
            return <p>Great! Your password matches</p>
        } else{
            div.style.backgroundColor = "red"
            return <p>Your passwords do not match</p>
        }
        
    };

    validatePassword = (password) => {
        
        const REGEX_UPPER_LOWER_NUMBER_SPECIAL = (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/);

        const requirements = [ 
            <span key={0} className="reg_error" style={{color: 'gray'}}>Password must be longer than 8 characters</span>,
            <span key={1} className="reg_error" style={{color: 'gray'}}>Password must be less than 72 characters</span>,
            <span key={2} className="reg_error" style={{color: 'gray'}}>Password must not start or end with empty spaces</span>,
            <span key={3} className="reg_error" style={{color: 'gray'}}>Password must contain one upper case, lower case, number and special character</span>
        ]

        if(password.length > 1){
            if (password.length > 8) {
                requirements[0] = <span key={0} className="reg_error" style={{color: 'green'}}>Password must be longer than 8 characters</span>
              } else{
      
              }
      
              if (password.length < 72) {
                requirements[1] = <span key={1} className="reg_error" style={{color: 'green'}}>Password must be less than 72 characters</span>
              } else{
      
              };
      
              if (!password.startsWith(' ') || !password.endsWith(' ')) {
                requirements[2] = <span key={2} className="reg_error" style={{color: 'green'}}>Password must not start or end with empty spaces</span>
              } else{
                
              };
      
              if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
                  requirements[3] = <span key={3} className="reg_error" style={{color: 'gray'}}>Password must contain one upper case, lower case, number and special character</span>
              } else{
                  requirements[3] = <span key={3} className="reg_error" style={{color: 'green'}}>Password must contain one upper case, lower case, number and special character</span>
              };
        }
        
        return requirements
    }

    handleForm = (e)=>{
        e.preventDefault();

        if(this.state.password !== this.state.confirmPassword){
            this.setState({ error: "Your password must match. Please confirm your password"});
            return;
        }

        fetch("https://still-crag-51210.herokuapp.com/api/register", {
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

                this.props.history.push("/user");

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
            <section id="register-section">

                <h4>Register for free and never forget your passwords to any of your most used sites</h4>
                
                <section>
                    <section>
                        <p>Free</p>
                        <p>No one will ever contact you asking for information</p>
                        <p>Your passwords are hashed, salted, and protected from cross site scripting</p>
                    </section>

                    <form 
                        id="register-form"
                        onSubmit={this.handleForm}>
                        <fieldset>

                            <label htmlFor="register-first-name">First name</label>
                            <input
                                type="text"
                                onChange={this.handleFirstName}
                                placeholder="First name"
                                required></input>

                            <label htmlFor="register-Last-name">Last name</label>
                            <input 
                                type="text"
                                onChange={this.handleLastName}
                                placeholder="Last name"
                                required></input>

                            <label htmlFor="register-email">Email</label>
                            <input 
                                type="email" 
                                id="register-email" 
                                onChange={this.handleEmail}
                                placeholder="Email"
                                required></input>

                            <label htmlFor="register-password">Password</label>
                            <input 
                                type="password" 
                                id="register-password" 
                                onChange={this.handlePassword}
                                placeholder="Password"
                                required></input>
                            
                            <div id="password-confirm-box">
                                {this.validatePassword(this.state.password)}
                            </div>

                            <label htmlFor="register-confirm-password">Retype your password</label>
                            <input 
                                type="password"
                                id="register-confirm-password"
                                onChange={this.handleconfirmPassword}
                                placeholder="Retype your password"
                                required></input>
                            <div id="password-matches"></div>
                            {this.state.password && this.state.confirmPassword ? this.passwordMatch() : ""}


                            {this.state.error ? this.errorHandler(this.state.error) : ""}

                            <button 
                            id="register-submit"
                            type="submit">Sign Up</button>
                        </fieldset>
                    </form>
                </section>

                
            </section>
        );
    };
};