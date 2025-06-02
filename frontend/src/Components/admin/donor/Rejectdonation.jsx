import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import createToast from '../../../utils/toast';
import './rejectDonation.css'; // Import the CSS file

const RejectDonation = () => {
  const { donationId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReject = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://backend-food-amber.vercel.app/api/v1/admin/admin/donation/reject/${donationId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to reject donation.');
        createToast('error', errorData.message || 'Failed to reject donation.');
        return;
      }
      createToast('success', 'Donation rejected successfully.');
      navigate(`/admin/donation/view/${donationId}`);
    } catch (err) {
      setError('Error rejecting donation.');
      createToast('error', 'Error rejecting donation.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reject-donation-container">
      {loading ? <p>Loading...</p> : (
        <>
          <p className="reject-donation-message">Are you sure you want to reject this donation?</p>
          {error && <p className="reject-donation-error">Error: {error}</p>}
          <div className="reject-donation-buttons">
            <button onClick={handleReject} className="btn btn-danger">Yes</button>
            <button onClick={() => navigate(-1)} className="btn btn-secondary">No</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RejectDonation;
