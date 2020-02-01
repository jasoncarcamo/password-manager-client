import React from "react";
import TokenService from "../../services/TokenService/TokenService";
import { Link } from "react-router-dom";
import "./Login.css";
import UserContext from "../../contexts/UserContext/UserContext";

export default class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            error: ""
        };
    };

    static contextType = UserContext;

    handleEmail = (e)=>{
        this.setState({ email: e.target.value});
    };

    handlePassword = (e) =>{
        this.setState({ password: e.target.value});
    };

    handleForm = (e)=>{
        e.preventDefault();

        fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
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

                this.loadUserInfo();

                this.props.history.push("/user");
            })
            .catch( err => this.setState({ error: err.error}));
    };

    loadUserInfo = ()=>{
        this.context.logIn();
    }

    errorHandler = (error)=>{
        if(error === "No user found"){
            return (
                <p>{error}. Register <Link to="/register">here</Link></p>
            )
        } else{
            return <p>{error}</p>
        }
    }

    render(){
        
        return (
            <section id="login-section">
                <form 
                    id="login-form"
                    onSubmit={this.handleForm}>
                    <fieldset>
                        <legend><p>Log in to your account</p></legend>
                        <label htmlFor="login-email">Email</label>
                        <input 
                            type="email" 
                            id="login-email"
                            onChange={this.handleEmail} 
                            placeholder="Email"
                            required></input>

                        <label htmlFor="login-password">Password</label>
                        <input 
                            type="password" 
                            id="login-password"
                            onChange={this.handlePassword}
                            placeholder="Password"
                            required></input>

                        {this.state.error ? this.errorHandler(this.state.error) : ""}

                        <button 
                            id="login-submit"
                            type="submit">Log In</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}