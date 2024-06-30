import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loadings";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setsearch] = useState("");

  useEffect(() => {
    setLoading(true);
    toast.loading("Fetching Data ...");
    axios
      .get("https://cgpa-server.vercel.app/api/v1/getresults")
      .then((response) => {
        let res = response.data;
        res.sort((a, b) => b.Cgpa - a.Cgpa);
        res = calculateRanks(res);
        setData(res);
        setFilteredData(res);
        setLoading(false);
        toast.remove();
        toast.success("Data Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.remove();
        toast.error("Error fetching data");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterData();
  }, [year, branch]);

  useEffect(() => {
    filterData();
  }, [search, data]);

  const filterData = () => {
    let filtered = data;
    if (year) {
      filtered = filtered.filter((student) => student.Regn.startsWith(year));
    }
    if (branch) {
      filtered = filtered.filter((student) => student.Regn.includes(branch));
    }
    if (search) {
      filtered = filtered.filter((student) => student.Regn.includes(search));
    }
    filtered.sort((a, b) => b.Cgpa - a.Cgpa);
    const rankedData = calculateRanks(filtered);
    setFilteredData(rankedData);
  };

  const calculateRanks = (students) => {
    let rank = 1;
    let e = 0;
    for (let i = 0; i < students.length; i++) {
      if (i > 0 && students[i].Cgpa === students[i - 1].Cgpa) e++;
      if (i > 0 && students[i].Cgpa < students[i - 1].Cgpa) {
        rank = i + 1 - e;
      }
      students[i].Rank = rank;
    }
    return students;
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Loading />
        </div>
      )}
      <Navbar search={search} setsearch={setsearch} disab= {true} />
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
                    <th className="table-header" style={{ width: "10%" }}>
                      SI No.
                    </th>
                    <th className="table-header">Regn No</th>
                    <th className="table-header">Name</th>
                    <th className="table-header">CGPA</th>
                    <th className="table-header">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData &&
                    filteredData.map((student, index) => (
                      <tr
                        key={student._id}
                        className={index % 2 === 0 ? "even-row" : "odd-row"}
                      >
                        <th className="table-cell">{index + 1}</th>
                        <Link to={`/result/${student.Regn}`} className="table-cell">
                          <td >{student.Regn}</td>
                        </Link>
                        <Link to={`/result/${student.Regn}` } className="table-cell">
                          <td >{student.Name}</td>
                        </Link>
                        <td
                          className="table-cell"
                          style={{
                            color:
                              student.Cgpa === 0 || !student.Cgpa ? "red" : "",
                          }}
                        >
                          {!student.Cgpa ? 0 : student.Cgpa}
                        </td>
                        <td className="table-cell">{student.Rank}</td>
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
