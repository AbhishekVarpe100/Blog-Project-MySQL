import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login({parentData}) {
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [password, setPassword]=useState('');
    const [login,setLogin]=useState('');
    const [error,setError]=useState('');

    parentData(name);
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/login',{name,password})
        .then(res=>{
            if(res.data=='find'){
                setLogin(<div className='w-75 rounded p-2' style={{ 'backgroundColor': 'green', 'color': 'white' }}>Login Successful</div>)
                setTimeout(() => {
                    setLogin('');
                    navigate('/home')
                }, 3000);
            }

            else{
                setError(<div className='w-75 rounded p-2' style={{ 'backgroundColor': 'red', 'color': 'white' }}>Something went wrong while login</div>)
                setTimeout(() => {
                    setError('');
                }, 3000);
            }
        })

    }

    return (

       
        <center>
            <div>
                <h3>Login</h3>
                {login}
                {error}
                <form onSubmit={handleSubmit} className='w-50 m-4 border p-4'>
                    <div className="mb-3">
                        <input required onChange={(e)=>setName(e.target.value)} placeholder='Enter username' type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input required onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password' type="password" className="form-control" />
                    </div>
                    <div className='text-light'> Do not have account ? <Link to="/register">Create account</Link></div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </center>
        
    )
}

export default Login