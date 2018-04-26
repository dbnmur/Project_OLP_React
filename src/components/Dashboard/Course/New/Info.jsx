import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import {
  registerTitle,
  registerDescription
} from '../../../../modules/actions';

class CourseNewInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };

    this.validationFunction = this.validationFunction.bind(this);
  }

  validationFunction(node) {
    if (node.value === '') {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
  }

  render() {
    return (
      <form autoComplete="off">
        <TextField
          id="title"
          fullWidth
          label="Course title"
          required
          margin="normal"
          error={this.state.error}
          value={this.props.title || ''}
          onBlur={e => {
            e.preventDefault();
            this.validationFunction(e.target);
          }}
          onChange={e => {
            e.preventDefault();
            this.props.onTitleChange(e.target.value);
          }}
        />
        <TextField
          id="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={5}
          margin="normal"
          value={this.props.description || ''}
          onChange={e => {
            e.preventDefault();
            this.props.onDescriptionChange(e.target.value);
          }}
        />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    title: state.newCourse.title,
    description: state.newCourse.description
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTitleChange: text => {
      dispatch(registerTitle(text));
    },
    onDescriptionChange: description => {
      dispatch(registerDescription(description));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseNewInfo);
