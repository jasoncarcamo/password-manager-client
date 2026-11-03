
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faLock,
    faKey,
    faShieldAlt,
    faEye,
    faEyeSlash,
    faArrowRight,
    faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

import TokenService from "../../services/TokenService/TokenService";
import UserContext from "../../contexts/UserContext/UserContext";
import ReactLoading from "react-loading";

import "./Login.css";

export default class Login extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showPassword: false,
            loggingIn: false,
            error: ""
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
            error: ""
        });
    };

    togglePassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    };

    loadUserInfo = () => {
        this.context.logIn();
    };

    handleForm = (event) => {
        event.preventDefault();

        const {
            email,
            password,
            loggingIn
        } = this.state;

        if (loggingIn) {
            return;
        }

        this.setState({
            loggingIn: true,
            error: ""
        });

        fetch("https://still-crag-51210.herokuapp.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.trim(),
                password
            })
        })
            .then((response) => {
                return response.json().then((data) => {
                    if (!response.ok) {
                        return Promise.reject(data);
                    }

                    return data;
                });
            })
            .then((responseData) => {
                if (!responseData.token) {
                    throw new Error("No authentication token was returned.");
                }

                TokenService.saveToken(responseData.token);

                this.loadUserInfo();

                this.props.history.push("/user");
            })
            .catch((error) => {
                this.setState({
                    password: "",
                    loggingIn: false,
                    error: error.error ||
                        error.message ||
                        "Unable to log in. Please try again."
                });
            });
    };

    renderError = () => {
        const { error } = this.state;

        if (!error) {
            return null;
        }

        return (
            <div className="login-error" role="alert">
                <p>{error}</p>

                {error === "No user found" && (
                    <Link to="/register">
                        Create an account
                    </Link>
                )}
            </div>
        );
    };

    render() {
        const {
            email,
            password,
            showPassword,
            loggingIn
        } = this.state;

        return (
            <main id="login-section">
                <div className="login-container">

                    <div className="login-layout">

                        {/* INFORMATION PANEL */}
                        <aside
                            className="login-info"
                            aria-labelledby="login-info-title"
                        >
                            <div className="login-info-content">
                                <span className="login-eyebrow">
                                    WELCOME BACK
                                </span>

                                <h1 id="login-info-title">
                                    Your accounts.
                                    <span>One convenient place.</span>
                                </h1>

                                <p>
                                    Sign in to access your account
                                    information and continue managing
                                    your passwords with ease.
                                </p>

                                <div className="login-info-features">
                                    <div className="login-info-feature">
                                        <span>
                                            <FontAwesomeIcon icon={faKey} />
                                        </span>

                                        <div>
                                            <h2>Stay Organized</h2>
                                            <p>
                                                Find your saved account
                                                information in one place.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="login-info-feature">
                                        <span>
                                            <FontAwesomeIcon icon={faLock} />
                                        </span>

                                        <div>
                                            <h2>Simple Access</h2>
                                            <p>
                                                A straightforward experience
                                                for your everyday accounts.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="login-info-feature">
                                        <span>
                                            <FontAwesomeIcon icon={faShieldAlt} />
                                        </span>

                                        <div>
                                            <h2>Privacy-Minded</h2>
                                            <p>
                                                Designed to keep the
                                                experience focused on you.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="login-info-footer">
                                <FontAwesomeIcon icon={faCheckCircle} />
                                <span>
                                    A simpler way to manage your digital life.
                                </span>
                            </div>
                        </aside>

                        {/* LOGIN FORM */}
                        <section
                            className="login-form-panel"
                            aria-labelledby="login-form-title"
                        >
                            <div className="login-form-heading">
                                <span className="login-form-icon" aria-hidden="true">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>

                                <h2 id="login-form-title">
                                    Log in to your account
                                </h2>

                                <p>
                                    Enter your credentials to continue.
                                </p>
                            </div>

                            <form
                                id="login-form"
                                onSubmit={this.handleForm}
                            >
                                <div className="login-field">
                                    <label htmlFor="login-email">
                                        Email address
                                    </label>

                                    <input
                                        id="login-email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                <div className="login-field">
                                    <label htmlFor="login-password">
                                        Password
                                    </label>

                                    <div className="login-password-input">
                                        <input
                                            id="login-password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={password}
                                            onChange={this.handleChange}
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="login-password-toggle"
                                            onClick={this.togglePassword}
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                            aria-pressed={showPassword}
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    showPassword
                                                        ? faEyeSlash
                                                        : faEye
                                                }
                                            />
                                        </button>
                                    </div>
                                </div>

                                {this.renderError()}

                                <button
                                    id="login-submit"
                                    type="submit"
                                    disabled={loggingIn}
                                >
                                    {loggingIn ? (
                                        <>
                                            <ReactLoading
                                                type="spin"
                                                color="#ffffff"
                                                width={20}
                                                height={20}
                                            />

                                            Signing In...
                                        </>
                                    ) : (
                                        <>
                                            Log In
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="login-register-link">
                                <p>
                                    Don't have an account?
                                    {" "}
                                    <Link to="/register">
                                        Create an account
                                    </Link>
                                </p>
                            </div>
                        </section>
                    </div>

                    <p className="login-bottom-note">
                        Password Manager — Simple, organized account management.
                    </p>
                </div>
            </main>
        );
    }
}
