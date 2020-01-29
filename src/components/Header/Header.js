import React from "react";
import {Link, NavLink} from "react-router-dom";
import TokenService from "../../services/TokenService/TokenService";

export default class Header extends React.Component{


    hasToken = () => {

        if(TokenService.hasToken()){
            return (
                <>

                    <li>
                        <NavLink to="/user">My accounts</NavLink>
                    </li>

                    <li>
                        <Link 
                            to="/"
                            onClick={this.handleSignOff}>Sign off</Link>
                    </li>

                </>
            );
        };

        return (
            <>
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>

                <li>
                    <NavLink to="/login">Log In</NavLink>
                </li>
            </>
        );
    };

    handleSignOff = ()=> {
        TokenService.deleteToken();
        this.props.history.push("/");
    };

    render(){
        return (
            <header>
                <nav>
                    <h2>
                        <Link to="/">Password Manager</Link>
                    </h2>

                    <ul>
                        
                        {this.hasToken()}
                    </ul>
                </nav>
            </header>
        );
    };
};