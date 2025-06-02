import   { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../Sidenav/sidenav';

const PreviousCollections = () => {
  const [previousCollections, setPreviousCollections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreviousCollections = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/api/v1/agent/agent/collections/previous',{
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        console.log("data is ", data)
        if (data.success) {
          setPreviousCollections(data.previousCollections);
        } else {
          setError(data.message || 'Failed to fetch previous collections.');
        }
      } catch (err) {
        setError('Error fetching previous collections.', error);
        console.error(err);
      }
    };

    fetchPreviousCollections();
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
          <h5 className="m-0 color-theme d-inline-block">Previous Collections</h5>
        </div>

        <div className="col col-sm-10 col-12 m-auto my-4" style={{ maxHeight: '75%', overflow: 'auto' }}>
          <table className="table table-info table-striped table-hover m-0 bg-white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Donor name</th>
                <th scope="col">Address collected</th>
                <th scope="col">Phone</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {previousCollections.map((collection, index) => (
                <tr key={collection._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{`${collection.donor.name} `}</td>
                  <td>{collection.address}</td>
                  <td>{collection.phone}</td>
                  <td>
                    <Link to={`/agent/collection/view/${collection._id}`} className="btn" style={{width:"100px",height:"80px",color:"black", backgroundColor:"orangered"}}>View</Link>
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

export default PreviousCollections;
