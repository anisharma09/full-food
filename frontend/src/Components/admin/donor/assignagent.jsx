import { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import createToast from '../../../utils/toast';
import { useNavigate } from 'react-router-dom';

const AssignAgent = () => {
  const { donationId } = useParams();
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/api/v1/admin/admin/agents');
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch agents.');
          return;
        }
        const data = await response.json();
        console.log(data,"datassssssssssssss")
        setAgents(data.agents);
      } catch (err) {
        setError('Error fetching agents.');
        console.error(err);
      }
    };
    fetchAgents();
  }, []);

  const handleAssign = async () => {
    try {
      const response = await fetch(`https://backend-food-amber.vercel.app/api/v1/admin/admin/donation/assignt/${donationId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ agentId: selectedAgent })
         
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to assign agent.');
        return;
      }
      createToast("assign successfully","success")
      navigate(`/admin/dashboard`);
    } catch (err) {
      setError('Error assigning agent.');
      
      console.error(err);
      createToast(err,"error")
    }
  };

  return (
    <div style={{
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


    }}>
      <h3>Assign Agent to Donation</h3>
      {error && <p>Error: {error}</p>}
      <div>
        <label htmlFor="agent">Select Agent:</label>
        <select id="agent" value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)} required>
          <option value="" required>Select an agent</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>{agent.name}</option>
          ))}
        </select>
      </div>
      <button onClick={handleAssign} className="btn mt-2">Assign</button>
    </div>
  );
};

export default AssignAgent;
