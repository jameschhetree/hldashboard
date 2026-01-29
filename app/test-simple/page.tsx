"use client";

export default function TestSimplePage() {
  const handleClick = () => {
    alert("JavaScript works!");
    console.log("Button clicked!");
  };

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
      <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Simple JavaScript Test</h1>
      <button
        onClick={handleClick}
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
        Click Me - If this works, JavaScript is running
      </button>
      <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#aaaaaa' }}>
        Open browser console (F12) to see logs
      </p>
    </div>
  );
}
