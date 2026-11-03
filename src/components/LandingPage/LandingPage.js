
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faKey,
    faBrain,
    faShieldAlt,
    faLock,
    faArrowRight,
    faCheckCircle,
    faUserShield,
    faFingerprint
} from "@fortawesome/free-solid-svg-icons";

import "./LandingPage.css";

export default class LandingPage extends React.Component {
    render() {
        return (
            <main id="landing-page">

                {/* HERO */}
                <section
                    className="landing-hero"
                    aria-labelledby="landing-title"
                >
                    <div className="landing-container landing-hero-grid">
                        <div className="landing-hero-content">
                            <span className="landing-eyebrow">
                                <FontAwesomeIcon icon={faShieldAlt} />
                                A SIMPLER WAY TO STAY ORGANIZED
                            </span>

                            <h1 id="landing-title">
                                Your passwords.
                                <span>Your peace of mind.</span>
                            </h1>

                            <p className="landing-hero-description">
                                Keep your important account information
                                organized in one convenient place.
                                Less time remembering passwords,
                                more time focusing on what matters.
                            </p>

                            <div className="landing-hero-actions">
                                <Link
                                    to="/register"
                                    className="landing-button landing-button-primary"
                                >
                                    Get Started
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Link>

                                <Link
                                    to="/login"
                                    className="landing-button landing-button-secondary"
                                >
                                    Log In
                                </Link>
                            </div>

                            <p className="landing-hero-note">
                                <FontAwesomeIcon icon={faCheckCircle} />
                                Simple to use. Designed with privacy in mind.
                            </p>
                        </div>

                        <div
                            className="landing-hero-visual"
                            aria-hidden="true"
                        >
                            <div className="landing-visual-glow"></div>

                            <div className="landing-preview">
                                <div className="landing-preview-header">
                                    <div className="landing-preview-brand">
                                        <FontAwesomeIcon icon={faLock} />
                                        <span>My Vault</span>
                                    </div>

                                    <span className="landing-preview-badge">
                                        ORGANIZED
                                    </span>
                                </div>

                                <div className="landing-preview-heading">
                                    <h2>Welcome back</h2>
                                    <p>Your accounts, all in one place.</p>
                                </div>

                                <div className="landing-preview-item">
                                    <div className="landing-preview-item-icon">
                                        <FontAwesomeIcon icon={faKey} />
                                    </div>

                                    <div>
                                        <strong>Personal Account</strong>
                                        <span>••••••••••••</span>
                                    </div>

                                    <span className="landing-preview-check">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </span>
                                </div>

                                <div className="landing-preview-item">
                                    <div className="landing-preview-item-icon">
                                        <FontAwesomeIcon icon={faLock} />
                                    </div>

                                    <div>
                                        <strong>Work Account</strong>
                                        <span>••••••••••••</span>
                                    </div>

                                    <span className="landing-preview-check">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </span>
                                </div>

                                <div className="landing-preview-item">
                                    <div className="landing-preview-item-icon">
                                        <FontAwesomeIcon icon={faFingerprint} />
                                    </div>

                                    <div>
                                        <strong>Other Accounts</strong>
                                        <span>••••••••••••</span>
                                    </div>

                                    <span className="landing-preview-check">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </span>
                                </div>

                                <div className="landing-preview-footer">
                                    <FontAwesomeIcon icon={faShieldAlt} />
                                    <span>Everything in one convenient place</span>
                                </div>
                            </div>

                            <div className="landing-floating-icon">
                                <FontAwesomeIcon icon={faShieldAlt} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* BENEFITS */}
                <section
                    className="landing-features"
                    aria-labelledby="landing-features-title"
                >
                    <div className="landing-container">
                        <div className="landing-section-heading">
                            <span className="landing-eyebrow">
                                WHY PASSWORD MANAGER
                            </span>

                            <h2 id="landing-features-title">
                                Everything you need.
                                <span>Nothing you don't.</span>
                            </h2>

                            <p>
                                A straightforward experience built
                                around simplicity, organization,
                                and everyday convenience.
                            </p>
                        </div>

                        <div className="landing-features-grid">
                            <article className="landing-feature-card">
                                <div className="landing-feature-icon">
                                    <FontAwesomeIcon icon={faBrain} />
                                </div>

                                <h3>Less to Remember</h3>

                                <p>
                                    Stop relying on memory alone.
                                    Keep track of your accounts
                                    in one organized place.
                                </p>
                            </article>

                            <article className="landing-feature-card">
                                <div className="landing-feature-icon">
                                    <FontAwesomeIcon icon={faKey} />
                                </div>

                                <h3>Easy Access</h3>

                                <p>
                                    Find the account information
                                    you need without searching
                                    through scattered notes.
                                </p>
                            </article>

                            <article className="landing-feature-card">
                                <div className="landing-feature-icon">
                                    <FontAwesomeIcon icon={faUserShield} />
                                </div>

                                <h3>Privacy-Minded Design</h3>

                                <p>
                                    A focused account-management
                                    experience that puts clarity
                                    and user control first.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section
                    className="landing-about"
                    aria-labelledby="landing-about-title"
                >
                    <div className="landing-container landing-about-grid">
                        <div className="landing-about-visual">
                            <div className="landing-about-symbol">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                        </div>

                        <div className="landing-about-content">
                            <span className="landing-eyebrow">
                                BUILT AROUND SIMPLICITY
                            </span>

                            <h2 id="landing-about-title">
                                Password management
                                <span>without the complexity.</span>
                            </h2>

                            <p>
                                Managing your accounts shouldn't
                                feel like another complicated task.
                            </p>

                            <p>
                                Password Manager offers a clean,
                                straightforward way to organize
                                important login information
                                in one familiar interface.
                            </p>

                            <Link
                                to="/register"
                                className="landing-text-link"
                            >
                                Start organizing your accounts
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section
                    className="landing-cta"
                    aria-labelledby="landing-cta-title"
                >
                    <div className="landing-container landing-cta-content">
                        <span className="landing-eyebrow">
                            READY TO GET ORGANIZED?
                        </span>

                        <h2 id="landing-cta-title">
                            Make remembering passwords
                            one less thing to worry about.
                        </h2>

                        <p>
                            A simpler approach to managing
                            your digital accounts starts here.
                        </p>

                        <Link
                            to="/register"
                            className="landing-button landing-button-light"
                        >
                            Create Your Account
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                </section>
            </main>
        );
    }
}
