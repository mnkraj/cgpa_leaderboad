import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loadings";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import icon from "./sort-icon.png";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setsearch] = useState("");
  const [sortByCgpa, setSortByCgpa] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_LINK_1}/api/v1/getresults`)
      .then((response) => {
        let res = response.data;
        res = sortAndCalculateRanks(res, "Cgpa"); // Initial sorting by CGPA
        setData(res);
        setFilteredData(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterData();
  }, [year, branch, search, data, sortByCgpa]);

  const filterData = () => {
    let filtered = data;
    if (year) {
      filtered = filtered.filter((student) => student.Regn.startsWith(year));
    }
    if (branch) {
      filtered = filtered.filter((student) => student.Regn.includes(branch));
    }
    if (search) {
      filtered = filtered.filter(
        (student) =>
          student.Regn.includes(search) ||
          student.Name.toLowerCase().includes(search.toLowerCase())
      );
    }
    const rankKey = sortByCgpa ? "Cgpa" : "Sgpa";
    filtered = sortAndCalculateRanks(filtered, rankKey);
    setFilteredData(filtered);
  };

  const sortAndCalculateRanks = (students, key) => {
    let rank = 1;
    let e = 0;
    students.sort((a, b) => (b[key] || 0) - (a[key] || 0));
    for (let i = 0; i < students.length; i++) {
      if (i > 0 && students[i][key] === students[i - 1][key]) e++;
      if (i > 0 && students[i][key] < students[i - 1][key]) {
        rank = i + 1 - e;
      }
      students[i].Rank = rank;
    }
    return students;
  };

  const handleButtonClick = (regn) => {
    window.open(`https://nitjsr.vercel.app/result/${regn}`, "_blank");
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Loading />
        </div>
      )}
      <Navbar search={search} setsearch={setsearch} disab={true} />
      <section className="bg-gray-900" style={{ minHeight: "75vh" }}>
        <div
          className="w-full xl:w-8/12 xl:mb-0 px-4 mx-auto"
          style={{ paddingTop: "10px", paddingBottom: "20px" }}
        >
          <div className="flex justify-between mb-4">
            <select
              className="block p-2 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">All Year</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
            <select
              className="block p-2 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">All Branch</option>
              <option value="CS">CSE</option>
              <option value="EE">EE</option>
              <option value="ME">Mech</option>
              <option value="EC">ECE</option>
              <option value="CE">Civil</option>
              <option value="PI">PIE</option>
              <option value="MM">Meta</option>
              <option value="CM">ECM</option>
            </select>
          </div>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="table-header" style={{ width: "0%" }}>
                      SI No.
                    </th>
                    <th className="table-header" style={{ width: "0%" }}>
                      Regn No
                    </th>
                    <th className="table-header">Name</th>
                    <th className="table-header" style={{ width: "0%" }}>
                      Last Sem SGPA
                    </th>
                    <th className="table-header" style={{ width: "0%" }}>
                      CGPA
                    </th>
                    <th className="table-header" style={{ width: "0%" }}>
                      Actions
                    </th>
                    <th
                      className="table-header"
                      style={{
                        width: "100%",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%", // Ensure it takes the full cell height
                        verticalAlign: "middle", // Align content in the middle
                      }}
                      onClick={() => {
                        setSortByCgpa((prev) => !prev);
                        filterData();
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap : "5px",
                          padding : "10px",
                          justifyContent: "center",
                          height: "100%", // Make the container match the cell height
                        }}
                      >
                        <div>Rank</div>
                        <img
                          src={icon}
                          alt="Sort Icon"
                          style={{
                            width: "20px",
                            height: "20px",
                            marginTop: "5px",
                            transform: sortByCgpa
                              ? "rotate(0deg)"
                              : "rotate(180deg)",
                            transition: "transform 0.3s ease",
                          }}
                          title={`Sort by ${sortByCgpa ? "SGPA" : "CGPA"}`}
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData &&
                    filteredData.map((student, index) => (
                      <tr
                        key={student._id}
                        className={index % 2 === 0 ? "even-row" : "odd-row"}
                      >
                        <td className="table-cell items-center text-center">
                          {index + 1}
                        </td>
                        <td className="table-cell items-center text-center">
                          {student.Regn}
                        </td>
                        <td className="table-cell items-center">
                          {student.Name}
                        </td>
                        <td
                          className="table-cell text-center"
                          style={{
                            color:
                              student.Sgpa === 0 || !student.Sgpa
                                ? "red"
                                : undefined,
                          }}
                        >
                          {!student.Sgpa ? 0 : student.Sgpa}
                        </td>
                        <td
                          className="table-cell text-center"
                          style={{
                            color:
                              student.Cgpa === 0 || !student.Cgpa
                                ? "red"
                                : undefined,
                          }}
                        >
                          {!student.Cgpa ? 0 : student.Cgpa}
                        </td>
                        <td className="table-cell items-center text-center">
                          <button
                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                            onClick={() => handleButtonClick(student.Regn)}
                          >
                            <small>View Details</small>
                          </button>
                        </td>
                        <td className="table-cell text-center">
                          {student.Rank}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
