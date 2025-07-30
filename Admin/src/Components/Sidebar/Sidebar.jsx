import React from 'react';
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/login');
  };

  return (
    <div className='sidebar'>
      <Link to='/addproduct' className='sidebar-item-link'>
        <div className='sidebar-item'>
          <p><span className='s1'>Add Product</span></p>
        </div>
      </Link>

      <Link to='/listproduct' className='sidebar-item-link'>
        <div className='sidebar-item'>
          <p><span>Product List</span></p>
        </div>
      </Link>

      <Link to='/viewusers' className='sidebar-item-link'>
        <div className='sidebar-item'>
          <p><span>View Users</span></p>
        </div>
      </Link>

      <Link to='/allstocks' className='sidebar-item-link'>
        <div className='sidebar-item'>
          <p><span>All Orders</span></p>
        </div>
      </Link>

        <Link to='/Taxes' className='sidebar-item-link'>
        <div className='sidebar-item'>
          <p><span>Taxes %</span></p>
        </div>
      </Link>

    </div>
  );
};

export default Sidebar;
