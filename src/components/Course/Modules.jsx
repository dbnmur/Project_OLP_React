import React from 'react';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import Add from 'material-ui-icons/Add';
import axios from 'axios';
import { connect } from 'react-redux';

import CourseModuleDelete from './Module/Delete';
import CourseModuleEdit from './Module/Edit';
import CourseRecordAction from './Record/Action';
import ExpansionWithInlineActionsContainer from './Expansion/WithInlineActionsContainer';
import ExpansionWithMenuActions from './Expansion/WithMenuActions';

class CourseModules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      openRecordCreate: false,
      openRecordUpdate: false,
      buttonDisabled: false,
      menu: null,
      moduleDelete: false,
      moduleEdit: false,
      selectedRecord: {},
      selectedExercise: {},
      panelExpanded: false
    };

    this.onClickPost = this.onClickPost.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleModuleDeleteClose = this.handleModuleDeleteClose.bind(this);
    this.onModuleDeleteConfirm = this.onModuleDeleteConfirm.bind(this);
    this.onModuleUpdateConfirm = this.onModuleUpdateConfirm.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.onclickOpenRecordUpdate = this.onclickOpenRecordUpdate.bind(this);
    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.filterRecordsAfterDeletion = this.filterRecordsAfterDeletion.bind(
      this
    );
  }

  componentDidMount() {
    axios.get(`/api/modules/${this.props.module.moduleId}`).then(res => {
      this.setState({
        items: res.data.records
      });
    });
  }

  // Module actions menu
  handleMenuClick = event => {
    event.stopPropagation();
    this.setState({ menu: event.currentTarget });
  };

  handleMenuClose = event => {
    event.stopPropagation();
    this.setState({ menu: null });
  };

  // Delete a module by a given id
  handleModuleDeleteClose() {
    this.setState({ moduleDelete: false });
  }

  onModuleDeleteConfirm() {
    axios
      .delete(`/api/modules/${this.props.module.moduleId}`)
      .then(res => {
        this.handleModuleDeleteClose();
        this.props.onModuleDelete(this.props.module.moduleId);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Update module by a given id
  onModuleUpdateConfirm(name) {
    const axiosConfig = {
      headers: {
        'content-type': 'application/json-patch+json'
      }
    };

    const postData = {
      ...this.props.module,
      name
    };

    axios
      .put(`/api/modules/${this.props.module.moduleId}`, postData, axiosConfig)
      .then(res => {
        console.log(res.data);
        this.props.onModuleUpdate(postData);
        this.handleClose();
      })
      .catch(error => {
        console.log(error);
        this.handleClose();
      });
  }

  // Create new record
  handleClickOpen = () => {
    this.setState({ openRecordCreate: true });
  };

  handleClose = () => {
    this.setState({
      openRecordCreate: false,
      buttonDisabled: false,
      openRecordUpdate: false,
      selectedRecord: {},
      moduleEdit: false
    });
  };

  onClickPost(record) {
    this.setState({ buttonDisabled: true });
    const axiosConfig = {
      headers: {
        'content-type': 'application/json-patch+json'
      }
    };
    let postData = {};

    record.type === 'record'
      ? (postData = {
          description: record.description,
          name: record.name,
          moduleId: this.props.module.moduleId
        })
      : (postData = {
          description: record.description,
          name: record.name,
          moduleId: this.props.module.moduleId,
          answerRegex: record.answerRegex,
          isCompleted: false
        });
    axios
      .post(
        record.type === 'record' ? '/api/records' : '/api/exercises',
        postData,
        axiosConfig
      )
      .then(res => {
        this.setState(prevState => ({
          items: [...prevState.items, res.data]
        }));
        this.handleClose();
      })
      .catch(error => {
        console.log(error);
        this.handleClose();
      });
  }

  // Update a record
  onClickUpdate(record) {
    this.setState({ buttonDisabled: true });
    const axiosConfig = {
      headers: {
        'content-type': 'application/json-patch+json'
      }
    };

    let postData = {};

    record.type === 'record'
      ? (postData = {
          ...this.state.selectedRecord,
          description: record.description,
          name: record.name,
          moduleId: this.props.module.moduleId
        })
      : (postData = {
          ...this.state.selectedRecord,
          description: record.description,
          name: record.name,
          moduleId: this.props.module.moduleId,
          answerRegex: record.answerRegex,
          isCompleted: false
        });

    axios
      .put(
        record.type === 'record'
          ? `/api/records/${this.state.selectedRecord.recordId}`
          : `/api/exercises/${this.state.selectedRecord.recordId}`,
        postData,
        axiosConfig
      )
      .then(res => {
        let tempState = this.state.items;
        tempState.forEach(el => {
          if (el.recordId === this.state.selectedRecord.recordId) {
            el.name = record.name;
            el.description = record.description;
          }
        });
        this.setState({ items: tempState });

        this.handleClose();
      })
      .catch(error => {
        console.log(error);
        this.handleClose();
      });
  }

  openEdit() {
    this.setState({ moduleEdit: true });
  }

  openDelete() {
    this.setState({ moduleDelete: true });
  }

  onclickOpenRecordUpdate(e, record) {
    e.stopPropagation();
    this.setState({ openRecordUpdate: true, selectedRecord: record });
  }

  filterRecordsAfterDeletion(recordId) {
    let items = this.state.items.filter(item => item.recordId !== recordId);
    this.setState({ items });
  }

  render() {
    const { menu, items } = this.state;
    return (
      <div className="module">
        {/* Module panel */}
        <ExpansionWithMenuActions
          module={this.props.module}
          isTeacher={this.props.isTeacher}
          handleMenuClick={this.handleMenuClick}
          menu={menu}
          handleMenuClose={this.handleMenuClose}
          openEdit={this.openEdit}
          openDelete={this.openDelete}>
          <List className="fullWidth">
            {items.map((item, index) => {
              return (
                <ListItem key={item.recordId} className="moduleItem">
                  {/* Record panel */}
                  <ExpansionWithInlineActionsContainer
                    item={item}
                    isTeacher={this.props.isTeacher}
                    onClickOpen={this.onclickOpenRecordUpdate}
                    filterAfterDelete={this.filterRecordsAfterDeletion}
                  />
                </ListItem>
              );
            })}
            {/* Add new record */}
            {this.props.isTeacher && (
              <ListItem button dense onClick={this.handleClickOpen}>
                <ListItemIcon>
                  <Add style={{ margin: '0 auto' }} />
                </ListItemIcon>
              </ListItem>
            )}
          </List>
        </ExpansionWithMenuActions>
        {/* Record creation module */}
        <CourseRecordAction
          buttonDisabled={this.state.buttonDisabled}
          open={this.state.openRecordCreate}
          title={this.props.module.name}
          onClose={this.handleClose}
          onConfirm={this.onClickPost}
          record={this.state.selectedRecord}
          action="create">
          Add a new record
        </CourseRecordAction>
        {/* Record update module */}
        <CourseRecordAction
          buttonDisabled={this.state.buttonDisabled}
          open={this.state.openRecordUpdate}
          onClose={this.handleClose}
          record={this.state.selectedRecord}
          onConfirm={this.onClickUpdate}
          action="update">
          Update record
        </CourseRecordAction>
        {/* Module delete dialog */}
        <CourseModuleDelete
          moduleDelete={this.state.moduleDelete}
          onClose={this.handleModuleDeleteClose}
          onConfirm={this.onModuleDeleteConfirm}
          moduleName={this.props.module.name}
        />
        <CourseModuleEdit
          open={this.state.moduleEdit}
          onClose={this.handleClose}
          onConfirm={this.onModuleUpdateConfirm}
          moduleName={this.props.module.name}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isTeacher: state.newCourse.isTeacher,
    botResponse: state.newCourse.botResponse
  };
};

export default connect(mapStateToProps, null)(CourseModules);
