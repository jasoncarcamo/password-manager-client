import React from 'react';
import TokenService from "../../../services/TokenService/TokenService";
import UserContext from "../../../contexts/UserContext/UserContext";
import "./CreateAccount.css"

export default class CreateAccount extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            url: "",
            email_used: "",
            user_name: "",
            password: "",
            success: false,
            error: ""
        }
    };
    static contextType = UserContext;

    handleUrl = (e)=>{
        this.setState({ url: e.target.value });
    }

    handleEmail = (e)=>{
        this.setState({ email_used: e.target.value });
    }

    handleUserName = (e)=>{
        this.setState({ user_name: e.target.value });
    }

    handlePassword = (e)=>{
        this.setState({ password: e.target.value });
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        
        fetch(`http://localhost:8000/api/accounts`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": `bearer ${TokenService.getToken()}`
            },
            body: JSON.stringify({
                url: this.state.url,
                email_used: this.state.email_used,
                user_name: this.state.user_name,
                password: this.state.password
            })
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                this.addAccounts(resData.account);
            })
            .catch( err => this.setState({ error: err.error}))
    }

    addAccounts = (account)=>{
        this.context.addAccounts(account)
            .then( data => {

                this.setState({ 
                    success: true,
                    url: "",
                    email_used: "",
                    user_name: "",
                    password: ""
                })
                
            });
    };

    renderConfirmBox = ()=>{
        return (
            <section id="create-account-success">
                <p>You have successfully added a new account to your list</p>
                <button onClick={()=>{ this.props.history.push("/user")}}>Ok</button>
            </section>
        )
    }

    render(){
        return (
            <section>
                {this.state.success ? this.renderConfirmBox() : ""}
                <form onSubmit={this.handleSubmit}>
                    <legend>New account</legend>
                    <fieldset>

                        <label htmlFor="new-acc-url">Company website</label>
                        <input 
                            type="text"
                            placeholder="google.com"
                            onChange={this.handleUrl}
                            required></input>

                        <label htmlFor="new-acc-email">Email used</label>
                            <input 
                                type="text"
                                onChange={this.handleEmail}
                                placeholder="something@email.com"
                                ></input>

                        <label htmlFor="new-acc-username">Username</label>
                            <input 
                                type="text"
                                placeholder="Username if applicable"
                                onChange={this.handleUserName}
                                required></input>

                        <label htmlFor="new-acc-password">Password</label>
                            <input 
                                type="text"
                                onChange={this.handlePassword}
                                required></input>

                        <button type="submit">Add</button>
                    </fieldset>                    
                </form>
            </section>
        )
    }
}