import React, { useState, useRef, useEffect } from "react";
import { clearToken, clearRole } from "../../utils/localStorage"; // add clear helpers
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import {
  Bell,
  Search,
  UserRound,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import UAEImg from "../../assets/uae-flag.png";

const Header = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate(); // ✅ added navigate hook

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    clearToken();
    clearRole();
    navigate("/sign-in"); // ✅ redirect to sign-in
  };

  return (
    <nav
      className={`${styles.HeaderWrapper} ${styles.topnav} navbar navbar-expand px-3 px-sm-4`}
    >
      {/* Brand / left side */}
      <div className={styles.brandWrapper}>
        <h2 className={styles.brandLogo}>Dashboard</h2>
      </div>

      {/* Search */}
      <form
        className={`${styles.searchWrapper} ms-md-3 me-auto d-none d-md-flex`}
      >
        <div className={`${styles.searchInputGroup} input-group`}>
          <span className={`${styles.searchIcon} input-group-text`}>
            <Search size={18} />
          </span>
          <input
            type="search"
            className={`${styles.searchInput} form-control`}
            placeholder="Search..."
            aria-label="Search"
          />
        </div>
      </form>

      {/* Right Actions */}
      <ul
        className={`${styles.actionsWrapper} navbar-nav ms-auto align-items-center gap-2 gap-sm-3`}
      >
        {/* 🔔 Notifications */}
        <li className={`${styles.notificationWrapper} nav-item dropdown`}>
          <button
            className={`${styles.notificationButton} btn nav-link`}
            data-bs-toggle="dropdown"
            aria-expanded="false"
            title="Notifications"
          >
            <Bell size={20} />
            <span className={styles.notificationBadge}>5</span>
          </button>

          <div
            className={`${styles.dropdownMenu} dropdown-menu dropdown-menu-end shadow`}
          >
            <div className={styles.dropdownHeader}>Notifications</div>

            {/* Tabs */}
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${
                  activeTab === "all" ? styles.active : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab("all");
                }}
              >
                All (20)
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === "msgs" ? styles.active : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab("msgs");
                }}
              >
                Msgs (5)
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === "others" ? styles.active : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab("others");
                }}
              >
                Others (5)
              </button>
            </div>

            {/* Content */}
            <div className={styles.tabContent}>
              {activeTab === "all" && (
                <>
                  <div className={styles.item}>
                    <img src={UAEImg} alt="" />
                    <div>
                      <strong>Ali</strong>
                      <p>Lorem ipsum dolor sit amet...</p>
                      <span>30 min ago</span>
                    </div>
                  </div>
                  <div className={`${styles.item} ${styles.activeItem}`}>
                    <img src={UAEImg} alt="" />
                    <div>
                      <strong>Raza</strong>
                      <p>Donec mattis augue a nisl...</p>
                      <span>Just now</span>
                    </div>
                  </div>
                  <div className={styles.item}>
                    <img src={UAEImg} alt="" />
                    <div>
                      <strong>Waseem</strong>
                      <p>Lorem ipsum dolor sit amet...</p>
                      <span>1 hr ago</span>
                    </div>
                  </div>
                  <div className={`${styles.item} ${styles.event}`}>
                    <div className={styles.eventIcon}>📅</div>
                    <div>
                      <strong>Upcoming event added</strong>
                      <p>03/Jan/2020 (1pm - 2pm)</p>
                      <span>10 min ago</span>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "msgs" && (
                <p className={styles.empty}>No new messages</p>
              )}

              {activeTab === "others" && (
                <p className={styles.empty}>No other notifications</p>
              )}
            </div>

            <div className={styles.dropdownFooter}>
              <button className={styles.viewAllButton}>
                View All Notifications
              </button>
            </div>
          </div>
        </li>

        {/* 👤 Profile */}
        <li className={`${styles.profileWrapper} nav-item`} ref={profileRef}>
          <button
            className={`${styles.profileButton} btn nav-link d-flex align-items-center gap-2`}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            title="Admin"
          >
            <div className={styles.avatar}>
              <UserRound size={16} />
            </div>
            <span className="d-none d-sm-inline">Admin</span>
            <ChevronDown
              size={16}
              className={`${styles.chevron} ${
                isProfileOpen ? styles.rotated : ""
              }`}
            />
          </button>

          <div
            className={`${styles.profileDropdown} ${
              isProfileOpen ? styles.show : ""
            } shadow`}
          >
            <div className={styles.profileDropdownHeader}>
              <div className={styles.profileInfo}>
                <div className={styles.profileAvatar}>
                  <UserRound size={24} />
                </div>
                <div>
                  <div className={styles.profileName}>Admin User</div>
                  <div className={styles.profileEmail}>
                    driveHub@driveHub.com
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.profileDropdownMenu}>
              <button className={styles.dropdownItem}>
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <button
                className={`${styles.dropdownItem} ${styles.logoutItem}`}
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
