import React from "react";
import {Link, NavLink} from "react-router-dom";
import TokenService from "../../services/TokenService/TokenService";
import "./Header.css";
import "./hamburger.css";

export default class Header extends React.Component{

    componentDidMount(){
        const navLinks = document.getElementById("nav-links");

        navLinks.addEventListener("touchmove", (e)=>{
            e.preventDefault();
        })
    }

    handleMobileNav = (e) => {
        const burger = document.getElementById("nav-burger");
        const closeLinks = document.getElementById("close-links");
        const navLinks = document.getElementById("nav-links");

        burger.classList.toggle("is-active");
        navLinks.classList.toggle("display-nav");
    }

    hasToken = () => {

        if(TokenService.hasToken()){
            return (
                <>

                    <li>
                        <NavLink 
                            
                            to="/user" onClick={this.handleMobileNav}
                            activeStyle={{fontWeight: "bold", fontSize: "1.1em"}}>My accounts</NavLink>
                    </li>

                    <li>
                        <Link 
                            
                            to="/"
                            onClick={this.handleSignOff} >Sign off</Link>
                    </li>

                </>
            );
        };

        return (
            <>

                <li>
                    <NavLink 
                        to="/login" 
                        onClick={this.handleMobileNav}
                        activeStyle={{fontWeight: "bold", fontSize: "1.1em"}}>Log In</NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/register" 
                        onClick={this.handleMobileNav}
                        activeStyle={{fontWeight: "bold", fontSize: "1.1em"}}>Register</NavLink>
                </li>

            </>
        );
    };

    handleSignOff = ()=> {
        TokenService.deleteToken();
        this.handleMobileNav();
        this.props.history.push("/");
    };

    render(){
        return (
            <header id="main-header">
                <nav>

                    <button id="nav-burger" onClick={this.handleMobileNav} className="hamburger hamburger--collapse" type="button">
                        <span className="hamburger-box" >
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>

                    <h2>
                        <Link className="Link" to="/">Password Manager</Link>
                    </h2>

                    <ul id="nav-links">
                        <li>
                            <NavLink 
                            exact
                            to="/" 
                            onClick={this.handleMobileNav}
                            activeStyle={{fontWeight: "bold", fontSize: "1.2em"}}>Home</NavLink>
                        </li>

                        {this.hasToken()}
                    </ul>
                </nav>
            </header>
        );
    };
};