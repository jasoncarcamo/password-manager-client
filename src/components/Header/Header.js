
import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import TokenService from "../../services/TokenService/TokenService";

import "./Header.css";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpen: false
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            if (this.state.isMenuOpen) {
                this.setState({
                    isMenuOpen: false
                });
            }
        }
    }

    componentWillUnmount() {
        document.body.style.overflow = "";
    }

    handleMobileNav = () => {
        this.setState((prevState) => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    };

    closeMobileNav = () => {
        if (this.state.isMenuOpen) {
            this.setState({
                isMenuOpen: false
            });
        }
    };

    handleSignOff = (event) => {
        event.preventDefault();

        TokenService.deleteToken();

        this.setState({
            isMenuOpen: false
        });

        this.props.history.push("/");
    };

    renderAccountLinks = () => {
        if (TokenService.hasToken()) {
            return (
                <>
                    <li>
                        <NavLink
                            to="/user"
                            className="header-nav-link"
                            activeClassName="header-nav-link--active"
                            onClick={this.closeMobileNav}
                        >
                            My Account
                        </NavLink>
                    </li>

                    <li>
                        <button
                            type="button"
                            className="header-signout"
                            onClick={this.handleSignOff}
                        >
                            Sign Out
                        </button>
                    </li>
                </>
            );
        }

        return (
            <>
                <li>
                    <NavLink
                        to="/login"
                        className="header-nav-link"
                        activeClassName="header-nav-link--active"
                        onClick={this.closeMobileNav}
                    >
                        Log In
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/register"
                        className="header-register"
                        activeClassName="header-register--active"
                        onClick={this.closeMobileNav}
                    >
                        Get Started
                        <span aria-hidden="true">↗</span>
                    </NavLink>
                </li>
            </>
        );
    };

    render() {
        const { isMenuOpen } = this.state;

        return (
            <header className="site-header">
                <div className="header-container">
                    <Link
                        to="/"
                        className="header-brand"
                        onClick={this.closeMobileNav}
                        aria-label="Password Manager home"
                    >
                        <span
                            className="header-brand-icon"
                            aria-hidden="true"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect
                                    x="5"
                                    y="10"
                                    width="14"
                                    height="11"
                                    rx="2"
                                />

                                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                <circle cx="12" cy="15" r="1" />
                                <path d="M12 16v2" />
                            </svg>
                        </span>

                        <span className="header-brand-name">
                            Password<span>Manager</span>
                        </span>
                    </Link>

                    <button
                        type="button"
                        className={`header-menu-toggle ${isMenuOpen ? "is-active" : ""}`}
                        onClick={this.handleMobileNav}
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMenuOpen}
                        aria-controls="header-navigation"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav
                        id="header-navigation"
                        className={`header-navigation ${isMenuOpen ? "header-navigation--open" : ""}`}
                        aria-label="Main navigation"
                    >
                        <ul className="header-nav-list">
                            <li>
                                <NavLink
                                    exact
                                    to="/"
                                    className="header-nav-link"
                                    activeClassName="header-nav-link--active"
                                    onClick={this.closeMobileNav}
                                >
                                    Home
                                </NavLink>
                            </li>

                            {this.renderAccountLinks()}
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
