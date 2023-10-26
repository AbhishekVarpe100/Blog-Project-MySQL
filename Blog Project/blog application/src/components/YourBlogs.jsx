import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Style.css'
import axios from 'axios';
function YourBlogs({username}) {

    const [data, setBlog] = useState([]);

    const blogData = () => {
        axios.get('http://localhost:5000/getblog/'+username)
            .then(blog => {
                setBlog(blog.data)
            })
            .catch((err) => console.log(err))

    }

    useEffect(() => {
      blogData();
    }, [])

    // const handleDelete = (name) => {
    //     axios.delete(`http://localhost:3000/deletecosmetics/${name}`)
    //         .then((res) => {
    //             if (res.data == 'success') {
    //                 setDelete(<div className='alert alert-danger'>Product deleted successfully</div>)
    //                 setTimeout(() => {
    //                     setDelete("")
    //                     setTimeout(() => {
    //                         cosmeticsData();
    //                     }, 100)
    //                 }, 3000);
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }

    return (
        <div className='m-4'>
          {username}
            <center>
            <h2 className='heading text-white w-25 p-4 m-2'>Your Blogs</h2>
            </center>

            <div className='row'>

                {data.length != 0 ? data.map((item) => (

                    <div className='border text-white col-md-3 col-lg-3 myimagetemplate1 p-4 rounded' key={item.id} >
                        <img className="card-img-top" src={`http://localhost:5000/Images/${item.image}`} alt="Card image cap" />
                        <hr />
                        <div className="card-body">
                            <p className="card-title w-100"><b className='text-info'> <i> Blog Creator : </i> </b >{item.username}</p>
                            <p className="card-title w-100"><b className='text-info'> <i> Blog Name : </i> </b >{item.blogname}</p>
                            <p className="card-text w-100"><b className='text-info'> <i> Blog description : </i> </b>{item.description}</p>
                        </div>
                        <hr />
                        <div className="card-body">
                        {/* <Link className='btn btn-primary w-100' to={`/admin/available/editcosmetics/${item.id}`}>Edit</Link> */}
                            {/* <button onClick={() => handleDelete(item.name)} class="btn btn-danger w-100 my-2">Delete</button> */}
                        </div>
                    </div>

                )) : <div className='alert alert-warning'>🙁 Oops! <i> <b>You haven't posted any blog yet</b> </i> </div>}
            </div>


        </div>
        
    )
}

export default YourBlogs;