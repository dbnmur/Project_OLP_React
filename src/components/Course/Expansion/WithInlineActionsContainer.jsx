import React from 'react';
import axios from 'axios';

import ExpansionWithInlineActions from './WithInlineActions';

class ExpansionWithInlineActionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };

    this.onClickDelete = this.onClickDelete.bind(this);
    this.filterRecordsAfterDeletion = this.filterRecordsAfterDeletion.bind(
      this
    );
  }

  // Delete a record
  onClickDelete = (event, recordId) => {
    event.stopPropagation();
    axios
      .delete(`/api/records/${recordId}`)
      .then(res => {
        this.filterRecordsAfterDeletion(recordId);
      })
      .catch(error => {
        console.log(error);
      });
  };

  filterRecordsAfterDeletion(recordId) {
    let items = this.state.items.filter(item => item.recordId !== recordId);
    this.setState({ items });
  }

  render() {
    return (
      <ExpansionWithInlineActions
        onClickDelete={this.onClickDelete}
        onClickOpen={this.props.onClickOpen}
        item={this.props.item}
        isTeacher={this.props.isTeacher}
      />
    );
  }
}

export default ExpansionWithInlineActionsContainer;
