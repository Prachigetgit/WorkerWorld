import React from 'react'
import { NavLink } from 'react-router-dom';
const UserMenu = () => {
  
 


  return (
    <>
        <div ClassName= "text-center">

        <div className="list-group">
        <h4>Dashboard</h4>
  <NavLink to="/dashboard/user/profile"
     className="list-group-item list-group-item-action ">
      Profile
  </NavLink>
  <NavLink to="/dashboard/user/bookings" 
    className="list-group-item list-group-item-action">
     My Bookings
     </NavLink>
    </div>
 </div>
    </>
  );
};


export default UserMenu;









