import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import "./Spinner.css"; // Import CSS file for styling

const Spinner = () => {
  return (
    <div className="spinner-container">
      <PulseLoader color="#363bd6" size={25} />
    </div>
  );
};

export default Spinner;
