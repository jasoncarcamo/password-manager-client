
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLock,
    faShieldAlt,
    faCheck,
    faEye,
    faEyeSlash,
    faArrowRight,
    faKey
} from "@fortawesome/free-solid-svg-icons";

import TokenService from "../../services/TokenService/TokenService";
import ReactLoading from "react-loading";

import "./Register.css";

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            showPassword: false,
            showConfirmPassword: false,
            registering: false,
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

    toggleConfirmPassword = () => {
        this.setState((prevState) => ({
            showConfirmPassword: !prevState.showConfirmPassword
        }));
    };

    getPasswordRequirements = (password) => {
        return [
            {
                label: "At least 9 characters",
                valid: password.length > 8
            },
            {
                label: "Fewer than 72 characters",
                valid: password.length < 72
            },
            {
                label: "No spaces at the beginning or end",
                valid: password.length > 0 &&
                    !password.startsWith(" ") &&
                    !password.endsWith(" ")
            },
            {
                label: "Uppercase and lowercase letters",
                valid: /[A-Z]/.test(password) && /[a-z]/.test(password)
            },
            {
                label: "At least one number",
                valid: /[0-9]/.test(password)
            },
            {
                label: "At least one special character (!@#$%^&)",
                valid: /[!@#$%^&]/.test(password)
            }
        ];
    };

    isPasswordValid = (password) => {
        return this.getPasswordRequirements(password)
            .every((requirement) => requirement.valid);
    };

    handleForm = (event) => {
        event.preventDefault();

        const {
            first_name,
            last_name,
            email,
            password,
            confirmPassword,
            registering
        } = this.state;

        if (registering) {
            return;
        }

        if (!this.isPasswordValid(password)) {
            this.setState({
                error: "Please meet all password requirements."
            });

            return;
        }

        if (password !== confirmPassword) {
            this.setState({
                error: "Your passwords do not match."
            });

            return;
        }

        this.setState({
            registering: true,
            error: ""
        });

        fetch("https://still-crag-51210.herokuapp.com/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: first_name.trim(),
                last_name: last_name.trim(),
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
                    throw new Error("Registration succeeded, but no token was returned.");
                }

                TokenService.saveToken(responseData.token);
                this.props.history.push("/user");
            })
            .catch((error) => {
                this.setState({
                    registering: false,
                    error: error.error ||
                        error.message ||
                        "Unable to create your account. Please try again."
                });
            });
    };

    renderPasswordRequirements = () => {
        const requirements = this.getPasswordRequirements(
            this.state.password
        );

        return (
            <ul
                className="register-requirements"
                aria-label="Password requirements"
            >
                {requirements.map((requirement, index) => (
                    <li
                        key={index}
                        className={
                            requirement.valid
                                ? "register-requirement register-requirement--valid"
                                : "register-requirement"
                        }
                    >
                        <span aria-hidden="true">
                            {requirement.valid ? "✓" : "○"}
                        </span>

                        {requirement.label}
                    </li>
                ))}
            </ul>
        );
    };

    render() {
        const {
            first_name,
            last_name,
            email,
            password,
            confirmPassword,
            showPassword,
            showConfirmPassword,
            registering,
            error
        } = this.state;

        const passwordsMatch =
            confirmPassword.length > 0 &&
            password === confirmPassword;

        const passwordsMismatch =
            confirmPassword.length > 0 &&
            password !== confirmPassword;

        return (
            <main id="register-section">
                <div className="register-container">

                    <div className="register-heading">
                        <span className="register-eyebrow">
                            CREATE YOUR ACCOUNT
                        </span>

                        <h1>
                            A simpler way to
                            <span>manage your passwords.</span>
                        </h1>

                        <p>
                            Create your account and start keeping
                            your important login information organized.
                        </p>
                    </div>

                    <div className="register-layout">

                        {/* BENEFITS */}
                        <aside
                            className="register-benefits"
                            aria-labelledby="register-benefits-title"
                        >
                            <div className="register-benefits-top">
                                <span className="register-benefits-label">
                                    GET STARTED
                                </span>

                                <h2 id="register-benefits-title">
                                    Your digital life.
                                    <span>More organized.</span>
                                </h2>

                                <p>
                                    Spend less time remembering
                                    passwords and more time
                                    doing what matters.
                                </p>
                            </div>

                            <div className="register-benefits-list">
                                <div className="register-benefit">
                                    <span className="register-benefit-icon">
                                        <FontAwesomeIcon icon={faKey} />
                                    </span>

                                    <div>
                                        <h3>One Convenient Place</h3>
                                        <p>
                                            Keep your account information
                                            organized and easy to find.
                                        </p>
                                    </div>
                                </div>

                                <div className="register-benefit">
                                    <span className="register-benefit-icon">
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>

                                    <div>
                                        <h3>Simple Account Management</h3>
                                        <p>
                                            A clean interface designed
                                            for everyday use.
                                        </p>
                                    </div>
                                </div>

                                <div className="register-benefit">
                                    <span className="register-benefit-icon">
                                        <FontAwesomeIcon icon={faShieldAlt} />
                                    </span>

                                    <div>
                                        <h3>Privacy-Minded Experience</h3>
                                        <p>
                                            Designed with clarity
                                            and user control in mind.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="register-benefits-footer">
                                <FontAwesomeIcon icon={faCheck} />
                                <span>
                                    Straightforward registration.
                                    No unnecessary complexity.
                                </span>
                            </div>
                        </aside>

                        {/* FORM */}
                        <section
                            className="register-form-card"
                            aria-labelledby="register-form-title"
                        >
                            <div className="register-form-heading">
                                <h2 id="register-form-title">
                                    Create your account
                                </h2>

                                <p>
                                    Already have an account?
                                    {" "}
                                    <Link to="/login">Log in</Link>
                                </p>
                            </div>

                            <form
                                id="register-form"
                                onSubmit={this.handleForm}
                            >
                                <div className="register-name-grid">
                                    <div className="register-field">
                                        <label htmlFor="register-first-name">
                                            First name
                                        </label>

                                        <input
                                            id="register-first-name"
                                            name="first_name"
                                            type="text"
                                            value={first_name}
                                            onChange={this.handleChange}
                                            autoComplete="given-name"
                                            placeholder="First name"
                                            maxLength="100"
                                            required
                                        />
                                    </div>

                                    <div className="register-field">
                                        <label htmlFor="register-last-name">
                                            Last name
                                        </label>

                                        <input
                                            id="register-last-name"
                                            name="last_name"
                                            type="text"
                                            value={last_name}
                                            onChange={this.handleChange}
                                            autoComplete="family-name"
                                            placeholder="Last name"
                                            maxLength="100"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="register-field">
                                    <label htmlFor="register-email">
                                        Email address
                                    </label>

                                    <input
                                        id="register-email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                <div className="register-field">
                                    <label htmlFor="register-password">
                                        Password
                                    </label>

                                    <div className="register-password-input">
                                        <input
                                            id="register-password"
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={password}
                                            onChange={this.handleChange}
                                            autoComplete="new-password"
                                            placeholder="Create a password"
                                            aria-describedby="register-password-rules"
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="register-password-toggle"
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

                                    <div id="register-password-rules">
                                        {this.renderPasswordRequirements()}
                                    </div>
                                </div>

                                <div className="register-field">
                                    <label htmlFor="register-confirm-password">
                                        Confirm password
                                    </label>

                                    <div className="register-password-input">
                                        <input
                                            id="register-confirm-password"
                                            name="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={confirmPassword}
                                            onChange={this.handleChange}
                                            autoComplete="new-password"
                                            placeholder="Confirm your password"
                                            aria-describedby="register-match-message"
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="register-password-toggle"
                                            onClick={this.toggleConfirmPassword}
                                            aria-label={
                                                showConfirmPassword
                                                    ? "Hide confirmation password"
                                                    : "Show confirmation password"
                                            }
                                            aria-pressed={showConfirmPassword}
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    showConfirmPassword
                                                        ? faEyeSlash
                                                        : faEye
                                                }
                                            />
                                        </button>
                                    </div>

                                    <p
                                        id="register-match-message"
                                        className={
                                            passwordsMatch
                                                ? "register-match register-match--valid"
                                                : passwordsMismatch
                                                    ? "register-match register-match--invalid"
                                                    : "register-match"
                                        }
                                    >
                                        {passwordsMatch
                                            ? "✓ Passwords match"
                                            : passwordsMismatch
                                                ? "Passwords do not match"
                                                : ""}
                                    </p>
                                </div>

                                {error && (
                                    <div
                                        className="register-error"
                                        role="alert"
                                    >
                                        <p>{error}</p>

                                        {error === "You seem to have account already. Log in" && (
                                            <Link to="/login">
                                                Go to login
                                            </Link>
                                        )}
                                    </div>
                                )}

                                <button
                                    id="register-submit"
                                    type="submit"
                                    disabled={registering}
                                >
                                    {registering ? (
                                        <>
                                            <ReactLoading
                                                type="spin"
                                                color="#ffffff"
                                                width={20}
                                                height={20}
                                            />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </section>
                    </div>

                    <p className="register-bottom-note">
                        Already registered?
                        {" "}
                        <Link to="/login">Sign in to your account</Link>
                    </p>
                </div>
            </main>
        );
    }
}
