import { withAuth0 } from "@auth0/auth0-react";
import Profile from './profile'
import Login from './login'
import MyFavoriteBooks from './myFavoriteBooks'
import React from 'react';
import Header from './header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  render() {
    console.log('App', this.props)
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
                {isAuthenticated && <MyFavoriteBooks />}
                {!isAuthenticated && <Login />}
              </Route>
              {/* <exact path="/profile" Component={Profile} /> */}
              <Route exact path="/profile">
                {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
                {isAuthenticated && <Profile />}
              </Route>
            </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    )
  }
}

export default withAuth0(App);