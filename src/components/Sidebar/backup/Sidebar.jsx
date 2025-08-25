// components/Sidebar.jsx
import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import {
  Menu,
  Home,
  Users,
  ShoppingCart,
  Building2,
  Globe,
  MapPin,
  Star,
  Shield,
  LayoutGrid,
  BadgeCheck,
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
        <span className="sidebar__logo text-truncate d-none d-md-inline">Drive Hub</span>
        <button
          className="btn btn-sm btn-outline-light d-inline-flex align-items-center gap-1"
          onClick={() => setCollapsed((v) => !v)}
          aria-label="Toggle sidebar"
        >
          <Menu size={16} />
        </button>
      </div>

      {/* Accordion Menu */}
      <div className="sidebar__scroll">
        <Accordion defaultActiveKey={["0"]} alwaysOpen flush className="sidebar-accordion">
          {/* Dashboard */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Home size={18} className="me-2" /> <span>Dashboard</span>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Dashboard")}>
                    Overview
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* Vendors */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <Users size={18} className="me-2" /> <span>Vendors</span>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Vendor Grid")}>
                    Vendor Grid
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Vendor List")}>
                    Vendor List
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Vendors Profile")}>
                    Vendors Profile
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* Users */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <BadgeCheck size={18} className="me-2" /> <span>Users</span>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("User List")}>
                    User List
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("User Create")}>
                    Create User
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("User Edit")}>
                    Edit User
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* Country */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <Globe size={18} className="me-2" /> <span>Country</span>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Countries")}>
                    Countries
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("States")}>
                    <Building2 size={16} className="me-2" />
                    States
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Cities")}>
                    <MapPin size={16} className="me-2" />
                    Cities
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* Products */}
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <LayoutGrid size={18} className="me-2" /> <span>Products</span>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Product List")}>
                    Product List
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Product Create")}>
                    Create Product
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Product Edit")}>
                    Edit Product
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* Orders */}
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <ShoppingCart size={18} className="me-2" /> <span>Orders</span>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Order List")}>
                    Order List
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Order Create")}>
                    Create Order
                  </button>
                </li>
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Order Edit")}>
                    Edit Order
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* Reviews */}
          <Accordion.Item eventKey="6">
            <Accordion.Header>
              <Star size={18} className="me-2" /> <span>Reviews</span>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Reviews")}>
                    All Reviews
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* Brands */}
          <Accordion.Item eventKey="7">
            <Accordion.Header>
              <Shield size={18} className="me-2" /> <span>Brands</span>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="list-unstyled mb-0">
                <li>
                  <button className="sidebar__link" onClick={() => handleNavigate("Brands")}>
                    Brand List
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
