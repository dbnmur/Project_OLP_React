import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TemporaryDrawer from './Drawer';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';

import { Link } from 'react-router-dom';
import { isTeacher } from '../../modules/actions';

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

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.changeUser = this.changeUser.bind(this);
  }

  changeUser() {
    let user = !this.props.isTeacher;
    this.props.onClickChangeUser(user);
  }

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
            {this.props.isTeacher ? (
              <Button onClick={this.changeUser} color="inherit">
                View as a student
              </Button>
            ) : (
              <Button onClick={this.changeUser} color="inherit">
                View as a Teacher
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isTeacher: state.newCourse.isTeacher
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClickChangeUser: user => {
      dispatch(isTeacher(user));
    }
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(NavBar)
);
