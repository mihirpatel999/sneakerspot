import React from 'react'
import { Nav, Offcanvas } from 'react-bootstrap'
import { FaHome, FaList, FaPenFancy, FaThList, FaUser } from 'react-icons/fa'
import { NavLink } from 'react-router'


export const Sidebar = ({show,setShow}) => {

  const links=[
    {url:'admin' , text:'dashboard', icon:<FaHome/>},
    {url:'/admin/board' , text:'board', icon:<FaHome/>},
    {url:'/admin/add' , text:'Add Product', icon:<FaList/>},
    {url:'/admin/view' , text:'View Product', icon:<FaPenFancy/>},
    {url:'/admin/users' ,text:'Manage users' , icon:<FaThList/>},
    {url:'/admin/orders' ,text:'Manage orders' , icon:<FaUser/>},
    {url:'/admin/rentalproduct',text:'Add Rental Product',icon:<FaPenFancy/>},
    {url:'/admin/viewproduct',text:'View Rental Product',icon:< FaPenFancy/>},
    {url:'/admin/orders',text:' Orders',icon:< FaPenFancy/>},
    {url:'/admin/managereview',text:' review',icon:< FaPenFancy/>}
  ]
  
  return (
  <>
  <div className="d-md-flex d-none flex-column bg-dark p-3 text-white" style={{ width: "250px" , backgroundColor:"gray"}}>
  <h4 className="text-center">Admin</h4>
  <Nav className="flex-column">
  {links.map((link,index)=>
             <Nav.Link as={NavLink} key={index} to={link.url} className="text-white mb-4">
             <span className='me-2'> {link.icon}</span> {link.text}
           </Nav.Link>
          )}
  </Nav>
  </div>



<Offcanvas show={show} onHide = {()=>setShow(!show)} className="bg-dark text-white">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
  
          <Nav className="flex-column">
          {links.map((link,index)=>
             <Nav.Link as={NavLink} key={index} to={link.url} className="text-white mb-4">
             <span className='me-2'> {link.icon}</span> {link.text}
           </Nav.Link>
          )}
          
          
          </Nav>
          
        </Offcanvas.Body>
        </Offcanvas>
  </>
  )
}
