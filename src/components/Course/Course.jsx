import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import CreateNewFolder from 'material-ui-icons/CreateNewFolder';
import Tooltip from 'material-ui/Tooltip';
import Menu, { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import KeyBoardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import { CircularProgress } from 'material-ui/Progress';
import _ from 'lodash';

import CourseChatContainer from './ChatContainer';
import CourseModules from './Modules';

const Course = ({
  isLoading,
  course,
  isTeacher,
  menuParent,
  handleMenuClick,
  handleMenuClose,
  keyPress,
  handleNewModuleClick,
  modules,
  moduleDelete,
  moduleUpdate
}) => {
  return (
    <Grid container spacing={8} className="fullWidth" justify="center">
      {!isLoading ? (
        <Grid item md={5} sm={12} className="fullWidth">
          <Grid
            container
            spacing={8}
            className="fullWidth"
            justify="flex-start"
            alignItems="center">
            <h1>{course.name}</h1>
            {isTeacher && (
              <React.Fragment>
                <Tooltip title="Add new module">
                  <Button
                    className="createModuleButton"
                    variant="fab"
                    mini
                    color="secondary"
                    aria-label="add"
                    aria-owns={menuParent ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={handleMenuClick}>
                    <CreateNewFolder />
                  </Button>
                </Tooltip>
                <Menu
                  id="simple-menu"
                  className="moduleCreationMenu"
                  open={Boolean(menuParent)}
                  onClose={handleMenuClose}
                  anchorEl={menuParent}>
                  <MenuItem>
                    <TextField
                      id="name"
                      label="New module name"
                      margin="normal"
                      size="small"
                      onChange={keyPress}
                    />
                    <Button
                      variant="raised"
                      color="secondary"
                      mini
                      onClick={handleNewModuleClick}>
                      <KeyBoardArrowRight />
                    </Button>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </Grid>
          {modules.map((el, index) => {
            return (
              <CourseModules
                module={{ ...el }}
                key={el.moduleId}
                onModuleDelete={moduleDelete}
                onModuleUpdate={moduleUpdate}
              />
            );
          })}
        </Grid>
      ) : (
        <Grid item md={5}>
          <CircularProgress />
        </Grid>
      )}
      <Grid item md={5} sm={12} className="fullHeight">
        <h1>Chat</h1>
        {_.isEmpty(course) ? (
          <CourseChatContainer />
        ) : (
          <CourseChatContainer link={course.chatBot.link} />
        )}
      </Grid>
    </Grid>
  );
};

export default Course;
