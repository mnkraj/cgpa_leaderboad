import React from "react";
import { Navigate,useNavigate } from "react-router-dom";
const TermsAndConditions = () => {
    const navigate = useNavigate();
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bolder",
          fontSize: "30px",
        }}
      >
        Terms and Conditions
      </h1>

      <p>
        Welcome to the CGPA Leaderboard website (the <strong>"Website"</strong>
        ). By accessing or using this Website, you agree to comply with the
        following terms and conditions. If you do not agree with these terms,
        please refrain from using this Website.
      </p>

      <h2
        style={{ marginTop: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        1. Purpose of the Website
      </h2>
      <p>
        The primary purpose of this Website is to create and display a
        leaderboard ranking of students based on their academic CGPA. This is
        intended solely for informational and non-commercial purposes to foster
        healthy academic competition and motivation among students. The Website
        aims to help students keep track of their academic performance and
        encourage improvement over time.
      </p>

      <h2
        style={{ marginTop: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        2. Source of Data
      </h2>
      <p>
        The CGPA data displayed on this Website is sourced from the institute’s
        result portal, which is publicly accessible. The data is used in
        accordance with the principle of fair use, with the intent to benefit
        the student community. The administrator of this Website does not derive
        any commercial profit from its operation.
      </p>

      <h2
        style={{ marginTop: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        3. Data Usage
      </h2>
      <p>
        The CGPA data displayed on this Website is collected and processed from
        publicly available information or with assumed consent. If you believe
        your CGPA has been displayed without your authorization or you do not
        wish for your CGPA to appear on the leaderboard, you can request its
        removal by contacting the administrator directly.
      </p>

      <h2
        style={{ marginTop: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        4. Opt-Out Policy
      </h2>
      <p>
        If you do not want your CGPA to be made public on this Website, please
        send an email or message to [
        <a href="https://www.linkedin.com/in/mnkraj" style={{ color: "blue" }}>
          https://www.linkedin.com/in/mnkraj
        </a>
        ] with your full name and registration number. Upon verification, your
        CGPA will be promptly removed from the leaderboard.
      </p>

      <h2
        style={{ marginTop: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        5. No Guarantee of Accuracy
      </h2>
      <p>
        While efforts are made to ensure the accuracy of the information
        displayed, the Website does not guarantee the completeness, reliability,
        or accuracy of the CGPA data. Users are advised to cross-check the
        information with the official academic records.
      </p>

      <h2
        style={{ marginTop: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        6. Privacy and Confidentiality
      </h2>
      <p>
        The Website is committed to respecting your privacy. No personal data
        other than the CGPA and registration number (used solely for
        verification purposes) will be collected or disclosed.
      </p>

      <h2
        style={{ marginTop: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        7. User Responsibility
      </h2>
      <p>
        By using this Website, you acknowledge that the data displayed is for
        informational purposes only and should not be misused or misinterpreted
        for any unauthorized or harmful activities.
      </p>

      <h2
        style={{ marginTop: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        8. Disclaimer
      </h2>
      <p>
        The Website and its administrator are not liable for any direct,
        indirect, incidental, or consequential damages arising from the use or
        inability to use the Website, including but not limited to inaccuracies
        in the displayed data or unauthorized access.
      </p>

      <h2
        style={{ marginTop: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        9. Modifications to Terms
      </h2>
      <p>
        The administrator reserves the right to update or modify these terms and
        conditions at any time without prior notice. Continued use of the
        Website constitutes acceptance of the revised terms.
      </p>

      <h2
        style={{ marginTop: "20px", fontWeight: "bold", marginBottom: "10px" }}
      >
        10. Contact Information
      </h2>
      <p>For any queries, concerns, or removal requests, please contact:</p>
      <ul>
        <li>
          <strong>Name:</strong> Mayank Raj
        </li>
        <li>
          <strong>Profile:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/mnkraj"
            style={{ color: "blue" }}
          >
            https://www.linkedin.com/in/mnkraj
          </a>
        </li>
      </ul>

      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        By using this Website, you acknowledge that you have read, understood,
        and agree to be bound by these terms and conditions.
      </p>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={() => navigate("/") }
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
