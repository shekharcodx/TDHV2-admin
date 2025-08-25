// RecentOrders.jsx
import React from "react";
import "./RecentOrders.css";

const RecentOrders = () => {
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

  return (
    <div className="recent-orders-container">
      <div className="card">
        <div className="card-header bg-white">
          <h5 className="card-title mb-0">Recent Orders</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Product</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Email ID</th>
                  <th scope="col">Phone No.</th>
                  <th scope="col">Address</th>
                  <th scope="col">Payment Type</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, index) => (
                  <tr key={index}>
                    <td className="fw-semibold">{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.product}</td>
                    <td>{order.customerName}</td>
                    <td>
                      <a href={`mailto:${order.email}`} className="text-decoration-none">
                        {order.email}
                      </a>
                    </td>
                    <td>
                      <a href={`tel:${order.phone.replace(/[^+\d]/g, '')}`} className="text-decoration-none">
                        {order.phone}
                      </a>
                    </td>
                    <td>{order.address}</td>
                    <td>{order.paymentType}</td>
                    <td>
                      <span className={`badge ${order.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <span>Showing {orders.length} of 90,521 orders</span>
            <nav aria-label="Orders pagination">
              <ul className="pagination mb-0">
                <li className="page-item disabled">
                  <button className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                    Previous
                  </button>
                </li>
                <li className="page-item active" aria-current="page">
                  <button className="page-link" href="#">1</button>
                </li>
                <li className="page-item">
                  <button className="page-link" href="#">2</button>
                </li>
                <li className="page-item">
                  <button className="page-link" href="#">3</button>
                </li>
                <li className="page-item">
                  <button className="page-link" href="#">Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;