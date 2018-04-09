import React from 'react';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { connect } from 'react-redux';

import { registerChatBot } from '../../modules/actions';

class CustomSelect extends React.Component {
  state = {
    role: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <form autoComplete="off">
        <FormControl fullWidth>
          <InputLabel htmlFor="role">{this.props.title}</InputLabel>
          <Select
            value={this.props.chatBot || ''}
            onChange={e => {
              this.props.onChange(e.target.value);
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
                <MenuItem key={index} value={el.chatBotId}>
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
