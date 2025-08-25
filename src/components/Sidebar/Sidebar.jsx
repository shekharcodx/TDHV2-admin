import { Link } from "react-router-dom";
import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import LogoNav from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import {
  Menu,
  Home,
  Users,
  UserPlus,
  ShoppingCart,
  Building2,
  Globe,
  MapPin,
  Star,
  Shield,
  LayoutGrid,
  BadgeCheck,
  ChevronDown,
  Castle,
  Landmark,
  Fingerprint,
  LayoutDashboard,
  Folder,
  CarFront,
  List,
  PenTool,
  Pen,
  Settings,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigate = (page) => {
    if (typeof onNavigate === "function") onNavigate(page);
  };

 

  return (
    <aside className={`sidebar d-flex flex-column ${collapsed ? "is-collapsed" : ""}`}>
      {/* Header + Toggle */}
      <div className="sidebar__header d-flex align-items-center justify-content-between px-3">
        <span className="sidebar__logo text-truncate d-none d-md-inline">
          <Link to="/dashboard">
            <img src={LogoNav} alt="Logo" />
          </Link>
        </span>
        <button
          className="btn ToogleBtn btn-sm btn-outline-light d-inline-flex align-items-center gap-1"
          onClick={() => setCollapsed((v) => !v)}
          aria-label="Toggle sidebar"
        >
          <Menu size={16} />
        </button>
      </div>

      {/* Accordion Menu */}
      <div className="sidebar__scroll">
        
        <Accordion defaultActiveKey="0" flush className="sidebar-accordion">
          {/* Dashboard */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <LayoutDashboard size={18} className="me-2" /> <span>Dashboard</span>
              <ChevronDown className="accordion-arrow" size={16} />
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Dashboard")}>
                   <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>Overview </NavLink>
                   
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <hr/>
          {/* Vendors */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <Users size={18} className="me-2" /> <span>Vendors</span>
              <ChevronDown className="accordion-arrow" size={16} />
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
              <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Vendor List")}>
                    <NavLink to="/vendors-list" className={({ isActive }) => (isActive ? "active" : "")}>Vendor List</NavLink>
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Vendors Profile")}>
                    <NavLink to="/vendors-profile" className={({ isActive }) => (isActive ? "active" : "")}> Vendors Profile</NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* Admin */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <UserPlus size={18} className="me-2" /> <span>Admin</span>
              <ChevronDown className="accordion-arrow" size={16} />
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("User List")}>
                    <NavLink to="/admin-list" className={({ isActive }) => (isActive ? "active" : "")}> Admin List</NavLink>
                    
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("User Create")}>
                    <NavLink to="/admin-create" className={({ isActive }) => (isActive ? "active" : "")}> Create Admin</NavLink>
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("User Edit")}>
                    <NavLink to="/admin-edit" className={({ isActive }) => (isActive ? "active" : "")}> Edit Admin</NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        <hr/>
          {/* Cars */}
          <Accordion.Item eventKey="11">
            <Accordion.Header>
            
              <CarFront size={18} className="me-2" /> <span>Cars</span>
              <ChevronDown className="accordion-arrow" size={16} />
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
               
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Cars List")}>
                    <List size={16} className="me-2" />
                    <NavLink to="/cars-list" className={({ isActive }) => (isActive ? "active" : "")}> Cars List</NavLink>
                  </button>
                </li>
                <li>
                
                  <button className="sidebar__link" onClick={() => handleNavigate("Add Cars")}>
                    <Pen size={16} className="me-2" />
                    <NavLink to="/add-cars" className={({ isActive }) => (isActive ? "active" : "")}>Add Cars</NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <hr/>
          {/* State */}
          <Accordion.Item eventKey="8">
            <Accordion.Header>
              <Landmark size={18} className="me-2" /> <span>State</span>
              <ChevronDown className="accordion-arrow" size={16} />
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link innerClrs" onClick={() => handleNavigate("States")}>
                   
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("States")}>
                    <Building2 size={16} className="me-2" />
                    <NavLink to="/states-list" className={({ isActive }) => (isActive ? "active" : "")}> States List</NavLink>
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("States")}>
                    <MapPin size={16} className="me-2" />
                    <NavLink to="/add-states" className={({ isActive }) => (isActive ? "active" : "")}>Add States</NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* Country */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <Globe size={18} className="me-2" /> <span>Country</span>
              <ChevronDown className="accordion-arrow" size={16} />
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Countries")}></button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Country")}>
                    <Building2 size={16} className="me-2" />
                    <NavLink to="/country-list" className={({ isActive }) => (isActive ? "active" : "")}>Country List</NavLink>
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Country")}>
                    <MapPin size={16} className="me-2" />
                    <NavLink to="/add-country" className={({ isActive }) => (isActive ? "active" : "")}>Add Country</NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* City */}
          <Accordion.Item eventKey="9">
            <Accordion.Header>
              <Castle size={18} className="me-2" /> <span>City</span>
              <ChevronDown className="accordion-arrow" size={16} />
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link innerClrs" onClick={() => handleNavigate("City")}>
                    <i>City</i>
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("City")}>
                    <Castle size={16} className="me-2" />
                   <NavLink to="/city-list" className={({ isActive }) => (isActive ? "active" : "")}>City List</NavLink>
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("City")}>
                    <MapPin size={16} className="me-2" />
                    <NavLink to="/add-city" className={({ isActive }) => (isActive ? "active" : "")}>Add City</NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <hr/>
          {/* Authentication */}
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <Fingerprint size={18} className="me-2" /> <span>Authentication</span>
              <ChevronDown className="accordion-arrow" size={16} />
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Sing Up")}>
                    <NavLink to="/sing-up" className={({ isActive }) => (isActive ? "active" : "")}>Sing Up</NavLink>
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Sing In")}>
                    <NavLink to="/sing-in" className={({ isActive }) => (isActive ? "active" : "")}>Sing In</NavLink>
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Password Reset")}>
                    <NavLink to="/password-reset" className={({ isActive }) => (isActive ? "active" : "")}>Password Reset</NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <hr/>
           {/* All Setting */}
           <Accordion.Item eventKey="12">
            <Accordion.Header>
              <Settings size={18} className="me-2" /> <span>All Settings</span>
              <ChevronDown className="accordion-arrow" size={16} />
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("carsettingsform")}>
                    <NavLink to="/carsettingsform" className={({ isActive }) => (isActive ? "active" : "")}>Car Settings</NavLink>
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("locations")}>
                    <NavLink to="/locations" className={({ isActive }) => (isActive ? "active" : "")}>Add Locations</NavLink>
                  </button>
                </li>

                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("locations")}>
                    <NavLink to="/email-template" className={({ isActive }) => (isActive ? "active" : "")}>Email Template</NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <hr/>
          {/* Orders */}
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <ShoppingCart size={18} className="me-2" /> <span>Orders</span>
              <ChevronDown className="accordion-arrow" size={16} />
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Order List")}>
                    <NavLink to="/order-list" className={({ isActive }) => (isActive ? "active" : "")}>Order List</NavLink>
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Order Create")}>
                    <NavLink to="/order-create" className={({ isActive }) => (isActive ? "active" : "")}>Add Order</NavLink>
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Order Edit")}>
                    <NavLink to="/order-edit" className={({ isActive }) => (isActive ? "active" : "")}>Edit Order</NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* Reviews */}
          <Accordion.Item eventKey="6">
            <Accordion.Header>
              <Star size={18} className="me-2" /> <span>Reviews</span>
              <ChevronDown className="accordion-arrow" size={16} />
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Reviews")}>
                    <NavLink to="/reviews" className={({ isActive }) => (isActive ? "active" : "")}>All Reviews</NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* Brands */}
          <Accordion.Item eventKey="7">
            <Accordion.Header>
              <Shield size={18} className="me-2" /> <span>Brands</span>
              <ChevronDown className="accordion-arrow" size={16} />
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Brands")}>
                    <NavLink to="/brands" className={({ isActive }) => (isActive ? "active" : "")}>Brand List</NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

       
      </div>
    </aside>
  );
};

export default Sidebar;
