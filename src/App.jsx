import React from "react";
import Autocomplete from "./components/Autocomplete.jsx";

function App() {
  return (
    <div className="bg-gradient-to-r from-black to-gray-800 min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <Autocomplete />
      </div>
    </div>
  );
}

export default App;
