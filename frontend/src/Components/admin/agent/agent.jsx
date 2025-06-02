import   { useState, useEffect } from 'react';

import './agent.css';  
import Navigation from '../../Sidenav/sidenav';

const Agentdata = () => {
  const [agents, setAgents] = useState([]);

useEffect(() => {
    // Fetch  
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://backend-food-amber.vercel.app/api/v1/admin/admin/allagents'); // Replace with your API endpoint
        const data = await response.json();
        
        if (data.success && Array.isArray(data.agents)) {
            setAgents(data.agents);
          } else {
            console.error('Fetched data is not an array:', data);
          }
        } catch (error) {
          console.error('Error fetching agents:', error);
        }
      };
       
    fetchAgents();
  }, []);

  return (
    <main>   
      <Navigation/>
      <div id="main-wrapper">
        <div className="agents-main">
          <span className="me" id="sidebar-toggler-btn">
            <i className="fas fa-bars"></i>
          </span>
        </div>
        <div className="table" style={{ maxHeight: '75%', overflow: 'auto' }}>
          <table className="table table-info table-striped table-hover m-0 bg-white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Agent name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Join time</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{`${agent.name}`}</td>
                  <td>{agent.email}</td>
                  <td>{agent.phone}</td>
                  <td>{new Date(agent.joinedTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Agentdata;
