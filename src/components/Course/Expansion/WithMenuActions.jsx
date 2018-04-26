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
    <ExpansionPanel style={{ width: '100%' }}>
      <ExpansionPanelSummary>
        <Typography
          style={{ width: '100%', alignSelf: 'center', fontSize: '1.5em' }}>
          {module.name}
        </Typography>
        {/* Open module action menu */}
        {isTeacher && (
          <div
            style={{
              width: '100%',
              textAlign: 'right',
              padding: '0'
            }}>
            <IconButton
              style={{ float: 'right' }}
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
              <Typography style={{ padding: '10px' }}>Edit module</Typography>
            </Button>
          </MenuItem>
          {/* Module delete */}
          <MenuItem onClick={handleMenuClose}>
            <Button onClick={openDelete}>
              <Delete color="secondary" />
              <Typography style={{ padding: '10px' }}>Delete module</Typography>
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
