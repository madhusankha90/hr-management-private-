import React from 'react';

const Menu = () => {
  const role = localStorage.getItem('role');

  return (
    <nav>
      {role === 'admin' ? (
        <>
          <a href="/admin-dashboard">Admin Dashboard</a>
          <a href="/add-user">Add User</a>
          <a href="/payments">Payments</a>
          <a href="/all-users">All Users</a>
          <a href="/company-details">Company Details</a>
          <a href="/events">Events</a>
        </>
      ) : (
        <>
          <a href="/user-dashboard">User Dashboard</a>
          <a href="/company-details">Company Details</a>
        </>
      )}
    </nav>
  );
};

export default Menu;
