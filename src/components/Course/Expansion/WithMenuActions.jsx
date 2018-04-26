import React from 'react';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Delete from 'material-ui-icons/Delete';
import MoreVert from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';

const ExpansionWithMenuActions = ({
  module,
  isTeacher,
  handleMenuClick,
  menu,
  handleMenuClose,
  openEdit,
  openDelete,
  children
}) => {
  return (
    <ExpansionPanel className="fullWidth">
      <ExpansionPanelSummary>
        <Typography className="alignSelfCenter fullWidth moduleTitle">
          {module.name}
        </Typography>
        {/* Open module action menu */}
        {isTeacher && (
          <div className="fullWidth menuWrapper">
            <IconButton
              className="floatRight"
              aria-owns={menu ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={handleMenuClick}>
              <MoreVert />
            </IconButton>
          </div>
        )}
        {/* Module action menu */}
        <Menu
          id="simple-menu"
          anchorEl={menu}
          open={Boolean(menu)}
          onClose={handleMenuClose}>
          {/* Module edit */}
          <MenuItem onClick={handleMenuClose}>
            <Button onClick={openEdit}>
              <ModeEdit color="primary" />
              <Typography className="menuAction">Edit module</Typography>
            </Button>
          </MenuItem>
          {/* Module delete */}
          <MenuItem onClick={handleMenuClose}>
            <Button onClick={openDelete}>
              <Delete color="secondary" />
              <Typography className="menuAction">Delete module</Typography>
            </Button>
          </MenuItem>
        </Menu>
      </ExpansionPanelSummary>
      {/* Records */}
      <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpansionWithMenuActions;
