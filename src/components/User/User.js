import React from "react";
import {Route, Link} from "react-router-dom";
import TokenService from "../../services/TokenService/TokenService";
import UserContext from "../../contexts/UserContext/UserContext";

//Users section routes
import UserHeader from "./UserHeader/UserHeader";
import Accounts from "./Accounts/Accounts";
import CreateAccount from "./CreateAccount/CreateAccount";

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

        if(this.props.location.pathname === "/user/newaccount"){
            this.setState({ newAccount: true});
        };

        setTimeout(()=>{
            this.setState({ accounts: this.context.accounts});
        }, 500);

    };

    newAccounts = ()=>{
        this.setState({ newAccount: !this.state.newAccount});
    }

    renderButton = ()=>{
        if(this.props.location.pathname === "/user"){
            return <Route path="/user" render={(props)=> <UserHeader {...props} active={false}
            newAccounts={this.newAccounts}></UserHeader>}></Route>
        } else if(this.props.locaion === "/user/newaccount"){
            return <Route path="/user" render={(props)=> <UserHeader {...props} active={this.state.newAccount}
            newAccounts={true}></UserHeader>}></Route>
        }
    }

    render(){
        
        return (
            <section>
                <Route path="/user" component={UserHeader}></Route>

                <Route exact path="/user" render={(props)=><Accounts {...props} accounts={this.context.accounts}></Accounts>}></Route>

                <Route path="/user/newaccount" component={CreateAccount}></Route>
            </section>
        );
    };
};