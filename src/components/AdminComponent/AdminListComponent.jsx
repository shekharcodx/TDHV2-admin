import React, { useState } from "react";
import styles from "./AdminListComponent.module.css";
import { Eye, Trash2 } from "lucide-react";

const AdminList = ({ admins }) => {
  // ✅ handle status change
  const handleStatusChange = (id, newStatus) => {
    setAdmins((prevAdmins) =>
      prevAdmins.map((admin) =>
        admin.id === id ? { ...admin, status: newStatus } : admin
      )
    );
  };

  // ✅ delete admin
  const handleDelete = (id) => {
    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
  };

  return (
    <div className={`container-fluid ${styles.adminListPage}`}>
      <h3 className={styles.subTitle}>Admin List</h3>

      <div className="table-responsive border rounded">
        <table className={`table ${styles.adminTable}`}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin.id}>
                <td>{index + 1}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>
                  <span
                    className={
                      admin.role === "Super Admin"
                        ? styles.superRole
                        : styles.moderatorRole
                    }
                  >
                    {admin.role}
                  </span>
                </td>
                {/* ✅ Status column updates automatically */}
                <td>
                  <select
                    value={admin.status}
                    onChange={(e) =>
                      handleStatusChange(admin.id, e.target.value)
                    }
                    className={styles.statusDropdown}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Hold">Hold</option>
                    <option value="Approve">Approve</option>
                    <option value="Rejection">Rejection</option>
                  </select>
                  <span className={styles.statusText}>{admin.status}</span>
                </td>
                <td className="text-center">
                  <button className={styles.viewBtn}>
                    <Eye size={18} />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(admin.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
