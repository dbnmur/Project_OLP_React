import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import axios from 'axios';

import FloatButton from './FloatButton';
import AddCourseStepper from './AddCourseStepper';

export default class CourseDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      groups: [],
      isError: false,
      errorMessage: ''
    };

    this.extraxtGroupNamesFromObject = this.extraxtGroupNamesFromObject.bind(
      this
    );
  }

  extraxtGroupNamesFromObject = arr => {
    let temp = [];

    arr.forEach(el => {
      temp.push(el.name);
    });

    return temp;
  };

  componentDidMount() {
    axios
      .get('/api/groups')
      .then(response => {
        this.setState({
          groups: this.extraxtGroupNamesFromObject(response.data)
        });
      })
      .catch(error => {
        return error;
      });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <FloatButton onClick={this.handleClickOpen} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a new course</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new course fill the form below
            </DialogContentText>
            <AddCourseStepper
              groups={this.state.groups}
              myClick={this.handleClose}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}