"use client";

import { useState } from "react";

export default function TestReactPage() {
  const [clicked, setClicked] = useState(false);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#1a1a1a', 
      color: '#ffffff',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>React Test Page</h1>
      <button
        onClick={() => {
          console.log("React button clicked!");
          setClicked(true);
          alert("React is working!");
        }}
        style={{
          padding: '15px 30px',
          fontSize: '1.2em',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {clicked ? "React Works! ✅" : "Click Me - Test React"}
      </button>
      <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#aaaaaa' }}>
        If this button changes text when clicked, React is working.
      </p>
    </div>
  );
}
