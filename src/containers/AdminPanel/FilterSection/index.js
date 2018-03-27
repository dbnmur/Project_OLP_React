import React from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import CustomSelect from '../FilterSection/CustomSelect';

class FilterSection extends React.Component {
  render() {
    return (
      <Grid
        justify="center"
        alignItems="center"
        container
        spacing={24}
        style={{ width: '100%', marginTop: '35px' }}>
        <Grid item md={6} style={{ margin: '0' }}>
          <form noValidate autoComplete="off">
            <TextField
              style={{ margin: '0' }}
              fullWidth
              id="name"
              label="Search"
              value=""
              margin="normal"
            />
          </form>
        </Grid>
        <Grid item md={2}>
          <CustomSelect title="Group" menuItems={['PI15B', 'PI16B', 'PI17B']} />
        </Grid>
      </Grid>
    );
  }
}

export default FilterSection;
