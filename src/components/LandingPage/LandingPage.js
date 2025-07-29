import React from "react";
import "./LandingPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey, faBrain, faCloud, faHatCowboy} from "@fortawesome/free-solid-svg-icons";

export default class extends React.Component{
    render(){
        return (
            <section id="landing-page">
                <div className="feature">
                    <FontAwesomeIcon className="icon" icon={faBrain} />
                    <h2 className="headline">Never forget a password again</h2>
                    <p className="subtext">A simple, secure password manager — no browser extensions, no cloud gimmicks.</p>
                </div>

                <div className="feature">
                    <FontAwesomeIcon className="icon" icon={faKey} />
                    <h2 className="headline">Independent and reliable</h2>
                    <p className="subtext">Designed to run on its own, giving you full control over your data.</p>
                </div>

                <div className="feature">
                    <FontAwesomeIcon className="icon" icon={faCloud} />
                    <h2 className="headline">No cloud. No compromise.</h2>
                    <p className="subtext">Your data is never stored in ambiguous cloud infrastructure — full transparency.</p>
                </div>

                <div className="feature">
                    <FontAwesomeIcon className="icon" icon={faHatCowboy} />
                    <h2 className="headline">Privacy is not a feature</h2>
                    <p className="subtext">We’re independent — your data will never be sold, shared, or tracked. Ever.</p>
                </div>
            </section>

        );
    };
};