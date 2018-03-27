import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import CustomSelect from '../FilterSection/Select';

class FilterSection extends React.Component {
  render() {
    return (
      <Grid container spacing={24} style={{ width: '100%' }}>
        <Grid item md={6}>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              id="name"
              label="Search"
              value=""
              margin="normal"
            />
          </form>
        </Grid>
        <Grid item md={6}>
          <CustomSelect title="Group" menuItems={['PI15B', 'PI16B', 'PI17B']} />
        </Grid>
      </Grid>
    );
  }
}

export default FilterSection;
