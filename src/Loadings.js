import React from "react";
import {ClipLoader} from "react-spinners";
import "./Spinner.css"; // Import CSS file for styling

const Spinner = () => {
  return (
    <div className="spinner-container">
      <ClipLoader color="#363bd6" size={70} />
    </div>
  );
};

export default Spinner;
