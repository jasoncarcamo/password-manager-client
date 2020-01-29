import React from "react";

export default class Account extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            account: {}
        };
    };

    render(){
        return (
            <details key={this.props.index}>
                <summary>{this.props.account.url}</summary>
                <p>Url: {this.props.account.url}</p>
                <img src={`//logo.clearbit.com/${this.props.account.url}`} alt={this.props.account.url}></img>
                <p>Email: {this.props.account.email_used}</p>
                <p>User name: {this.props.account.user_name}</p>
                <p>Password: {this.props.account.password}</p>
            </details>
        )
    }
}