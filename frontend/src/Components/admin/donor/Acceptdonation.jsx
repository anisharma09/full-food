import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import createToast from "../../../utils/toast";

const AcceptDonation = () => {
  const { donationId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAccept = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://backend-food-amber.vercel.app/api/v1/admin/admin/donation/accept/${donationId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to accept donation.");
        createToast(errorData.message, "error");
        return;
      }
      navigate(`/admin/donation/view/${donationId}`);
    } catch (err) {
      setError("Error accepting donation.");
      createToast("Error accepting donation.", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div
            className="wrap"
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              margin: "20px",
              textAlign: "center",
              color: "black",
              fontSize: "20px",
            }}
          >
            <p>Are you sure you want to accept this donation?</p>
            {error && <p>Error: {error}</p>}
            <button onClick={handleAccept} className="btn">
              Yes
            </button>
            <button onClick={() => navigate(-1)} className="btn btn-secondary">
              No
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AcceptDonation;
