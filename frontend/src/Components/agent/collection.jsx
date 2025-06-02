import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from "../Sidenav/sidenav";
import createToast from "../../utils/toast";
 
import "./collection.css";

const CollectionDetails = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("collectionId from useParams:", collectionId);

    const fetchCollectionData = async () => {
      try {
        const response = await fetch(`https://backend-food-amber.vercel.app/api/v1/agent/agent/collection/view/${collectionId}`);
        const data = await response.json();
        if (data.success) {
          setCollection(data.collection);
        } else {
          setError(data.message || 'Failed to fetch collection data.');
        }
      } catch (err) {
        setError('Error fetching collection data.');
        createToast("Error fetching collection data");
        console.error(err);
      }
    };

    fetchCollectionData();
  }, [collectionId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!collection) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <main>
      <Navigation />
      <div className="main-wrapper">
        <div className="header">
          
          <h5 className="header-title">Collection</h5>
        </div>
        <div className="collection-details">
          <div className="detail-item">
            <span className="detail-label">Donor Name:</span>
            <span className="detail-value">{`${collection.donor.name}`}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Food type:</span>
            <span className="detail-value">{collection.foodType}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Quantity:</span>
            <span className="detail-value">{collection.quantity}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Time of cooking:</span>
            <span className="detail-value">{new Date(collection.cookingTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Address to collect:</span>
            <span className="detail-value">{collection.address}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{collection.phone}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className={`detail-value status-${collection.status}`}>{collection.status}</span>
          </div>
          {collection.status === 'assigned' && collection.adminToAgentMsg && (
            <div className="detail-item">
              <span className="detail-label">Message from Admin:</span>
              <div className="detail-value">{collection.adminToAgentMsg}</div>
            </div>
          )}
          {collection.status === 'collected' && (
            <div className="detail-item">
              <span className="detail-label">Collection time:</span>
              <span className="detail-value">{new Date(collection.collectionTime).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CollectionDetails;
