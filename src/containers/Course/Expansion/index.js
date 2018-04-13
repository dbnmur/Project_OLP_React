import React from 'react';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
// import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
// import InboxIcon from 'material-ui-icons/Assignment';

const Expansion = props => {
  return (
    <ExpansionPanel expanded={props.expanded} key={props.index}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {/* <List>
          {props.items.map((item, index) => {
            return (
              <ListItem button key={index}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={item.description} />
              </ListItem>
            );
          })}
        </List> */}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Expansion;
