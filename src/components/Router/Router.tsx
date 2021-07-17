import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import * as icon from "../../../public/favicon.ico";
import Header from "../Header/Header";
import { Hello } from "../Hello";

class Router extends Component<any, any> {

    public render() {
        return (
            <React.Fragment>
                <Header
                    firstname={"Test Name"}
                    profileImage={"https://via.placeholder.com/40x40"}
                />

                <main role="main" id="main-section">
                    <Switch>

                        <Route path="/">
                            <Hello bundler="Test" compiler="Fu" framework="Bar" />
                        </Route>
                    </Switch>
                </main>
                {/* <Footer /> */}
            </React.Fragment>
        );
    }
}

export default Router;
