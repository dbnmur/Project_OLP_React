import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TemporaryDrawer from './Drawer';

import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class ButtonAppBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <TemporaryDrawer />

            <Typography variant="title" className={classes.flex}>
              <Link style={{ color: 'white', textDecoration: 'none' }} to="/">
                Home
              </Link>
            </Typography>
            {this.props.isLoggedIn ? (
              this.props.logout
            ) : (
              <Button>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to="/login">
                  Log in
                </Link>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
