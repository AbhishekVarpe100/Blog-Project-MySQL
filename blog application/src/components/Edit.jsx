import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function Edit({ username }) {
    const {id}=useParams();
    const navigate=useNavigate();
    const [blogname,setBLogName]=useState('');
    const [description,setDescription]=useState('');
    const [file,setFile]=useState('');

    useEffect(()=>{
        axios.post('http://localhost:5000/getblog/'+id)
        .then(res=>{
            setBLogName(res.data.blogname);
            setDescription(res.data.description);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])



    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('username',username);
        formData.append('blogname',blogname)
        formData.append('description',description)
        formData.append('file',file)
        formData.append('id',id)

        axios.post('http://localhost:5000/update',formData)
        .then(res=>{
            if(res.data=='updated'){
                alert("Blog updated successfully")
                setTimeout(()=>{
                    navigate('/home')
                },2000)
                setTimeout(()=>{
                    setBLogName('')
                    setDescription('')
                },2000)
            }
        })

        .catch(error=>{
            alert(error)
        })
    }
    return (
        <div>
            
            <center className='p-4 m-4' style={{'background':'pink'}}>
                <h3><i>Edit Blog</i></h3>   
                
                <form onSubmit={handleSubmit} className='w-50'>
                    <input value={blogname} required onChange={(e)=>setBLogName(e.target.value)} className='form-control' placeholder='Enter blog title' type="text" /><br />
                    <textarea value={description} required onChange={(e)=>setDescription(e.target.value)} className='form-control' placeholder='Blog description' cols="30" rows="10"></textarea><br />
                    <input required onChange={(e)=>setFile(e.target.files[0])} className='form-control' type="file" /><br />
                    <input className='btn btn-light' type="submit" value="Edit blog" />

                </form>
            </center>

        </div>
    )
}
export default Edit;