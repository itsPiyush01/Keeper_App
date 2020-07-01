import React, { useState, useEffect } from "react";
import CreateArea from "./CreateArea ";
import Header from "./Header"
import Footer from "./Footer"
import Notes from "./Notes"
import Authenticate from "./Authenticate"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Header />
            <Router>
                <Switch>
                    <Route path="/" exact component={Notes} />
                    <Route path="/authenticate" component={Authenticate} />
                </Switch>
            </Router>
        </>
    )

}
export default App;
