import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AllBlogs from './components/AllBlogs';
import CreateBlog from './components/CreateBlog';
import YourBlogs from './components/YourBlogs';
import Edit from './components/Edit';

function App() {
  const [childName, setChildData] = useState(null);

  const handleChildData = (data) => {
    setChildData(data);
  };
  
  return (
    <div>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Login parentData={handleChildData}></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>

            <Route path='/edit/:id' element={<Edit></Edit>}></Route>
            <Route path='/home' element={<Home username={childName}></Home>}>
            <Route path='' element={<AllBlogs username={childName}></AllBlogs>}>


            </Route>
            <Route path='createblog' element={<CreateBlog username={childName}></CreateBlog>}></Route>
            <Route path='yourblogs' element={<YourBlogs username={childName}></YourBlogs>}></Route>
            </Route>

          </Routes>
        </Router>

    </div>
  )
}

export default App;
