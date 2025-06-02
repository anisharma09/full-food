import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './assignagent.css';  
import Navigation from '../../Sidenav/sidenav';
import createToast from '../../../utils/toast';

const AssignAgents = () => {
  const [donation, setDonation] = useState(null);
  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState('');
  const [message, setMessage] = useState('');
  const { donationId } = useParams();  
 

  useEffect(() => {
     
    const fetchDonation = async () => {
      try {
        const response = await fetch(`https://backend-food-amber.vercel.app/api/v1/admin/admin/donation/view/${donationId}`);  
        const data = await response.json();
        setDonation(data.donation);
      } catch (error) {
        console.error('Error fetching donation:', error);
      }
    };

 
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/api/v1/admin/admin/allagents');  
        const data = await response.json();
        setAgents(data.agents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchDonation();
    fetchAgents();
  }, [donationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backend-food-amber.vercel.app/api/v1/admin/admin/donation/assign/${donationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agentId, message }),
      });
      if (response.ok) {
        createToast('Agent assigned successfully', "success");
        // history.push('/success');  
      } else {
        console.error('Error assigning agent');
        createToast('Error assigning agent', "error");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      createToast(error.message, 'error');
    }
  };

  if (!donation) {
    return <div>Loading...</div>;
  }

  return (
    <main>
        <Navigation/>
      <div id="main-wrapper">
        <div className="bg-white shadow-sm p-3">
          <span className="me-3" id="sidebar-toggler-btn">
            <i className="fas fa-bars"></i>
          </span>
          <h5 className="m-0 color-theme d-inline-block">Assign agent</h5>
        </div>

        <form onSubmit={handleSubmit} className="border m-4 my-3 p-4 bg-white rounded-2 shadow">
          <div className="row">
            <div className="mb-4 col-sm-4">
              <label htmlFor="donor" className="form-label">Donor name</label>
              <input
                type="text"
                className="form-control"
                id="donor"
                value={`${donation.donor.firstName} ${donation.donor.lastName}`}
                disabled
              />
            </div>

            <div className="mb-4 col-sm-8">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={donation.address}
                disabled
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="agent" className="form-label">Select Agent</label>
            <select
              name="agent"
              className="form-select"
              id="agent"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
            >
                <option value="">Select an agent</option>
              {agents.map((agent) => (
                                <option key={agent._id} value={agent._id}>
                  {`${agent.name}`}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="msg" className="form-label">Message to Agent</label>
            <textarea
              name="adminToAgentMsg"
              className="form-control"
              id="msg"
              placeholder="You can write here some message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn w-75 d-block m-auto mt-4">
            Assign
          </button>
        </form>
      </div>
    </main>
  );
};

export default AssignAgents;
