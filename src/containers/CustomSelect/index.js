import React from 'react';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

class CustomSelect extends React.Component {
  state = {
    role: '',
    name: 'hai'
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { menuItems } = this.props;
    return (
      <form autoComplete="off">
        <FormControl fullWidth>
          <InputLabel htmlFor="role">{this.props.title}</InputLabel>
          <Select
            value={this.state.role}
            onChange={this.handleChange}
            inputProps={{
              name: 'role',
              id: 'role'
            }}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {menuItems.map((el, index) => {
              return (
                <MenuItem key={index} value={index}>
                  {el}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default CustomSelect;
