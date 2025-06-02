import   { useEffect, useState } from 'react';
import "./dasboard.css"; 
import Navigation from '../../Sidenav/sidenav';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    numAdmins: 0,
    numDonors: 0,
    numAgents: 0,
    numPendingDonations: 0,
    numAcceptedDonations: 0,
    numAssignedDonations: 0,
    numCollectedDonations: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/api/v1/admin/admin/dashboard'); 
        const data = await response.json();
        if (data.success && data.data) {
          setDashboardData(data.data); // Correctly set the nested data object
        } else { 
          console.error('Failed to fetch dashboard data:', data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const {
    numAdmins,
    numDonors,
    numAgents,
    numPendingDonations,
    numAcceptedDonations,
    numAssignedDonations,
    numCollectedDonations,
  } = dashboardData;

  return (
    <main>
        <Navigation/>
      <div id="main-wrapper">
        <div className="bg-white shadow-sm p-3">
          <span className="me-3" id="sidebar-toggler-btn">
            <i className="fas fa-bars"></i>
          </span>
          <h5 className="m-0 color-theme d-inline-block">Dashboard</h5>
        </div>

        <div className="d-flex gap-3 flex-wrap m-4 text-white">
          <div className="bg-primary rounded p-3" style={{ width: '250px' }}>
            <div className="fs-1">{numAdmins}</div>
            <div className="fs-5">admins</div>
          </div>

          <div className="bg-success rounded p-3" style={{ width: '250px' }}>
            <div className="fs-1">{numDonors}</div>
            <div className="fs-5">donors</div>
          </div>

          <div className="bg-primary rounded p-3" style={{ width: '250px' }}>
            <div className="fs-1">{numAgents}</div>
            <div className="fs-5">agents</div>
          </div>

          <div className="bg-success rounded p-3" style={{ width: '250px' }}>
            <div className="fs-1">{numPendingDonations}</div>
            <div className="fs-5">new donation requests</div>
          </div>

          <div className="bg-warning rounded p-3" style={{ width: '250px' }}>
            <div className="fs-1">{numAcceptedDonations}</div>
            <div className="fs-5">donations to be assigned to agent</div>
          </div>

          <div className="bg-danger rounded p-3" style={{ width: '250px' }}>
            <div className="fs-1">{numAssignedDonations}</div>
            <div className="fs-5">donations not collected yet</div>
          </div>

          <div className="bg-success rounded p-3" style={{ width: '250px' }}>
            <div className="fs-1">{numCollectedDonations}</div>
            <div className="fs-5">donations collected</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
