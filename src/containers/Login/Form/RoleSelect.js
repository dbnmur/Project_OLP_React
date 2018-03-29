import React from 'react';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

class RoleSelect extends React.Component {
  state = {
    role: '',
    name: 'hai'
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor="role">Role</InputLabel>
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
          <MenuItem value={10}>Student</MenuItem>
          <MenuItem value={20}>Instructor</MenuItem>
        </Select>
      </FormControl>
    );
  }
}

export default RoleSelect;
