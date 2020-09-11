import React from 'react';


import './UsersList.css';
const UsersList = ({users}) => (
    <div className="divClass">
        {users.map((user) => <div>{user.name}</div>)}
    </div>
)

export default UsersList;