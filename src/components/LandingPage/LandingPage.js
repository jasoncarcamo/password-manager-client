import React from "react";
import "./LandingPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey, faBrain, faCloud, faHatCowboy} from "@fortawesome/free-solid-svg-icons";

export default class extends React.Component{
    render(){
        return (
            <section id="landing-page">

                <div>
                    <FontAwesomeIcon 
                        className="Icon" 
                        icon={faBrain}
                        style={{color: "tan"}}></FontAwesomeIcon>
                    <p>Stop forgetting your passwords!</p>
                </div>
                

                <div>
                    <FontAwesomeIcon 
                        className="Icon" 
                        icon={faKey}
                        style={{color: "gold"}}></FontAwesomeIcon>
                    <p>Password manager is not an extension for your browser</p>
                </div>
                

                <div>
                    <FontAwesomeIcon 
                        className="Icon" 
                        icon={faCloud}
                        style={{color: "skyblue"}}></FontAwesomeIcon>
                    <p>We promise to never store your information in an imaginary "Cloud" server</p>
                </div>
                

                <div>
                    <FontAwesomeIcon 
                        className="Icon" 
                        icon={faHatCowboy}
                        style={{color: "brown"}}></FontAwesomeIcon>
                    <p>We are privately owned and will never lower ourselves by selling your information</p>
                </div>
                

            </section>
        );
    };
};