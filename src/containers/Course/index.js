import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Assignment';

import Chat from '../Chat';

const modules = [
  {
    title: 'Course information',
    expanded: true,
    items: [
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
    ]
  },
  {
    title: 'Module #1',
    items: [
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
    ]
  },
  {
    title: 'Module #2',
    items: [
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
    ]
  },
  {
    title: 'Module #3',
    items: [
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
    ]
  },
  {
    title: 'Module #4',
    items: [
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
    ]
  }
];

class Course extends React.Component {
  constructor() {
    super();
    this.state = {
      modules
    };
  }
  render() {
    return (
      <Grid container spacing={8} style={{ width: '100%' }} justify="center">
        <Grid item md={5} sm={12} style={{ width: '100%' }}>
          <h1>Web Design</h1>
          {this.state.modules.map((el, index) => {
            return (
              <ExpansionPanel expanded={el.expanded} key={index}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{el.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <List>
                    {el.items.map((item, index) => {
                      return (
                        <ListItem button>
                          <ListItemIcon>
                            <InboxIcon />
                          </ListItemIcon>
                          <ListItemText primary={item.description} />
                        </ListItem>
                      );
                    })}
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </Grid>
        <Grid item md={5} sm={12} style={{ height: '100%' }}>
          <h1>Chat</h1>
          <Chat />
        </Grid>
      </Grid>
    );
  }
}

export default Course;
