// components/Header.jsx
import React from "react";
import styles from "./Header.module.css";

import { Bell, Search, UserRound, Settings, LogOut } from "lucide-react";


const Header = () => {
  return (
    <nav className="topnav navbar navbar-expand bg-white shadow-sm px-2 px-sm-3">
      {/* Brand / small spacer for alignment on mobile */}
      <div className="d-flex align-items-center">
        <span className="navbar-brand mb-0 h1 d-none d-md-inline">Drive Hub</span>
      </div>

      {/* Search (center on md+) */}
      <form className="topnav__search ms-md-3 me-auto d-none d-md-flex">
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0">
            <Search size={18} />
          </span>
          <input
            type="search"
            className="form-control border-start-0"
            placeholder="Search..."
            aria-label="Search"
          />
        </div>
      </form>

      {/* Right actions */}
      <ul className="navbar-nav ms-auto align-items-center gap-1 gap-sm-2">
        {/* Notification dropdown */}
        <li className="nav-item dropdown">
          <button
            className="btn btn-icon nav-link dropdown-toggle p-2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            title="Notifications"
          >
            <Bell size={20} />
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow-sm">
            <li className="dropdown-header">Notifications</li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">All</a></li>
            <li><a className="dropdown-item" href="#">Messages</a></li>
            <li><a className="dropdown-item" href="#">Others</a></li>
          </ul>
        </li>

        {/* Admin/Profile dropdown */}
        <li className="nav-item dropdown">
          <button
            className="btn nav-link dropdown-toggle d-flex align-items-center gap-2 p-2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            title="Admin"
          >
            <UserRound size={20} />
            <span className="d-none d-sm-inline">Admin</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow-sm">
            <li className="px-3 py-2 small text-muted">Logged in as <strong>Admin</strong></li>
            <li><a className="dropdown-item d-flex align-items-center gap-2" href="#"><Settings size={16}/> Settings</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item d-flex align-items-center gap-2 text-danger" href="#"><LogOut size={16}/> Logout</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
