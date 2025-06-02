import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from '../../Sidenav/sidenav';
import createToast from "../../../utils/toast";
const Acceptagent = () => {
  const { donationId } = useParams();
  console.log("useParams", donationId);

  const [donation, setDonation] = useState(null);
    const [error, setError] = useState(null);
  useEffect(() => { 
    const fetchDonationData = async () => {
      try {
        const response = await fetch(`https://backend-food-amber.vercel.app/api/v1/admin/admin/donation/accept/${donationId}`);
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch donation data.");
          createToast(errorData.message,"error")
          return;
        }
        const data = await response.json();
        if (data.success) {
          setDonation(data.donation);
          createToast(data.message,"success")
        } else {
          setError(data.message || "Failed to fetch donation data.");
          createToast(data.message,"error")
        }
      } catch (err) {
        setError("Error fetching donation data.");
        createToast("Error fetching donation data.","error")
        console.error(err);
      }
    };
    fetchDonationData();
  });

  return (
    <div>
      <Navigation/>
      <h1>Accept Agent</h1>
    </div>
  );
};

export default Acceptagent;
