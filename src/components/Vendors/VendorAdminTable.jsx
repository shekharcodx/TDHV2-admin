import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './VendorAdminTable.module.css';
import { Eye } from 'lucide-react';

const VendorAdminTable = () => {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      vendorId: 'V001',
      name: 'Ali',
      email: 'ali@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Solutions',
      status: 'pending',
      joinDate: '2024-08-15',
      description:
        'Leading provider of enterprise software solutions with 10+ years experience in the industry.',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 2,
      vendorId: 'V002',
      name: 'Raza',
      email: 'raza@designstudio.com',
      phone: '+1 (555) 987-6543',
      company: 'Creative Design Studio',
      status: 'approved',
      joinDate: '2024-08-10',
      description:
        'Award-winning design agency specializing in branding and digital marketing solutions.',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 3,
      vendorId: 'V003',
      name: 'Hassan',
      email: 'hassan@logistics.com',
      phone: '+1 (555) 456-7890',
      company: 'Global Logistics Inc',
      status: 'hold',
      joinDate: '2024-08-12',
      description:
        'International shipping and logistics company serving clients across North America and Europe.',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 4,
      vendorId: 'V004',
      name: 'Hafiza',
      email: 'hafiza@consulting.com',
      phone: '+1 (555) 321-9876',
      company: 'Strategic Consulting Group',
      status: 'rejected',
      joinDate: '2024-08-08',
      description:
        'Business consulting firm helping startups and SMEs with strategic planning and growth initiatives.',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 5,
      vendorId: 'V005',
      name: 'Nazir',
      email: 'nazir@manufacturing.com',
      phone: '+1 (555) 654-3210',
      company: 'Wilson Manufacturing',
      status: 'approved',
      joinDate: '2024-08-05',
      description:
        'Industrial manufacturing company specializing in custom metal fabrication and assembly.',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 6,
      vendorId: 'V006',
      name: 'Alaina',
      email: 'alaina@foodservice.com',
      phone: '+1 (555) 789-0123',
      company: 'Gourmet Food Services',
      status: 'pending',
      joinDate: '2024-08-18',
      description:
        'Premium catering and food service provider for corporate events and hospitality industry.',
      avatar:
        'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
    },
  ]);

  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(vendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVendors = vendors.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    const badgeClass = `${styles.statusBadge} ${styles[status]}`;
    return <span className={badgeClass}>{status}</span>;
  };

  const handleStatusChange = (vendorId, newStatus) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, status: newStatus } : v))
    );
    if (selectedVendor && selectedVendor.id === vendorId) {
      setSelectedVendor((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleSelectVendor = (vendorId) => {
    setSelectedVendors((prev) =>
      prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedVendors([]);
    } else {
      setSelectedVendors(currentVendors.map((v) => v.id));
    }
    setSelectAll((s) => !s);
  };

  const handleRowClick = (vendor, e) => {
    if (
      e.target.type === 'checkbox' ||
      e.target.closest('.dropdown') ||
      e.target.closest('button')
    ) {
      return;
    }
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVendor(null);
  };

  const handleModalStatusChange = (newStatus) => {
    if (selectedVendor) {
      handleStatusChange(selectedVendor.id, newStatus);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          {/* Header */}
          <div className={`${styles.headerBar} d-flex justify-content-between align-items-center mb-4`}>
            <div>
              <h2 className={styles.title}>All Vendor List</h2>
              <p className={styles.subtitle}>Manage all vendor accounts and their status</p>
            </div>
            <div className={styles.kpis}>
              <div className={styles.kpiRow}>
                <span className={styles.kpiLabel}>Total Vendors:</span>
                <span className={styles.kpiValue}>{vendors.length}</span>
              </div>
              <div className={`${styles.badgeRow} d-flex gap-2 flex-wrap justify-content-end`}>
                <span className={`${styles.chip} ${styles.chipPending}`}>
                  Pending: {vendors.filter((v) => v.status === 'pending').length}
                </span>
                <span className={`${styles.chip} ${styles.chipApproved}`}>
                  Approved: {vendors.filter((v) => v.status === 'approved').length}
                </span>
                <span className={`${styles.chip} ${styles.chipHold}`}>
                  Hold: {vendors.filter((v) => v.status === 'hold').length}
                </span>
                <span className={`${styles.chip} ${styles.chipRejected}`}>
                  Rejected: {vendors.filter((v) => v.status === 'rejected').length}
                </span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className={styles.vendorTable}>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className={styles.tableHead}>
                  <tr>
                    <th scope="col" style={{ width: '50px' }}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col" className="d-none d-lg-table-cell">
                      Email
                    </th>
                    <th scope="col" className="d-none d-md-table-cell">
                      Phone
                    </th>
                    <th scope="col" className="d-none d-lg-table-cell">
                      Company
                    </th>
                    <th scope="col">Account Status</th>
                    <th scope="col" className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={styles.tableBodySetting}>
                  {currentVendors.map((vendor) => (
                    <tr
                      key={vendor.id}
                      className={styles.tableRow}
                      onClick={(e) => handleRowClick(vendor, e)}
                    >
                      <td className="align-middle">
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={selectedVendors.includes(vendor.id)}
                          onChange={() => handleSelectVendor(vendor.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="align-middle">
                        <span className={styles.mutedMono}>{vendor.vendorId}</span>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <img
                            src={vendor.avatar}
                            alt={vendor.name}
                            className={styles.avatar}
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${vendor.name}&background=007bff&color=fff&size=40`;
                            }}
                          />
                          <div>
                            <div className={styles.personName}>{vendor.name}</div>
                            <div className={`${styles.muted} d-lg-none`}>{vendor.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle d-none d-lg-table-cell">
                        <div className={styles.muted}>{vendor.email}</div>
                      </td>
                      <td className="align-middle d-none d-md-table-cell">
                        <div className={`${styles.muted} ${styles.small}`}>{vendor.phone}</div>
                      </td>
                      <td className="align-middle d-none d-lg-table-cell">
                        <div className={`${styles.truncate} ${styles.company}`}>{vendor.company}</div>
                      </td>
                      <td className="align-middle">{getStatusBadge(vendor.status)}</td>
                      <td className="align-middle">
                        <div
                          className="d-flex gap-2 justify-content-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Dropdown (Bootstrap structure; custom styles) */}
                          <div className="dropdown">
                            <button
                              className={`${styles.btn} ${styles.btnStatus} dropdown-toggle`}
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Status
                            </button>
                            <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
                              <li>
                                <button
                                  className={`${styles.dropdownItem} ${
                                    vendor.status === 'pending' ? styles.dropdownActive : ''
                                  }`}
                                  onClick={() => handleStatusChange(vendor.id, 'pending')}
                                >
                                  <span className={`${styles.dot} ${styles.dotPending}`} />
                                  Pending
                                </button>
                              </li>
                              <li>
                                <button
                                  className={`${styles.dropdownItem} ${
                                    vendor.status === 'approved' ? styles.dropdownActive : ''
                                  }`}
                                  onClick={() => handleStatusChange(vendor.id, 'approved')}
                                >
                                  <span className={`${styles.dot} ${styles.dotApproved}`} />
                                  Approved
                                </button>
                              </li>
                              <li>
                                <button
                                  className={`${styles.dropdownItem} ${
                                    vendor.status === 'hold' ? styles.dropdownActive : ''
                                  }`}
                                  onClick={() => handleStatusChange(vendor.id, 'hold')}
                                >
                                  <span className={`${styles.dot} ${styles.dotHold}`} />
                                  Hold
                                </button>
                              </li>
                              <li>
                                <button
                                  className={`${styles.dropdownItem} ${
                                    vendor.status === 'rejected' ? styles.dropdownActive : ''
                                  }`}
                                  onClick={() => handleStatusChange(vendor.id, 'rejected')}
                                >
                                  <span className={`${styles.dot} ${styles.dotRejected}`} />
                                  Rejected
                                </button>
                              </li>
                            </ul>
                          </div>

                          {/* View Button */}
                          <button
                            className={`${styles.btn} ${styles.btnView}`}
                            onClick={() => handleRowClick(vendor, { target: {} })}
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {currentVendors.length === 0 && (
                    <tr>
                      <td colSpan="8" className={styles.emptyCell}>
                        No vendors to display.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination (custom styled) */}
          <nav className="mt-4">
            <ul className={`${styles.pagination} d-flex justify-content-end`}>
              <li>
                <button
                  className={`${styles.pageBtn} ${currentPage === 1 ? styles.pageDisabled : ''}`}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isActive = currentPage === page;
                return (
                  <li key={page}>
                    <button
                      className={`${styles.pageBtn} ${isActive ? styles.pageActive : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  className={`${styles.pageBtn} ${currentPage === totalPages ? styles.pageDisabled : ''}`}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Modal (Bootstrap structure; custom styles) */}
      {showModal && selectedVendor && (
        <div
          className={`${styles.backdrop} modal fade show d-block`}
          tabIndex="-1"
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`modal-content ${styles.modalContent}`}>
              <div className={`modal-header ${styles.modalHeader}`}>
                <div className="d-flex align-items-center">
                  <img
                    src={selectedVendor.avatar}
                    alt={selectedVendor.name}
                    className={styles.modalAvatar}
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${selectedVendor.name}&background=007bff&color=fff&size=50`;
                    }}
                  />
                  <div>
                    <h5 className={`${styles.modalTitle} mb-0`}>Vendor Account Details</h5>
                    <small className={styles.muted}>ID: {selectedVendor.vendorId}</small>
                  </div>
                </div>
                <button type="button" className={styles.iconClose} onClick={closeModal} aria-label="Close">
                  ✕
                </button>
              </div>

              <div className="modal-body p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className={styles.card}>
                      <div className={styles.cardHeader}>Personal Information</div>
                      <div className={styles.cardBody}>
                        <div className={styles.infoItem}>
                          <label className={styles.infoLabel}>Full Name</label>
                          <div className={styles.infoValue}>{selectedVendor.name}</div>
                        </div>
                        <div className={styles.infoItem}>
                          <label className={styles.infoLabel}>Email Address</label>
                          <div className={styles.infoValue}>{selectedVendor.email}</div>
                        </div>
                        <div className={styles.infoItem}>
                          <label className={styles.infoLabel}>Phone Number</label>
                          <div className={styles.infoValue}>{selectedVendor.phone}</div>
                        </div>
                        <div className={styles.infoItem}>
                          <label className={styles.infoLabel}>Join Date</label>
                          <div className={styles.infoValue}>{selectedVendor.joinDate}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className={styles.card}>
                      <div className={styles.cardHeader}>Business Information</div>
                      <div className={styles.cardBody}>
                        <div className={styles.infoItem}>
                          <label className={styles.infoLabel}>Company Name</label>
                          <div className={styles.infoValue}>{selectedVendor.company}</div>
                        </div>
                        <div className={styles.infoItem}>
                          <label className={styles.infoLabel}>Current Status</label>
                          <div className={styles.infoValue}>{getStatusBadge(selectedVendor.status)}</div>
                        </div>
                        <div className={styles.infoItem}>
                          <label className={styles.infoLabel}>Vendor ID</label>
                          <div className={`${styles.infoValue} ${styles.mono}`}>{selectedVendor.vendorId}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className={styles.card}>
                      <div className={styles.cardHeader}>Company Description</div>
                      <div className={styles.cardBody}>
                        <p className={styles.description}>{selectedVendor.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className={styles.card}>
                      <div className={styles.cardHeader}>Status Management</div>
                      <div className={styles.cardBody}>
                        <label className={styles.infoLabel}>Change Account Status</label>
                        <select
                          className={styles.select}
                          value={selectedVendor.status}
                          onChange={(e) => handleModalStatusChange(e.target.value)}
                        >
                          <option value="pending">Pending Review</option>
                          <option value="approved">Approved</option>
                          <option value="hold">On Hold</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`modal-footer ${styles.modalFooter}`}>
                <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={closeModal}>
                  Close
                </button>
                <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={closeModal}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorAdminTable;
