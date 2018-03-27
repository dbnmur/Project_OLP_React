import React from 'react';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

class UserTable extends React.Component {
  render() {
    const { users } = this.props;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell numeric>Second name</TableCell>
              <TableCell numeric>Email</TableCell>
              <TableCell numeric>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.FirstName}</TableCell>
                  <TableCell numeric>{user.SecondName}</TableCell>
                  <TableCell numeric>{user.Email}</TableCell>
                  <TableCell numeric>{user.Role}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default UserTable;
