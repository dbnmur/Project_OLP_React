import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  button: {
    marginRight: '45px'
  }
});

class FloatButton extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          onClick={this.props.onClick}
          className={classes.button}>
          <Tooltip
            id="tooltip-top"
            title="Add new"
            placement="top"
            style={{ marginBottom: '10px' }}>
            <AddIcon />
          </Tooltip>
        </Button>
      </div>
    );
  }
}

FloatButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatButton);
