import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "../Sidenav/sidenav";

const CollectDonation = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("collectionId from useParams:", collectionId); // Debugging line

    const fetchCollectionData = async () => {
      if (!collectionId) {
        setError('No collection ID provided.');
        return;
      }

      try {
        const response = await fetch(`https://backend-food-amber.vercel.app/api/v1/agent/agent/collection/collect/${collectionId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        console.log("response", response); // Debugging line

        if (!response.ok) {
          const errorData = await response.text();
          setError(errorData);
          return;
        }

        const data = await response.json();
        console.log("data", data); // Debugging line

        if (data.success) {
          setCollection(data.collection);
        } else {
          setError(data.message || 'Failed to fetch collection data.');
        }
      } catch (err) {
        setError('Error fetching collection data.');
        console.error(err);
      }
    };

    fetchCollectionData();
  }, [collectionId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!collection) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Navigation />
      <div id="main-wrapper">
        <div className="bg-white shadow-sm p-3">
          <span className="me-3" id="sidebar-toggler-btn"><i className="fas fa-bars"></i></span>
          <h5 className="m-0 color-theme d-inline-block">Collection</h5>
        </div>

        <div className="border m-4 my-3 p-4 bg-white rounded-2 shadow-sm">
          <div className="mb-2">
            <span>Donor Name:</span>
            <span>{`${collection.donor.firstName} ${collection.donor.lastName}`}</span>
          </div>

          <div className="mb-2">
            <span>Food type:</span>
            <span>{collection.foodType}</span>
          </div>

          <div className="mb-2">
            <span>Quantity:</span>
            <span>{collection.quantity}</span>
          </div>

          <div className="mb-2">
            <span>Time of cooking:</span>
            <span>{new Date(collection.cookingTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
          </div>

          <div className="mb-2">
            <span>Address to collect:</span>
            <span>{collection.address}</span>
          </div>

          <div className="mb-2">
            <span>Phone:</span>
            <span>{collection.phone}</span>
          </div>

          <div className="mb-2">
            <span>Status:</span>
            <span className={`fw-bold text-${collection.status}`}>{collection.status}</span>
          </div>

          {collection.status === "assigned" && collection.adminToAgentMsg && (
            <div className="mb-2">
              <span>Message from Admin:</span>
              <div className="ms-3">{collection.adminToAgentMsg}</div>
            </div>
          )}

          {collection.status === "collected" && (
            <div className="mb-2">
              <span>Collection time:</span>
              <span>{new Date(collection.collectionTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CollectDonation;
