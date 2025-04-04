import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router'
import { Sidebar } from './Sidebar'
import { AdminNavbar } from './AdminNavbar'

export const Admin= () => {
  const[show,setShow] = useState(false);
  return (
   <>
   <div className="d-flex vh-100">
    <Sidebar show={show} setShow={setShow}/>
    <div className="flex-grow-1">
      <AdminNavbar setShow={setShow}/>
      <Container><Outlet></Outlet></Container>

     
    </div>
   </div>

   </>
  )
}

