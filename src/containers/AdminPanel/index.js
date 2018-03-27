import React from 'react';

import UserTable from './UserTable';
import FilterSection from './FilterSection';

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
        <UserTable users={this.state.users} />;
      </div>
    );
  }
}

export default AdminPanel;
