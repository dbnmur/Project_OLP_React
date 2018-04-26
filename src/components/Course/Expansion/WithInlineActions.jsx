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
    <ExpansionPanel className="fullWidth">
      <ExpansionPanelSummary>
        {item.answerRegex ? (
          <ListItemIcon className="alignSelfCenter">
            <InboxIcon />
          </ListItemIcon>
        ) : (
          <ListItemIcon className="alignSelfCenter">
            <Description />
          </ListItemIcon>
        )}
        <Typography className="alignSelfCenter fullWidth">
          {item.name}
        </Typography>
        {/* Record action buttons */}
        {isTeacher && (
          <div className="fullWidth actionsContainer">
            {/* Update record */}
            <IconButton
              onClick={e => {
                onClickOpen(e, item);
              }}>
              <ModeEdit color="primary" className="actionButton" />
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
