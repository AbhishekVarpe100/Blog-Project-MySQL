import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
        <h2>Blog Application</h2>
       <div className='d-flex text-white bg-secondary p-4 justify-content-around'>
        <h2>Home</h2>
        <Link to='/' className='btn btn-primary'>Login</Link>
       </div>
        <Link to='/register'></Link>
        <Link to='/home'></Link>
        </div>
    )
}

export default Navbar;
