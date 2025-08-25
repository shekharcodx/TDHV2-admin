import React, { useState } from "react";
import AdminListComponent from "../../components/AdminComponent/AdminListComponent";
const admins = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Moderator", status: "Active" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Super Admin", status: "Inactive" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Moderator", status: "Active" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Super Admin", status: "Active" },
];
const AdminList = () => {
  return (
    <div>

       
      <AdminListComponent admins={admins} onDelete={() => {}} />
    </div>
  );
};
export default AdminList;