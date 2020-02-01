import React from "react";
import "./LandingPage.css";

export default class extends React.Component{
    render(){
        return (
            <section id="landing-page">
                <p>Stop forgettying your passwords!</p>
                <p>Password manager is not an extension for your browser</p>
                <p>We promise to never store your information in an imaginary "Cloud" server</p>
                <p>We are privately owned and will never lower ourselves by selling your information</p>
            </section>
        );
    };
};