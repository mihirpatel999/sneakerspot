import React, { useState } from "react";
import {
  Button,
  Form,
  Image,
  InputGroup,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router";
import logo from "/src/assets/skechers.png";
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { ShowOnLogin, ShowOnLogout } from "../../hiddenlinks";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectcart } from "../../cartSlice";

export const Header = () => {
  const redirect = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleLogout = () => {
    if (sessionStorage.getItem("3edfeb") !== null) {
      sessionStorage.removeItem("3edfeb");
      toast.success("Logout successfully");
      redirect("/");
    }
  };

  const handleProduct = (category) => {
    redirect(`/products?category=${category}`);
  };

  const handleRentalProduct = (category) => {
    redirect(`/rentalproducts?category=${category}`);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      redirect(`/products?search=${searchTerm.trim()}`);
    }
  };

  const cartItem = useSelector(selectcart) || [];
  const {rent,rentalCart} = useSelector(state=>state.rentalCart)
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary w-100">
        <Container fluid>
          <Navbar.Brand href="#">
            <Image src={logo} style={{ height: 30, width: 150 }} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 d-flex justify-content-between align-items-center">
              <div className="d-flex gap-3">
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                <NavDropdown title="Rental Products">
                  <NavDropdown.Item onClick={() => handleRentalProduct("Men")}> Men</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleRentalProduct("Women")}>Women</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleRentalProduct("Kids")}>Kids</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={NavLink} to="/Contactus">Contact us</Nav.Link>
                <NavDropdown title="Category">
                  <NavDropdown.Item onClick={() => handleProduct("Men")}>
                    Men
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleProduct("Women")}>
                    Women
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleProduct("Kids")}>
                    Kids
                  </NavDropdown.Item>
                </NavDropdown>
              </div>

              {/* ✅ SEARCH FUNCTIONALITY */}
              <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                <InputGroup>
                  <Form.Control
                    placeholder="Search for products..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ backgroundColor: "skyblue" }}
                  />
                  <Button onClick={handleSearch}>
                    <FaSearch />
                  </Button>
                </InputGroup>
              </Form>

              <div className="d-flex align-items-center gap-3">
                <ShowOnLogin>
                  <FaRegCircleUser style={{ fontSize: 35 }} />
                  <NavDropdown title={`Welcome`} id="basic-nav-dropdown">
                    <NavDropdown.Item as={NavLink} to="/Myprofile">
                      My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/myorder">
                      My Order
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/Trackorder">
                      Track Order
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </ShowOnLogin>

                <ShowOnLogout>
                  <Nav.Link as={NavLink} to="/Login">Login</Nav.Link>
                </ShowOnLogout>
              </div>

              <Nav className="ms-auto">
                {rent ?
                
                <Nav.Link as={NavLink} to="/rental">
                <div style={{ position: "relative", marginRight: "20px" }}>
                  <BsCart3 style={{ fontSize: "30px" }} />
                  <span
                    className="badge rounded-pill text-bg-danger"
                    style={{ position: "absolute", top: "-10px", right: "-15px" }}
                  >
                    {rentalCart?.length || 0} 
                  </span>
                </div>
              </Nav.Link>:
                   <Nav.Link as={NavLink} to="/cart">
                   <div style={{ position: "relative", marginRight: "20px" }}>
                     <BsCart3 style={{ fontSize: "30px" }} />
                     <span
                       className="badge rounded-pill text-bg-danger"
                       style={{ position: "absolute", top: "-10px", right: "-15px" }}
                     >
                       {cartItem?.length || 0} 
                     </span>
                   </div>
                 </Nav.Link>
                }
             
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Header;
