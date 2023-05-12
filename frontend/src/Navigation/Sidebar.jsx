import React, { useState } from "react";

export default function Sidebar() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className={`sidebar ${isSidebarOpen ? 'show' : ''}`}>
        <h4>Sidebar</h4>
        <p>Content goes here...</p>
      <button className="btn btn-primary" onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
      </div>
    </div>
  );


}
