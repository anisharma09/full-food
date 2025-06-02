import { useEffect, useState } from 'react';
import Navigation from '../../Sidenav/sidenav';
const DonorPendingDonations = () => {
  const [pendingDonations, setPendingDonations] = useState([]);
// const data = JSON.parse(localStorage.getItem("userData"))
  useEffect(() => {
    const fetchPendingDonations = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/api/v1/doner/doner/donations/pending', {
          method: 'GET',
          credentials: 'include',  
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Please log in');
          }
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Pending donations:', data.pendingDonations);
        setPendingDonations(data.pendingDonations);
      } catch (error) {
        console.error('Error fetching pending donations:', error);
      }
    };

    fetchPendingDonations();
  }, []);

  return (
    <main>
        <Navigation/>
      <div id="main-wrapper">
        <div className="bg-white shadow-sm p-3">
          <span className="me-3" id="sidebar-toggler-btn">
            <i className="fas fa-bars"></i>
          </span>
          <h5 className="m-0 color-theme d-inline-block">Pending Donations</h5>
        </div>

        <div className="border m-4 my-3 p-4 bg-white rounded-2 shadow-sm">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Donation ID</th>
                <th scope="col">Food Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Cooking Time</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Donor To Admin Msg</th>
              </tr>
            </thead>
            <tbody>
              {pendingDonations.map((donation) => (
                <tr key={donation._id}>
                  <td>{donation._id}</td>
                  <td>{donation.foodType}</td>
                  <td>{donation.quantity}</td>
                  <td>{donation.cookingTime}</td>
                  <td>{donation.address}</td>
                  <td>{donation.phone}</td>
                  <td>{donation.donorToAdminMsg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default DonorPendingDonations;
