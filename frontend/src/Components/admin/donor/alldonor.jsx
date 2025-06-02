import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../../Sidenav/sidenav';
import createToast from '../../../utils/toast';
import "./alldonor.css"

const AllDonation = () => {
  const { donationId } = useParams();
  const [donation, setDonation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        const response = await fetch(`https://backend-food-amber.vercel.app/api/v1/admin/admin/donation/view/${donationId}`);
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch donation data.');
          createToast(errorData.message, "error");
          return;
        }

        const data = await response.json();
        console.log(data,"fierioere")
        if (data.success) {
          setDonation(data.donation);
        } else {
          setError(data.message || 'Failed to fetch donation data.');
          createToast(data.message, "error");
        }
      } catch (err) {
        setError('Error fetching donation data.');
        createToast('Error fetching donation data.', "error");
        console.error(err);
      }
    };

    fetchDonationData();
  }, [donationId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!donation) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Navigation />
      <div className="donation-main-wrapper">
        <div className="donation-header bg-white shadow-sm p-3">
          <span className="me-3" id="sidebar-toggler-btn">
            <i className="fas fa-bars"></i>
          </span>
          <h5 className="m-0 color-theme d-inline-block">Donation</h5>
        </div>

        <div className="donation-details border m-4 my-3 p-4 bg-white rounded-2 shadow-sm">
          <div className="donation-info">
            <span>Donor Name:</span>
            <span>{donation.name}</span>
          </div>
          
          <div className="donation-info">
            <span>Food type:</span>
            <span>{donation.foodType}</span>
          </div>
          
          <div className="donation-info">
            <span>Quantity:</span>
            <span>{donation.quantity}</span>
          </div>
          
          <div className="donation-info">
            <span>Time of cooking:</span>
            <span>{new Date(donation.cookingTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short"})}</span>
          </div>
          
          <div className="donation-info">
            <span>Address to collect:</span>
            <span>{donation.address}</span>
          </div>
          
          <div className="donation-info">
            <span>Phone:</span>
            <span>{donation.phone}</span>
          </div>
          
          {donation.donorToAdminMsg && (
            <div className="donation-info">
              <span>Message from Donor:</span>
              <div className="ms-3">{donation.donorToAdminMsg}</div>
            </div>
          )}
          
          <div className="donation-info">
            <span>Status:</span>
            <span className={`fw-bold text-${donation.status}`}>{donation.status}</span>
          </div>
          
          {donation.status === "assigned" && (
            <div className="donation-info">
              <span>Agent assigned:</span>
              <span>{`${donation.agent.name}`}</span>
            </div>
          )}
          
          {donation.status === "assigned" && donation.adminToAgentMsg && (
            <div className="donation-info">
              <span>Your message to Agent:</span>
              <div className="ms-3">{donation.adminToAgentMsg}</div>
            </div>
          )}
          
          {donation.status === "collected" && (
            <div className="donation-info">
              <span>Collection time:</span>
              <span>{new Date(donation.collectionTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short"})}</span>
            </div>
          )}
          
          <div className="donation-actions mt-4">
            {donation.status === "pending" ? (
              <>
                <a href={`/admin/donation/accept/${donation._id}`} className="btn">Accept</a>
                <a href={`/admin/donation/reject/${donation._id}`} className="btn btn-danger">Reject</a>
              </>
            ) : donation.status === "accepted" ? (
              <a href={`/admin/donation/assign/${donation._id}`} className="btn" style={{backgroundColor:"orange", height:"80px"}}>Assign agent</a>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AllDonation;
