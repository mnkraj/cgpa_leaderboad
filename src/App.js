import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loadings";
import Navbar from "./Navbar";
import Footer from "./Footer";
const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(false);
  const [search,setsearch] = useState("")


  useEffect(() => {
    setLoading(true);
    axios
      .get("https://cgpa-server.vercel.app/api/v1/getresults")
      .then((response) => {
        let res = response.data;
        res.sort((a, b) => b.Cgpa - a.Cgpa);
        res = calculateRanks(res)
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
  }, [year, branch]);
  useEffect(() => {
    const filterData = () => {
      let filtered = data.filter((student) =>
        student.Regn.includes(search)
      );
      filtered.sort((a, b) => b.Cgpa - a.Cgpa);
      const rankedData = calculateRanks(filtered);
      setFilteredData(rankedData);
    };

    filterData();
  }, [search, data]);
  const filterData = () => {
    // setLoading(true);
    let filtered = data;
    if (year) {
      filtered = filtered.filter((student) => student.Regn.startsWith(year));
    }
    if (branch) {
      filtered = filtered.filter((student) => student.Regn.includes(branch));
    }
    filtered.sort((a, b) => b.Cgpa - a.Cgpa);
    const rankedData = calculateRanks(filtered);
    setFilteredData(rankedData);
    // setLoading(false);
  };

  const calculateRanks = (students) => {
    let rank = 1;
    let e=0;
    for (let i = 0; i < students.length; i++) {
      if (i > 0 && students[i].Cgpa == students[i - 1].Cgpa) e++;
      if (i > 0 && students[i].Cgpa < students[i - 1].Cgpa) {
        rank = i+1 - e;
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
      <Navbar search={search}  setsearch={setBranch} />
      {(
        <section className="bg-gray-900" style={{minHeight : "73vh"}}>
          <div className="w-full xl:w-8/12 xl:mb-0 px-4 mx-auto" style={{paddingTop : "10px" , paddingBottom : "20px"}}>
            <div className="flex justify-between mb-4">
              <select
                className="px-4 py-2 border rounded"
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
                className="px-4 py-2 border rounded"
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
                      <th
                        className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                        style={{ width: "10%" }}
                      >
                        SI No.
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Regn No
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Name
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        CGPA
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Rank
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData && filteredData.map((student, index) => (
                      <tr key={student._id}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {student.Regn}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {student.Name}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {student.Cgpa}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
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
      )}

      <Footer />
    </div>
  );
};

export default App;
