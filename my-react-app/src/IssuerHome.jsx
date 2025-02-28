import React from "react";
import { useNavigate } from "react-router-dom";

const IssuerHome = ({ onLogout }) => {
  const navigate = useNavigate();

  const events = [
    { id: 1, name: "Invictus", date: "2/1/2025" },
    { id: 2, name: "Dalal Street", date: "2/2/2025" },
  ];

  const handleViewEvent = (id) => {
    navigate(`/event-view/${id}`);
  };

  const handleDeleteEvent = (id) => {
    console.log(`Event with id ${id} deleted.`);
  };

  const handleQuery = () => {
    console.log("Query clicked.");
  };

  return (
    <div className="issuer-home">
      {/* Welcome Message */}
      <h1 className="welcome-title">Welcome, Issuer!</h1>
      <h2 className="events-heading">Your Events</h2>

      {/* Events Table */}
      <div className="table-container">
        <table className="events-table">
          <thead>
            <tr className="table-header">
              <th className="table-header-cell">Sr No</th>
              <th className="table-header-cell">Event Name</th>
              <th className="table-header-cell">Date</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id} className="table-row">
                <td className="table-cell">{index + 1}</td>
                <td className="table-cell">{event.name}</td>
                <td className="table-cell">{event.date}</td>
                <td className="table-cell">
                  <div className="action-buttons">
                    <button onClick={() => handleViewEvent(event.id)} className="action-button">View</button>
                    <button onClick={() => handleDeleteEvent(event.id)} className="action-button">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuerHome;
