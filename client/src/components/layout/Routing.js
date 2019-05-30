import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './landing';
import Home from './Home';
import Navbar from './navbar';
import Register from '../auth/Register';
import Login from '../auth/Login';
import { connect } from 'react-redux';

const Routing = props => {
  const { isAuthenticated, loading } = props;

  return (
    <Router>
      <Fragment>
        <Navbar />
        {!loading && (
          <Route
            exact
            path='/'
            component={isAuthenticated === true ? Home : Landing}
          />
        )}

        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/signin' component={Login} />
        </Switch>
      </Fragment>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps)(Routing);
