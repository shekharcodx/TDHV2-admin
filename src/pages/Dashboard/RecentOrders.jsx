import React, { useState } from "react";
import styles from "./RecentOrders.module.css";
import { Eye, Search, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const RecentOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    {
      id: "#RB5625",
      date: "29 April 2024",
      product: "Ama M. Hines",
      customerName: "Ama M. Hines",
      email: "ama.hines@mail.com",
      phone: "(+1)-555-1564-261",
      address: "Burr Ridge/Illinois",
      paymentType: "Credit Card",
      status: "Completed"
    },
    {
      id: "#RB9652",
      date: "25 April 2024",
      product: "Judith H. Fritsche",
      customerName: "Judith H. Fritsche",
      email: "judith.fritsche.com",
      phone: "(+57)-305-5579-759",
      address: "SULLIVAN/Kentucky",
      paymentType: "Credit Card",
      status: "Completed"
    },
    {
      id: "#RB5984",
      date: "25 April 2024",
      product: "Peter T. Smith",
      customerName: "Peter T. Smith",
      email: "peter.smith@mail.com",
      phone: "(+33)-655-5187-93",
      address: "Yreba/Calformia",
      paymentType: "Pay Pal",
      status: "Completed"
    },
    {
      id: "#RB3625",
      date: "21 April 2024",
      product: "Emmanuel J. Delcid",
      customerName: "Emmanuel J. Delcid",
      email: "emmanuel.delcid@mail.com",
      phone: "(+30)-693-5553-637",
      address: "Atlanta/Georgia",
      paymentType: "Pay Pal",
      status: "Processing"
    },
    {
      id: "#RB8652",
      date: "18 April 2024",
      product: "William J. Cook",
      customerName: "William J. Cook",
      email: "william.cook@mail.com",
      phone: "(+91)-855-5446-150",
      address: "Rosenberg/Texas",
      paymentType: "Credit Card",
      status: "Processing"
    }
  ];

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    Object.values(order).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.RecentTableWrapper}>
      <div className={styles.card}>
        {/* Card Header */}
        <div className={styles.cardHeader}>
          <h5 className={styles.cardTitle}>Recent Orders</h5>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.itemsPerPageDropdown}>
              <select 
                value={itemsPerPage} 
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className={styles.itemsSelect}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
              <ChevronDown size={16} className={styles.dropdownIcon} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Date</th>
                <th scope="col">Product</th>
                <th scope="col">Customer</th>
                <th scope="col">Contact</th>
                <th scope="col">Payment</th>
                <th scope="col">Status</th>
                {/* <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {paginatedOrders.map((order, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.orderId}>{order.id}</td>
                  <td className={styles.orderDate}>{order.date}</td>
                  <td className={styles.product}>{order.product}</td>
                  <td className={styles.customer}>
                    <div className={styles.customerInfo}>
                      <div className={styles.customerName}>{order.customerName}</div>
                      <div className={styles.customerAddress}>{order.address}</div>
                    </div>
                  </td>
                  <td className={styles.contact}>
                    <div className={styles.contactInfo}>
                      <a href={`mailto:${order.email}`} className={styles.contactEmail}>
                        {order.email}
                      </a>
                      <a href={`tel:${order.phone.replace(/[^+\d]/g, '')}`} className={styles.contactPhone}>
                        {order.phone}
                      </a>
                    </div>
                  </td>
                  <td className={styles.payment}>
                    <span className={`${styles.paymentBadge} ${order.paymentType === 'Credit Card' ? styles.creditCard : styles.paypal}`}>
                      {order.paymentType}
                    </span>
                  </td>
                  <td className={styles.status}>
                    <span className={`${styles.statusBadge} ${order.status === 'Completed' ? styles.completed : styles.processing}`}>
                      {order.status}
                    </span>
                  </td>
                  {/* <td className={styles.actions}>
                    <button className={styles.actionBtn}>
                      <Eye size={16} />
                    </button>
                    <button className={styles.actionBtn}>
                      <MoreHorizontal size={16} />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card Footer */}
        <div className={styles.cardFooter}>
          <div className={styles.footerInfo}>
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
          </div>
          <div className={styles.pagination}>
            <button 
              className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            
            <button 
              className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;