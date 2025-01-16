import React from 'react'
import classes from  './Dashboard.module.css'
import ProductList from './products/PList'
import ProductForm from './products/PForm'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate();
  const handleLogout = () => {
    console.log('logout is called');
    navigate('/');
  }
    

    
  return (
    
    <div>
    <header className={classes.header}>
      <h1 className={classes.title}>My Inventory</h1>
      <button
        className={classes.logoutButton}
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>

    <div className={classes.dashboard}>
      <div className={classes.ProductForm}>
        <ProductForm/>
      </div>
      <div className={classes.ProductList}>
        <ProductList/>
        
      </div>
      </div>  
   </div>
          
  )
}

export default Dashboard;