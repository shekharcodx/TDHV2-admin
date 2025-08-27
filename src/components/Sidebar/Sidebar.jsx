import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile and auto-collapse
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleNavigate = (page) => {
    if (typeof onNavigate === "function") onNavigate(page);
  };

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={`sidebar d-flex flex-column ${
        collapsed ? "is-collapsed" : ""
      }`}
    >
      {/* Header + Toggle */}
      <div className="sidebar__header d-flex align-items-center justify-content-between px-3">
        <span
          className={`sidebar__logo text-truncate ${
            collapsed ? "d-none" : "d-none d-md-inline"
          }`}
        >
          <Link to="/dashboard">
            <img src={LogoNav} alt="Logo" />
          </Link>
        </span>
        <button
          className="btn ToogleBtn btn-sm btn-outline-light d-inline-flex align-items-center gap-1"
          onClick={toggleSidebar}
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
              <div className="accordion-header-content">
                <LayoutDashboard size={18} className="accordion-icon" />
                <span className={`accordion-text ${collapsed ? "d-none" : ""}`}>
                  Dashboard
                </span>
                <ChevronDown
                  className={`accordion-arrow ${collapsed ? "d-none" : ""}`}
                  size={16}
                />
              </div>
            </Accordion.Header>
            <Accordion.Body className={collapsed ? "d-none" : ""}>
              <ul className="list-unstyled mb-0">
                <li>
                  <button
                    className="sidebar__link"
                    onClick={() => handleNavigate("Dashboard")}
                  >
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Overview
                    </NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {!collapsed && <hr />}

          {/* Vendors */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="accordion-header-content">
                <Users size={18} className="accordion-icon" />
                <span className={`accordion-text ${collapsed ? "d-none" : ""}`}>
                  Vendors
                </span>
                <ChevronDown
                  className={`accordion-arrow ${collapsed ? "d-none" : ""}`}
                  size={16}
                />
              </div>
            </Accordion.Header>
            <Accordion.Body className={collapsed ? "d-none" : ""}>
              <ul className="list-unstyled mb-0">
                <li>
                  <button
                    className="sidebar__link"
                    onClick={() => handleNavigate("Vendor List")}
                  >
                    <NavLink
                      to="/vendors-list"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Vendor List
                    </NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {/* Admin */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div className="accordion-header-content">
                <UserPlus size={18} className="accordion-icon" />
                <span className={`accordion-text ${collapsed ? "d-none" : ""}`}>
                  Admin
                </span>
                <ChevronDown
                  className={`accordion-arrow ${collapsed ? "d-none" : ""}`}
                  size={16}
                />
              </div>
            </Accordion.Header>
            <Accordion.Body className={collapsed ? "d-none" : ""}>
              <ul className="list-unstyled mb-0">
                <li>
                  <button
                    className="sidebar__link"
                    onClick={() => handleNavigate("User List")}
                  >
                    <NavLink
                      to="/admin-list"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Admin List
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button
                    className="sidebar__link"
                    onClick={() => handleNavigate("User Create")}
                  >
                    <NavLink
                      to="/admin-create"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Create Admin
                    </NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {!collapsed && <hr />}

          {/* Cars */}
          <Accordion.Item eventKey="11">
            <Accordion.Header>
              <div className="accordion-header-content">
                <CarFront size={18} className="accordion-icon" />
                <span className={`accordion-text ${collapsed ? "d-none" : ""}`}>
                  Cars
                </span>
                <ChevronDown
                  className={`accordion-arrow ${collapsed ? "d-none" : ""}`}
                  size={16}
                />
              </div>
            </Accordion.Header>
            <Accordion.Body className={collapsed ? "d-none" : ""}>
              <ul className="list-unstyled mb-0">
                <li>
                  <button
                    className="sidebar__link"
                    onClick={() => handleNavigate("Cars List")}
                  >
                    <List size={16} className="me-2" />
                    <NavLink
                      to="/cars-list"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Cars List
                    </NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {!collapsed && <hr />}

          {/* Authentication */}
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <div className="accordion-header-content">
                <Fingerprint size={18} className="accordion-icon" />
                <span className={`accordion-text ${collapsed ? "d-none" : ""}`}>
                  Authentication
                </span>
                <ChevronDown
                  className={`accordion-arrow ${collapsed ? "d-none" : ""}`}
                  size={16}
                />
              </div>
            </Accordion.Header>
            <Accordion.Body className={collapsed ? "d-none" : ""}>
              <ul className="list-unstyled mb-0">
                <li>
                  <button
                    className="sidebar__link"
                    onClick={() => handleNavigate("Sing Up")}
                  >
                    <NavLink
                      to="/sing-up"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Sign Up
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button
                    className="sidebar__link"
                    onClick={() => handleNavigate("Sing In")}
                  >
                    <NavLink
                      to="/sign-in"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Sign In
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button
                    className="sidebar__link"
                    onClick={() => handleNavigate("Password Reset")}
                  >
                    <NavLink
                      to="/password-reset"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Password Reset
                    </NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {!collapsed && <hr />}

          {/* All Settings */}
          <Accordion.Item eventKey="12">
            <Accordion.Header>
              <div className="accordion-header-content">
                <Settings size={18} className="accordion-icon" />
                <span className={`accordion-text ${collapsed ? "d-none" : ""}`}>
                  All Settings
                </span>
                <ChevronDown
                  className={`accordion-arrow ${collapsed ? "d-none" : ""}`}
                  size={16}
                />
              </div>
            </Accordion.Header>
            <Accordion.Body className={collapsed ? "d-none" : ""}>
              <ul className="list-unstyled mb-0">
                <li>
                  <button
                    className="sidebar__link"
                    onClick={() => handleNavigate("carsettingsform")}
                  >
                    <NavLink
                      to="/carsettingsform"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Car Settings
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button
                    className="sidebar__link"
                    onClick={() => handleNavigate("locations")}
                  >
                    <NavLink
                      to="/locations"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Add Locations
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button
                    className="sidebar__link"
                    onClick={() => handleNavigate("locations")}
                  >
                    <NavLink
                      to="/email-template"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Email Template
                    </NavLink>
                  </button>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          {!collapsed && <hr />}
        </Accordion>
      </div>
    </aside>
  );
};

export default Sidebar;
