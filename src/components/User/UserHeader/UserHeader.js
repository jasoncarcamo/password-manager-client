import React from "react";
import { Route } from "react-router-dom";

export class Button extends React.Component{
    render(){

        return <button onClick={this.props.onClick}>{this.props.text}</button>
    }
}

export default class UserHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newAccount: false
        };
    };

    newAccountBtn = ()=>{
        this.props.history.push("/user/new-account");
    };

    handleCancel = ()=>{
       this.props.history.push("/user"); 
    }

    render(){
        return (
            <section>
                <Route exact path="/user" render={(props)=><Button {...props} onClick={this.newAccountBtn} text="New +"></Button> }></Route>

                <Route exact path="/user/new-account" render={(props)=><Button {...props} onClick={this.handleCancel} text="Cancel"></Button> }></Route>
                
                <Route path="/user/edit-account" render={(props)=><Button {...props} onClick={this.handleCancel} text="Cancel"></Button> }></Route>
            </section>
        );
    };
};