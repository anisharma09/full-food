import   { useEffect, useState } from 'react';
import Navigation from '../../Sidenav/sidenav';
// import { useNavigate } from 'react-router-dom'; 
import createToast from '../../../utils/toast';

const DonorDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    numCollectedDonations: 0,
    numPendingDonations: 0,
    numAcceptedDonations: 0,
    numAssignedDonations: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/api/v1/doner/doner/dashboard',{
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("donate data",data)
        if (data.success) {
          setDashboardData({
            numCollectedDonations: data.numCollectedDonations,
            numPendingDonations: data.numPendingDonations,
            numAcceptedDonations: data.numAcceptedDonations,
            numAssignedDonations: data.numAssignedDonations,
          });
        } else {
          setError(data.message || 'Failed to fetch dashboard data.');
          
        }
      } catch (err) {
        setError('Error fetching dashboard data.');
        createToast('Error fetching dashboard data.')
        console.error(err);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <Navigation/>
      <div id="main-wrapper">
        <div className="bg-white shadow-sm p-3">
          <span className="me-3" id="sidebar-toggler-btn"><i className="fas fa-bars"></i></span>
          <h5 className="m-0 color-theme d-inline-block">Dashboard</h5>
        </div>
        <div className="d-flex gap-3 flex-wrap m-4 text-white">
          <div className="bg-success rounded p-3" style={{ width: '100%' }}>
            <div className="fs-1">{dashboardData.numCollectedDonations}</div>
            <div className="fs-5">donations by you</div>
          </div>
          <div className="bg-primary rounded p-3" style={{ width: '250px' }}>
            <div className="fs-1">{dashboardData.numPendingDonations}</div>
            <div className="fs-5">donation requests not processed yet</div>
          </div>
          <div className="bg-success rounded p-3" style={{ width: '250px' }}>
            <div className="fs-1">{dashboardData.numAcceptedDonations}</div>
            <div className="fs-5">donations accepted and to be assigned to agent</div>
          </div>
          <div className="bg-danger rounded p-3" style={{ width: '250px' }}>
            <div className="fs-1">{dashboardData.numAssignedDonations}</div>
            <div className="fs-5">donations not collected yet</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DonorDashboard;
