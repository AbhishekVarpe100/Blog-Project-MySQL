import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
function Home({ username }) {
    return (
        <>
            {username != null ? <div className='m-4'> <h1>Hello {username} </h1> <span><Link to='/'>Logout</Link></span>
                <hr />
                <div className='d-flex justify-content-around'>
                    <Link className='btn btn-warning' to='/home/'>All blogs</Link>
                    <Link className='btn btn-outline-warning' to='/home/createblog'>Create blog</Link>
                    <Link className='btn btn-outline-warning' to='/home/yourblogs'>Your blogs</Link>
                </div> 
                <hr />
                <Outlet></Outlet> </div> : <div>Login first to access content <Link to="/">Login here</Link>
            </div>}

        </>
    )
}
export default Home;
