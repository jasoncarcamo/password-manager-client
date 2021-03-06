import React from "react";
import TokenServcie from "../../../../services/TokenService/TokenService";
import UserContext from "../../../../contexts/UserContext/UserContext";
import "./Account.css";
import $ from "jquery";


export default class Account extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            account: {},
            delete: false,
            success: false,
            error: ""
        };
    };

    static contextType = UserContext;

    editAccount = ()=>{
        this.props.history.push(`/user/edit-account/${this.props.account.id}`)
    };

    handleDelete = (e)=>{
        e.preventDefault();

        fetch(`https://still-crag-51210.herokuapp.com/api/accounts/${this.props.account.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "authorization": `bearer ${TokenServcie.getToken()}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                
                this.refreshContext();

            })
            .catch( err => this.setState({ error: err.error }));
    }

    refreshContext = ()=>{
        this.context.deleteAccount(this.props.account.id)
            .then( data =>{
                this.setState({
                    success: true
                })
            })
    }

    confirmDelete = ()=>{
        return (
            <details key={this.props.index}>
                <summary>
                    <img src={`//logo.clearbit.com/${this.props.account.url}`} alt={"No icon available for " + this.props.account.url}></img>
                    
                    {this.props.account.url}
                </summary>
                
                <p>Are you sure?</p>
                <div className="confirmation-buttons">
                    <button onClick={this.handleDelete}>Yes</button>
                    <button onClick={()=>{ this.setState({ delete: false})}}>Cancel</button>
                </div>
            </details>
        )
    }

    renderConfirmDelete = ()=>{
        return (
            <section>
                <p>You have successfully deleted this account</p>

                <button onClick={()=>{this.props.hisory.push("/user")}}>Ok</button>
            </section>
        );
    };

    //Toggles the visiblity of the current account password
    togglePassword = (e) =>{
        const input = $(e.target).siblings(".password-input-label").children(".account-password");

        if(input.attr("type") === "password"){
            input.attr("type", "text");
        } else if (input.attr("type") === "text"){
            input.attr("type", "password");
        };

    };

    renderAccount = () => {
        return (
            <details key={this.props.index} className="account-detail">

                <summary>
                    <img src={`//logo.clearbit.com/${this.props.account.url}`} alt={"No icon available for " + this.props.account.url}></img>
                    
                    {this.props.account.url}
                </summary>

                <p>Url: {this.props.account.url}</p>
                <p>Email: {this.props.account.email_used}</p>
                <p>User name: {this.props.account.user_name}</p>

                <div>
                    <p className="password-input-label">
                        Password:  
                    <input className="account-password" type="password" value={this.props.account.password} readOnly/>
                    </p>
                    
                    <button
                        onClick={this.togglePassword}>Hide/ Show</button>
                </div>

                <div className="confirmation-buttons">
                    <button 
                        onClick={this.editAccount}>Edit</button>
                    <button 
                        onClick={()=>{this.setState({ delete: true})}}>Delete</button>
                </div>
            </details>
        )
    }

    render(){
        
        return (
            <>
                {this.state.delete ? this.confirmDelete() : this.renderAccount()}
            </>
        );
    };
};