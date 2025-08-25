
import React from "react";
import Dashboardstyles from './Dashboard.module.css';
import RecentOrders from "./RecentOrders";

const orders = [
    {
      id: 24541,
      product: "Coach Swagger",
      units: "1 Unit",
      date: "Oct 20, 2018",
      cost: "$230",
      status: "COMPLETED",
    },
    {
      id: 24541,
      product: "Toddler Shoes, Gucci Watch",
      units: "2 Units",
      date: "Nov 15, 2018",
      cost: "$550",
      status: "DELAYED",
    },
    {
      id: 24541,
      product: "Hat Black Suits",
      units: "1 Unit",
      date: "Nov 18, 2018",
      cost: "$325",
      status: "ON HOLD",
    },
    {
      id: 24541,
      product: "Backpack Gents, Swimming Cap Slin",
      units: "5 Units",
      date: "Dec 13, 2018",
      cost: "$200",
      status: "COMPLETED",
    },
    {
      id: 24541,
      product: "Speed 500 Ignite",
      units: "1 Unit",
      date: "Dec 23, 2018",
      cost: "$150",
      status: "CANCELLED",
    },
  ];

const Dashboard = () => {
  const statsData = [
    {
      id: 1,
      // title: 'Daily Signups',
      title: 'charcoal-blue-grey',
      value: '#27343A',
      icon: 'bi-person-plus-fill',
      iconBg: 'charcoal-blue-grey-bg-one'
    },
    {
      id: 2,
      // title: 'Daily Visitors',
      title: 'slate-gray-secondary',
      value: '#5B787C',
      icon: 'bi-people-fill',
      iconBg: 'slate-gray-secondary-bg-two'
    },
    {
      id: 3,
      // title: 'Daily Order',
      title: 'misty-teal',
      value: '#89B4BC',
      icon: 'bi-box-seam-fill',
      iconBg: 'misty-teal-bg-three'
    },
    {
      id: 4,
      // title: 'Daily Revenue',
      title: 'light-gray',
      value: '#CECCCD',
      icon: 'bi-currency-dollar',
      iconBg: 'light-gray-bg-four'
    }
    ,
    {
      id: 5,
      // title: 'Daily Revenue',
      title: 'neutral',
      value: '#EFEEEA',
      icon: 'bi-currency-dollar',
      iconBg: 'light-gray-bg-four'
    },
    {
      id: 6,
      // title: 'Daily Revenue',
      title: ' Analytics, Blog, Email Templates,',
      value: ' Place Holder',
    },
    {
      id: 7,
      // title: 'Daily Revenue',
      title: 'Total Users',
      value: '50',
    },
    {
      id: 8,
      // title: 'Daily Revenue',
      title: 'Totalh Approved Users',
      value: '20',
    },
    {
      id: 9,
      // title: 'Daily Revenue',
      title: 'Total Pending Users',
      value: '2',
    },
    {
      id: 10,
      title: 'Total inActive User',
      value: '2',
    }
    ,
    {
      id: 11,
      title: 'Total Cars',
      value: '2',
    },
    {
      id: 12,
      title: 'Total Approved Cars',
      value: '150',
    },
    {
      id: 13,
      title: 'Total Disabled Cars',
      value: '2',
    },
    {
      id: 14,
      title: 'Total Booking',
      value: '2',
    },
    {
      id: 15,
      title: 'Total Pending Bookings',
      value: '2',
    }

  ];

  return (
    <>
    <div className="container-fluid">
      <div className="row g-3">
        {statsData.map((stat) => (
          <div key={stat.id} className="col-xl-3 col-lg-6 col-md-6 col-12">
            <div className={`card ${Dashboardstyles.statsCard}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className={`card-subtitle mb-2 ${Dashboardstyles.cardTitle}`}>
                      {stat.title}
                    </h6>
                    <h3 className={`card-title mb-0 ${Dashboardstyles.cardValue}`}>
                      {stat.value}
                    </h3>
                  </div>
                  <div className={`${Dashboardstyles.iconContainer} ${Dashboardstyles[stat.iconBg]}`}>
                    <i className={`bi ${stat.icon} ${Dashboardstyles.icon}`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <br /><br /><br />
    <RecentOrders />
    </>
    
  );
};

export default Dashboard;