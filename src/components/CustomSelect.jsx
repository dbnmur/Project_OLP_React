import React from 'react';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { connect } from 'react-redux';

import { registerChatBot } from '../modules/actions';

class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      error: false
    };
    this.validationFunction = this.validationFunction.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validationFunction(node) {
    if (node.value === '' || node.value === undefined) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
  }

  render() {
    return (
      <form autoComplete="off">
        <FormControl fullWidth>
          <InputLabel htmlFor="role">{this.props.title}</InputLabel>
          <Select
            error={this.state.error}
            value={this.props.chatBot || 'Selectc'}
            onChange={e => {
              this.props.onChange(e.target.value);
              this.validationFunction(e.target);
            }}
            inputProps={{
              name: 'chatBot',
              id: 'chatBot'
            }}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.chatBots.map((el, index) => {
              return (
                <MenuItem
                  onBlur={e => {
                    this.validationFunction(e.target);
                  }}
                  key={index}
                  value={el.chatBotId}>
                  {el.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    chatBots: state.newCourse.chatBots,
    chatBot: state.newCourse.chatBot
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: id => {
      dispatch(registerChatBot(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomSelect);
