import React from "react";
import {Route, Link} from "react-router-dom";
import TokenService from "../../services/TokenService/TokenService";
import UserContext from "../../contexts/UserContext/UserContext";
import "./User.css";

//Users section routes
import UserHeader from "./UserHeader/UserHeader";
import Accounts from "./Accounts/Accounts";
import CreateAccount from "./CreateAccount/CreateAccount";
import EditAccount from "./EditAccount/EditAccount";

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            accounts: [],
            newAccount: false
        };
    };

    static contextType = UserContext; 

    componentDidMount(){
        
        if(!TokenService.hasToken()){
            return this.props.history.push("/login");
        };

        if(this.props.location.pathname === "/user/new-account"){
            this.setState({ newAccount: true});
        };

        if(this.context.accounts.length === 0){
            
            setTimeout(()=>{
                this.setState({ accounts: this.context.accounts});
            }, 500);
        } else{
            
            this.setState({ accounts: this.context.accounts});
        }

    };

    newAccounts = ()=>{
        this.setState({ newAccount: !this.state.newAccount});
    }

    renderButton = ()=>{
        if(this.props.location.pathname === "/user"){
            return <Route path="/user" render={(props)=> <UserHeader {...props} active={false}
            newAccounts={this.newAccounts}></UserHeader>}></Route>
        } else if(this.props.locaion === "/user/new-account"){
            return <Route path="/user" render={(props)=> <UserHeader {...props} active={this.state.newAccount}
            newAccounts={true}></UserHeader>}></Route>
        }
    }

    refreshUser = ()=>{
        this.componentDidMount();
    }

    render(){
        
        return (
            <section id="user-section">
                <Route path="/user" component={UserHeader}></Route>
                <div></div>
                <Route exact path="/user" render={(props)=><Accounts {...props} accounts={this.context.accounts}  ></Accounts>}></Route>

                <Route path="/user/new-account" component={CreateAccount}></Route>
                <Route path="/user/edit-account" component={EditAccount}></Route>
            </section>
        );
    };
};