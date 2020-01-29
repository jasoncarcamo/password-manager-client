import React from 'react';
import './App.css';
import {Route} from "react-router-dom";

//Routes
import Header from "../components/Header/Header";
import LandingPage from "../components/LandingPage/LandingPage";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import User from "../components/User/User";

function App() {
  return (
    <section>
      <Route path="/" component={Header}></Route>
      <Route exact path="/" component={LandingPage}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route path="/user" component={User}></Route>
    </section>
  );
}

export default App;
