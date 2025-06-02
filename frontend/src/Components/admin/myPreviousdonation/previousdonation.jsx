import  { useEffect, useState } from 'react';
import { Link  } from "react-router-dom";
import Navigation from '../../Sidenav/sidenav';  

import createToast from '../../../utils/toast';

const Previousdonation = () => {
  const [previousDonations, setPreviousDonations] = useState([]);

  useEffect(() => {
    const fetchPreviousDonations = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/api/v1/admin/admin/donations/previous');
        const data = await response.json();
        console.log("data ", data);
        if (data.success && data.previousDonations) {
          setPreviousDonations(data.previousDonations);
        } else {
          console.error('Failed to fetch previous donations:', data);
          createToast('Failed to fetch previous donations.', 'error');
        }
      } catch (error) {
        console.error('Error fetching previous donations:', error);
        createToast('Error fetching previous donations.', 'error');
      }
    };

    fetchPreviousDonations();
  }, []);

  return (
    <main>
      <Navigation/>  

      <div id="main-wrapper">
        <div className="bg-white shadow-sm p-3">
          <span className="me-3" id="sidebar-toggler-btn">
            <i className="fas fa-bars"></i>
          </span>
          <h5 className="m-0 color-theme d-inline-block">Previous Donations</h5>
        </div>

        <div className="col col-sm-10 col-12 m-auto my-4" style={{ maxHeight: '75%', overflow: 'auto' }}>
          <table className="table table-info table-striped table-hover m-0 bg-white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Donor name</th>
                <th scope="col">Food type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {previousDonations.map((donation, index) => (
                <tr key={donation._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{`${donation.donor.name}`}</td>
                  <td>{donation.foodType}</td>
                  <td>{donation.quantity}</td>
                  <td className={`fw-bold text-${donation.status}`}>{donation.status}</td>
                  <td>
                    <a href={`/admin/donation/view/${donation._id}`} className="btn">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Previousdonation;
