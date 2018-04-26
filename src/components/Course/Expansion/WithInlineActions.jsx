import React from 'react';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import { ListItemIcon } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Laptop';
import Description from 'material-ui-icons/Description';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Delete from 'material-ui-icons/Delete';

const ExpansionWithInlineActions = ({
  item,
  onClickDelete,
  onClickOpen,
  isTeacher
}) => {
  return (
    <ExpansionPanel style={{ width: '100%' }}>
      <ExpansionPanelSummary>
        {item.answerRegex ? (
          <ListItemIcon style={{ alignSelf: 'center' }}>
            <InboxIcon />
          </ListItemIcon>
        ) : (
          <ListItemIcon style={{ alignSelf: 'center' }}>
            <Description />
          </ListItemIcon>
        )}
        <Typography style={{ alignSelf: 'center', width: '100%' }}>
          {item.name}
        </Typography>
        {/* Record action buttons */}
        {isTeacher && (
          <div
            style={{
              width: '100%',
              textAlign: 'right',
              padding: '0'
            }}>
            {/* Update record */}
            <IconButton
              onClick={e => {
                onClickOpen(e, item);
              }}>
              <ModeEdit color="primary" style={{ marginLeft: '5px' }} />
            </IconButton>
            {/* Delete record */}
            <IconButton
              onClick={e => {
                onClickDelete(e, item.recordId);
              }}>
              <Delete color="secondary" />
            </IconButton>
          </div>
        )}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>{item.description}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpansionWithInlineActions;
