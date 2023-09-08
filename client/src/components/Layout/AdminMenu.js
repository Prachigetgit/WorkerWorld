import React from 'react'
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
        <div ClassName= "text-center">

        <div className="list-group dashboard-menu">
        <h4>Admin Panel</h4>
        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
          Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-service"
         className="list-group-item list-group-item-action">
         Create Service</NavLink>
         <NavLink to="/dashboard/admin/services"
          className="list-group-item list-group-item-action">
            Services </NavLink>
            <NavLink to="/dashboard/admin/bookings"
        className="list-group-item list-group-item-action">
     Bookings </NavLink>
     <NavLink to="/dashboard/admin/users"
      className="list-group-item list-group-item-action">
       Users</NavLink>

 
    </div>
 </div>
    </>
  );
};

export default AdminMenu