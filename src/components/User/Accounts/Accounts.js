import React from "react";
import Account from "./Account/Account";
import {Link} from "react-router-dom";

export default class Accounts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            accounts: [],
        }
    }

    componentDidMount(){
    };

    renderAccounts = ()=>{
        let accounts = this.props.accounts;

        accounts = accounts.map( (account, index)=>{

            return (
                <li key={index}>
                    <Account key={index} account={account} history={this.props.history} refreshUser={this.refreshUser}></Account>
                </li>
            );
        });

        return accounts;
    };

    render(){
        console.log(this.state.accounts.length)
        return (
            <section>
                <ul>
                    {this.props.accounts.length == 0 ? <p>You do not have any accounts saved yet. Add your first one <Link to="/user/new-account">here</Link></p> : this.renderAccounts()}
                </ul>
            </section>
        )
    }
}