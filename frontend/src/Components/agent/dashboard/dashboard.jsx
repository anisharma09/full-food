import { useEffect, useState } from 'react';
import "./dasboard.css";
import Navigation from '../../Sidenav/sidenav';

const AgentDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    numAssignedDonations: 0,
    numCollectedDonations: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/api/v1/agent/agent/dashboard', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        const data = await response.json();
        console.log("donate data", data);
        if (data.success && data.data) {
          setDashboardData(data.data);
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
    numAssignedDonations,
    numCollectedDonations,
  } = dashboardData;

  return (
    <main>
      <Navigation />

      <div className="agent-dashboard-main-wrapper">
        <div className="agent-dashboard-header">
          <h5 className="agent-dashboard-title">Dashboard</h5>
        </div>

        <div className="agent-dashboard-stats-container">
          <div className="agent-dashboard-stat-card bg-primary">
            <div className="agent-dashboard-stat-number">{numAssignedDonations}</div>
            <div className="agent-dashboard-stat-label">Assigned Donations</div>
          </div>
          <div className="agent-dashboard-stat-card bg-primary">
            <div className="agent-dashboard-stat-number">{numCollectedDonations}</div>
            <div className="agent-dashboard-stat-label">Collected Donations</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AgentDashboard;
