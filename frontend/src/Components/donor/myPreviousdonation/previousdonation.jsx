import { useEffect, useState } from 'react';
 
import Navigation from '../../Sidenav/sidenav';

const DonorPreviousDonations = () => {
  const [previousDonations, setPreviousDonations] = useState([]);

  useEffect(() => {
    const fetchPreviousDonations = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/api/v1/doner/doner/donations/previous', {
          method: 'GET',
          credentials: 'include',  
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  //loocal storage
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Please log in');
          }
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("data",data)
        setPreviousDonations(data.previousDonations);
      } catch (error) {
        console.error('Error fetching previous donations:', error);
      }
    };

    fetchPreviousDonations();
  }, []);

  return (
    <main>
       {/* <Donation/> */}
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
                <th scope="col">Food type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Status</th>
                <th scope="col">Cooking Time</th>
                <th scope="col">Agent assigned</th>
                <th scope="col">Collection Time</th>
              </tr>
            </thead>
            <tbody>
              {previousDonations.map((donation, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{donation.foodType}</td>
                  <td>{donation.quantity}</td>
                  <td className={`fw-bold text-${donation.status}`}>{donation.status}</td>
                  <td>{new Date(donation.cookingTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                  <td>{donation.agent.name}</td>
                  <td>{new Date(donation.collectionTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default DonorPreviousDonations;
