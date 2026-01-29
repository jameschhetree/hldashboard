"use client";

export default function TestJSPage() {
  const handleClick = () => {
    alert("JavaScript is working!");
    console.log("Button clicked!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">JavaScript Test Page</h1>
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          Click Me - If this works, JavaScript is working
        </button>
        <p className="text-sm text-gray-500">
          Open browser console (F12) to see logs
        </p>
      </div>
    </div>
  );
}
