import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Button from 'material-ui/Button';

import AuthService from '../AuthService';
import Home from './Home';
import About from './About';
import Login from './Login/Form/Form';
import NavBar from './NavBar/NavBar';
import AdminPanel from './Admin/Panel';
import DashboardContainer from './Dashboard/DashboardContainer';
import CourseContainer from './Course/CourseContainer';

class App extends React.Component {
  constructor() {
    super();
    this.authService = new AuthService();
  }

  renderHome() {
    let resultComponent = <Login auth={this.authService} />;

    if (!this.authService.isAuthenticated()) {
      this.authService.login();
      resultComponent = (
        <div>
          <p>Redirecting to the authentication service...</p>
        </div>
      );
    }

    return resultComponent;
  }

  startSession(history) {
    this.authService.handleAuthentication(history);
    return (
      <div>
        <p>Starting session...</p>
      </div>
    );
  }

  createLogoutButton() {
    let button = null;

    if (this.authService.isAuthenticated()) {
      button = (
        <Button
          style={{ color: 'white', textDecoration: 'none' }}
          onClick={() => this.authService.logout()}>
          Logout
        </Button>
      );
    }

    return button;
  }

  render() {
    let logoutButton = this.createLogoutButton();
    return (
      <div style={{ height: '100%' }}>
        <header>
          <NavBar
            isLoggedIn={this.authService.isAuthenticated()}
            logout={logoutButton}
          />
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/admin" component={AdminPanel} />
          <Route exact path="/dashboard" component={DashboardContainer} />
          <Route exact path="/courses/:courseid" component={CourseContainer} />
          <Switch>
            <Route exact path="/login" render={() => this.renderHome()} />
            <Route
              path="/callback"
              render={({ history }) => this.startSession(history)}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
