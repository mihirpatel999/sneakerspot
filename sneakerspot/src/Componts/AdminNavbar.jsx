import React from 'react'
import { Button, Navbar } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export const AdminNavbar = ({setShow}) => {
    const redirect = useNavigate()
    const handleLogout=()=>{
      if(sessionStorage.getItem("3edfeb") !=null){
        sessionStorage.removeItem("3edfeb")
        toast.success('logout successfully')
        redirect('/')
      }
    }
  return (
    <>
      <Navbar bg="info" variant="dark" className="d-flex justify-content-between px-3">
    <div className="d-flex align-items-center">
      <Button className="d-md-none btn btn-outline-light" onClick={()=>setShow(true)} >
        <FaBars />
      </Button>
      <Navbar.Brand className="ms-2">Admin Panel</Navbar.Brand>
    </div>
    <div className="d-flex align-items-center">
      <span className="text-white me-3">Welcome, Admin</span>
      <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
  </div>
  </Navbar>
    </>
  )
}
