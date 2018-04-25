import React from 'react';

import UsersTable from './Users/Table/Table';
import FilterSection from './Filter';

const users = [
  {
    FirstName: 'Firstname',
    SecondName: 'Lastname',
    Email: 'email@gmail.com',
    Role: 'student'
  },
  {
    FirstName: 'Firstname',
    SecondName: 'Lastname',
    Email: 'email@gmail.com',
    Role: 'student'
  },
  {
    FirstName: 'Firstname',
    SecondName: 'Lastname',
    Email: 'email@gmail.com',
    Role: 'student'
  },
  {
    FirstName: 'Firstname',
    SecondName: 'Lastname',
    Email: 'email@gmail.com',
    Role: 'student'
  },
  {
    FirstName: 'Firstname',
    SecondName: 'Lastname',
    Email: 'email@gmail.com',
    Role: 'student'
  },
  {
    FirstName: 'Firstname',
    SecondName: 'Lastname',
    Email: 'email@gmail.com',
    Role: 'student'
  },
  {
    FirstName: 'Firstname',
    SecondName: 'Lastname',
    Email: 'email@gmail.com',
    Role: 'student'
  }
];

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: users
    };
  }

  render() {
    return (
      <div>
        <FilterSection />
        <UsersTable users={this.state.users} />
      </div>
      // TODO: implement pagination
    );
  }
}

export default AdminPanel;
