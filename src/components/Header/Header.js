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
                        <NavLink to="/user" onClick={this.handleMobileNav}>My accounts</NavLink>
                    </li>

                    <li>
                        <Link 
                            to="/"
                            onClick={this.handleSignOff} onClick={this.handleMobileNav}>Sign off</Link>
                    </li>

                </>
            );
        };

        return (
            <>
                <li>
                    <NavLink to="/register" onClick={this.handleMobileNav}>Register</NavLink>
                </li>

                <li>
                    <NavLink to="/login" onClick={this.handleMobileNav}>Log In</NavLink>
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
            <header id="main-header">
                <nav>

                    <button id="nav-burger" onClick={this.handleMobileNav} className="hamburger hamburger--collapse" type="button">
                        <span className="hamburger-box" >
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>

                    <h2>
                        <Link to="/">Password Manager</Link>
                    </h2>

                    <ul id="nav-links">
                        <li>
                            <NavLink to="/" onClick={this.handleMobileNav}>Home</NavLink>
                        </li>

                        {this.hasToken()}
                    </ul>
                </nav>
            </header>
        );
    };
};