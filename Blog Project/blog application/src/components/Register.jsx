import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');
    const [register, setRegister] = useState('');
    const navigate = useNavigate('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const register = { name, email, password };
        axios.post('http://localhost:5000/register', register)
            .then(res => {

                if (res.data == 'register') {
                    setRegister(<div className='w-75 rounded p-2' style={{ 'backgroundColor': 'blue', 'color': 'white' }}>Registered Successfully</div>)

                    setTimeout(() => {
                        setName('');
                        setEmail('');
                        setPassword('');
                        setRegister('')
                        setTimeout(() => {
                            navigate('/')
                        }, 1000);

                    }, 3000);

                }
                else if (res.data == 'present') {
                    setWarning(<div className='w-75 rounded p-2' style={{ 'backgroundColor': 'yellow', 'color': 'black' }}>User already exist with this email id</div>)
                    setTimeout(() => {
                        setWarning('');
                    }, 3000)
                }

                else {
                    alert("Something went wrong while register")
                }
            })

    }
    return (
        <center>
            <div>
                <h3>Register / Sign Up</h3>
                {warning}
                {register}
                <form onSubmit={handleSubmit} className='w-50 m-4 border p-4'>
                    <div className="mb-3">
                        <input value={name} required onChange={(e) => setName(e.target.value)} placeholder='Enter username' type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input value={email} required onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' type="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input value={password} required onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' type="password" className="form-control" />
                    </div>
                    <div className='text-light'> Already have account ? <Link to="/">Login here</Link></div>
                    <input className='btn btn-primary' type="submit" value="Register" />
                </form>
            </div>
        </center>
    )
}

export default Register;