import React, { useState } from "react";
import styles from "./AdminListComponent.module.css";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useProfileActiveStatusMutation } from "../../Services/adminsApi";

const AdminList = ({ admins }) => {
  // Local state for displaying admins
  const [adminList, setAdminList] = useState(admins);

  // Hook from RTK Query for updating active status
  const [profileActiveStatus] = useProfileActiveStatusMutation();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Derived values for pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = adminList.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(adminList.length / recordsPerPage);

  /**
   * Toggle admin status (Active <-> Deactivated)
   * Uses optimistic UI update and Promise approach (then/catch)
   */
  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = !currentStatus;

    // Optimistic UI update
    setAdminList((prevAdmins) =>
      prevAdmins.map((admin) =>
        admin._id === id ? { ...admin, isActive: newStatus } : admin
      )
    );

    console.log("Id is ", id);

    // API call with Promises
    profileActiveStatus({ id, isActive: newStatus })
      .unwrap()
      .then((response) => {
        console.log("✅ Status update successful:", response);
      })
      .catch((error) => {
        console.error("❌ Status update failed:", error);

        // Rollback UI on error
        setAdminList((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin._id === id ? { ...admin, isActive: currentStatus } : admin
          )
        );

        // Handle expired/unauthorized session
        if (error?.status === 401 || error?.status === 403) {
          alert(
            "Your session has expired or you do not have permission. Please log in again."
          );
          // Optional: redirect to login page
          // navigate("/login");
        } else {
          alert(
            error?.data?.message || "Failed to update status. Please try again."
          );
        }
      });
  };

  /**
   * Generate page numbers dynamically with ellipsis
   */
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pageNumbers.push(i);
      pageNumbers.push("...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, "...");
      for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1, "...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++)
        pageNumbers.push(i);
      pageNumbers.push("...", totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className={`container-fluid ${styles.adminListPage}`}>
      {/* Header with Create button */}
      <div className="d-flex justify-content-between mb-3">
        <h3 className={styles.subTitle}>Admin List</h3>
        <Button className={styles.CreateAdminBtn}>
          <Link to="/admin-create">Create Admin</Link>
        </Button>
      </div>

      {/* Table for Admins */}
      <div className="table-responsive border rounded">
        <table className={`table ${styles.adminTable}`}>
          <thead>
            <tr className={styles.AdminListTableHeadersC + " table-secondary"}>
              <th>#-No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords?.map((admin, index) => (
              <tr key={admin._id}>
                <td>{indexOfFirstRecord + index + 1}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>

                {/* Status pill */}
                <td>
                  {admin.isActive ? (
                    <span className={`${styles.pill} ${styles.active}`}>
                      Active
                    </span>
                  ) : (
                    <span className={`${styles.pill} ${styles.disabled}`}>
                      Deactivated
                    </span>
                  )}
                </td>

                {/* Action buttons */}
                <td className="text-center">
                  {admin.isActive ? (
                    <button
                      className={`${styles.actionBtn} ${styles.deactivate}`}
                      onClick={() =>
                        handleToggleStatus(admin._id, admin.isActive)
                      }
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className={`${styles.actionBtn} ${styles.activate}`}
                      onClick={() =>
                        handleToggleStatus(admin._id, admin.isActive)
                      }
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-end align-items-center mt-4">
        <div className={styles.paginationContainer}>
          <div className={styles.paginationInfo}>
            Showing {indexOfFirstRecord + 1} to{" "}
            {Math.min(indexOfLastRecord, adminList.length)} of{" "}
            {adminList.length} entries
          </div>

          <div className={styles.paginationControls}>
            {/* Previous Button */}
            <button
              className={`${styles.paginationBtn} ${styles.prevNextBtn} ${
                currentPage === 1 ? styles.disabled : ""
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
              Previous
            </button>

            {/* Page Numbers */}
            <div className={styles.pageNumbers}>
              {getPageNumbers().map((pageNum, index) => (
                <React.Fragment key={index}>
                  {pageNum === "..." ? (
                    <span className={styles.ellipsis}>...</span>
                  ) : (
                    <button
                      className={`${styles.paginationBtn} ${styles.pageBtn} ${
                        currentPage === pageNum ? styles.active : ""
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Next Button */}
            <button
              className={`${styles.paginationBtn} ${styles.prevNextBtn} ${
                currentPage === totalPages ? styles.disabled : ""
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminList;
