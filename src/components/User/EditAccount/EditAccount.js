import React from "react";
import TokenService from "../../../services/TokenService/TokenService";
import UserContext from "../../../contexts/UserContext/UserContext";
import "./EditAccount.css";

export default class EditAccount extends React.Component{
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

    componentDidMount(){
        
        setTimeout(()=>{
            
            this.getAccountInfo();
        }, 500);
    }

    getAccountInfo = ()=>{
        let account = this.context.accounts.filter( account => account.id === Number.parseInt(this.getId()));
        
        if(!account[0]){
            return;
        };

        this.setState({ 
            url: account[0].url,
            email_used: account[0].email_used,
            user_name: account[0].user_name,
            password: account[0].password
        });
    };

    getId = ()=>{
        let id = this.props.location.pathname.split("/");
        
        return id[id.length - 1];
    }

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

        fetch(`https://still-crag-51210.herokuapp.com/api/accounts/${this.getId()}`, {
            method: "PATCH",
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
                this.refreshAccounts(resData.account);
            })
            .catch( err => this.setState({ error: err.error}))
    };

    refreshAccounts = (account)=>{
        this.context.refreshAccounts( account, account.id)
            .then( data=> {
                
                this.setState({
                    success: true,
                    url: "",
                    email_used: "",
                    user_name: "",
                    password: "",
                });

            });
    };

    renderConfirmBox = ()=>{
        return (
            <section id="edit-account-success">
                <p>You have successfully updated your account</p>
                <button onClick={()=>{ this.props.history.push("/user")}}>Ok</button>
            </section>
        )
    }

    render(){
        
        return (
            <section id="edit-account-section">
                {this.state.success ? this.renderConfirmBox() : ""}
               <form 
                id="edit-account-form"
                onSubmit={this.handleSubmit}>
                    
                    <fieldset>

                        <legend><h3>Edititng account</h3></legend>

                        <label htmlFor="new-acc-url">Company website</label>
                        <input 
                            type="text"
                            placeholder="google.com"
                            onChange={this.handleUrl}
                            value={this.state.url}
                            required></input>

                        <label htmlFor="new-acc-email">Email used</label>
                            <input 
                                type="text"
                                onChange={this.handleEmail}
                                value={this.state.email_used}
                                placeholder="something@email.com"
                                ></input>

                        <label htmlFor="new-acc-username">Username</label>
                            <input 
                                type="text"
                                placeholder="Username if applicable"
                                onChange={this.handleUserName}
                                value={this.state.user_name}
                                required></input>

                        <label htmlFor="new-acc-password">Password</label>
                            <input 
                                type="password"
                                onChange={this.handlePassword}
                                value={this.state.password}
                                required></input>

                                {this.state.error ? <p>{this.state.error}</p> : ""}

                        <button 
                            id="edit-account-submit"
                            type="submit">Edit</button>
                    </fieldset>                    
                </form> 
            </section>
        )
    }
}