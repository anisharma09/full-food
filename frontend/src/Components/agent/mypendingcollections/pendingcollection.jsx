import   { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../Sidenav/sidenav';
import createToast from '../../../utils/toast';

const PendingCollectionsagent = () => {
  const [pendingCollections, setPendingCollections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingCollections = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/api/v1/agent/agent/collections/pending',{
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }); // Corrected the URL
        const data = await response.json();
        if (data.success) {
          setPendingCollections(data.pendingCollections);
        } else {
          setError(data.message || 'Failed to fetch pending collections.');
          createToast("Failed to fetch",error)
        }
      } catch (err) {
        setError('Error fetching pending collections.');
        createToast("Error",error)
        console.error(err);
      }
    };

    fetchPendingCollections();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <Navigation/> 
      <div id="main-wrapper">
        <div className="bg-white shadow-sm p-3">
          <span className="me-3" id="sidebar-toggler-btn">
            <i className="fas fa-bars"></i>
          </span>
          <h5 className="m-0 color-theme d-inline-block">Pending Collections</h5>
        </div>

        <div className="col col-sm-10 col-12 m-auto my-4" style={{ maxHeight: '75%', overflow: 'auto' }}>
          <table className="table table-info table-striped table-hover m-0 bg-white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Donor name</th>
                <th scope="col">Address to collect</th>
                <th scope="col">Phone</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingCollections.map((collection, index) => (
                <tr key={collection._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{`${collection.donor.name}`}</td>
                  <td>
                    <a href={`https://www.google.com/maps?q=${collection.address}`} target="_blank" rel="noopener noreferrer">
                      {collection.address}
                    </a>
                  </td>
                  <td>{collection.phone}</td>
                  <td>
                    <Link to={`/agent/collection/view/${collection._id}`} className="btn">View</Link>
                    <Link to={`/agent/collection/collect/${collection._id}`} className="btn">Collect</Link>
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

export default PendingCollectionsagent;
