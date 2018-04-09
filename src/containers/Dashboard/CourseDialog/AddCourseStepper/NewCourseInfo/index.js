import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import {
  registerTitle,
  registerDescription
} from '../../../../../modules/actions';

const NewCourseInfo = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange
}) => {
  return (
    <form autoComplete="off">
      <TextField
        id="title"
        fullWidth
        label="Course title"
        required
        margin="normal"
        value={title || ''}
        onChange={e => {
          e.preventDefault();
          onTitleChange(e.target.value);
        }}
      />
      <TextField
        id="description"
        label="Description"
        type="text"
        fullWidth
        multiline
        rows={5}
        required
        margin="normal"
        value={description || ''}
        onChange={e => {
          e.preventDefault();
          onDescriptionChange(e.target.value);
        }}
      />
    </form>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(NewCourseInfo);
