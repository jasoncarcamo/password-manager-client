import React from "react";
import Account from "./Account/Account";

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
                    <Account key={index} account={account}></Account>
                </li>
            )
        });

        return accounts;
    }
    
    render(){
        return (
            <section>
                <ul>
                    {this.renderAccounts()}
                </ul>
            </section>
        )
    }
}