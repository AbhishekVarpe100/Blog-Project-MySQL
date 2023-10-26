import React from 'react'
import { useState } from 'react';
import axios from 'axios';
function CreateBlog({ username }) {

    const [blogname,setBLogName]=useState('');
    const [description,setDescription]=useState('');
    const [file,setFile]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('username',username);
        formData.append('blogname',blogname)
        formData.append('description',description)
        formData.append('file',file)

        axios.post('http://localhost:5000/addblog',formData)
        .then(res=>{
            if(res.data=='added'){
                alert("Blog added successfully")
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
                <form onSubmit={handleSubmit} className='w-50'>
                    <input value={blogname} required onChange={(e)=>setBLogName(e.target.value)} className='form-control' placeholder='Enter blog title' type="text" /><br />
                    <textarea value={description} required onChange={(e)=>setDescription(e.target.value)} className='form-control' placeholder='Blog description' cols="30" rows="10"></textarea><br />
                    <input required onChange={(e)=>setFile(e.target.files[0])} className='form-control' type="file" /><br />
                    <input className='btn btn-light' type="submit" value="Publish blog" />

                </form>
            </center>

        </div>
    )
}
export default CreateBlog;