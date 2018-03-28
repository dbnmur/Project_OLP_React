import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  button: {
    marginRight: '45px'
  }
});

function FloatButton(props) {
  const { classes } = props;
  return (
    <div>
      <Button
        variant="fab"
        color="primary"
        aria-label="add"
        className={classes.button}>
        <AddIcon />
      </Button>
    </div>
  );
}

FloatButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatButton);
