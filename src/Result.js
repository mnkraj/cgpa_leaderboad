import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loadings";
import { HiEye } from "react-icons/hi";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";
import "./App.css";

const Result = () => {
  const { regn } = useParams();
  const [selectedSem, setSelectedSem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState({
    name: "",
    regn: "",
    secret: "",
    semresults: [],
  });
  const [search, setsearch] = useState("");

  // Set to track fetched semesters
  const fetchedSems = new Set();

  const fetchData = () => {
    setLoading1(true);

    // Step 1: Fetch the token first
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_LINK_1}/api/v1/getindividualresult`,
        { regn, isaksingtoken: true }
      )
      .then((tokenResponse) => {
        if (!tokenResponse.data.success) {
          toast.error(`Result Portal Server Down OR Invalid Regn No: ${regn}`);
          throw new Error("Token fetch failed");
        }

        const { name, regn: regnNumber, token, secret } = tokenResponse.data;

        // Step 2: Set initial data (name, regn, secret)
        setData((prevData) => ({
          ...prevData,
          name,
          regn: regnNumber,
          secret,
        }));

        // Function to fetch semester results sequentially and update state
        const fetchSemester = (sem) => {
          if (fetchedSems.has(sem)) return Promise.resolve(); // Skip if already fetched

          fetchedSems.add(sem);
          return axios
            .post(
              `${process.env.REACT_APP_BACKEND_LINK_1}/api/v1/getsemresult`,
              { token, sem }
            )
            .then((semResponse) => {
              if (semResponse.data.success && semResponse.data.sgpa) {
                setData((prevData) => ({
                  ...prevData,
                  semresults: [
                    ...prevData.semresults,
                    {
                      sem: semResponse.data.sem,
                      sgpa: semResponse.data.sgpa,
                      cgpa: semResponse.data.cgpa,
                      Marksheet: semResponse.data.marksheet,
                    },
                  ].sort((a, b) => a.sem - b.sem), // Maintain correct order
                }));
              }
            })
            .catch((error) => {
              console.error(
                `Error fetching result for semester ${sem}:`,
                error
              );
            });
        };

        if (regn.includes("2022")) {
          // Fetch semesters 3 to 8 for 2022 batch
          fetchSemester(3)
            .then(() => fetchSemester(4))
            .then(() => fetchSemester(5))
            .then(() => fetchSemester(6))
            .finally(() => setLoading1(false));
        } else if (regn.includes("2023")) {
          fetchSemester(1)
            .then(() => fetchSemester(2))
            .then(() => fetchSemester(3))
            .then(() => fetchSemester(4))
            .finally(() => setLoading1(false));
        } else if (regn.includes("2024")) {
          fetchSemester(1)
            .then(() => fetchSemester(2))
            .finally(() => setLoading1(false));
        } else {
          fetchSemester(1)
            .then(() => fetchSemester(2))
            .then(() => fetchSemester(3))
            .then(() => fetchSemester(4))
            .then(() => fetchSemester(5))
            .then(() => fetchSemester(6))
            .then(() => fetchSemester(7))
            .then(() => fetchSemester(8))
            .finally(() => setLoading1(false));
        }
      })
      .catch((error) => {
        console.error("Error fetching token:", error);
        toast.error("Result portal link (outside campus) not working....");
        setLoading1(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [regn]);

  return (
    <div>
      {loading1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Loading />
        </div>
      )}
      <Navbar search={search} setsearch={setsearch} disab={false} />
      <section className="bg-gray-900" style={{ minHeight: "75vh" }}>
        {data.name && (
          <div className="w-full xl:w-8/12 px-4 mx-auto py-8 text-center">
            <h1 className="text-white text-3xl mb-4">{data.name}</h1>
            <h2 className="text-gray-400 text-xl mb-8">{data.regn}</h2>

            <div className="relative flex flex-col bg-white w-full mb-6 shadow-lg rounded">
              <div className="block w-full overflow-x-auto">
                {data.semresults.length > 0 && (
                  <table className="bg-transparent w-full border-collapse mx-auto">
                    <thead>
                      <tr>
                        <th className="table-header text-center">Semester</th>
                        <th className="table-header text-center">SGPA</th>
                        <th className="table-header text-center">CGPA</th>
                        <th className="table-header text-center">Marksheet</th>
                        <th className="table-header text-center">
                          Result Link
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.semresults.map((result, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "even-row" : "odd-row"}
                        >
                          <td className="table-cell" style={{ width: "0%" }}>
                            {result.sem}
                          </td>
                          <td className="table-cell">{result.sgpa}</td>
                          <td className="table-cell">{result.cgpa}</td>
                          <td
                            className="table-cell text-center"
                            style={{ width: "0%" }}
                          >
                            <button
                              className="flex justify-center items-center text-xl text-blue-500 hover:text-blue-600 mx-auto"
                              onClick={() => {
                                setSelectedSem(result.sem);
                                setShowModal(true);
                              }}
                            >
                              <HiEye />
                            </button>
                          </td>
                          <td
                            className="table-cell text-center"
                            style={{ width: "0%" }}
                          >
                            <a
                              href={`${process.env.REACT_APP_RESULT_LINK_1}${data.secret}${process.env.REACT_APP_RESULT_LINK_2}${result.sem}${process.env.REACT_APP_RESULT_LINK_3}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5"
                              download={`commanreport.pdf`}
                            >
                              Visit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Modal Popup */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#e5e7eb] p-8 rounded-lg shadow-xl w-full max-w-3xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-red-600"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="text-xl text-[#3B82F6] font-bold text-center mb-4">
              {data.regn}/Sem{selectedSem}
            </h3>

            <div
              className="rounded-xl border bg-white border-gray-300 shadow-inner overflow-auto max-h-[70vh] p-4 
             [&_table]:w-full 
             [&_table]:border 
             [&_table]:border-gray-400 
             [&_td]:border 
             [&_td]:border-gray-300 
             [&_td_table]:border-0 
    [&_td_table_td]:border-0 
             [&_td]:px-2 [&_td]:py-1 
             [&_th]:border [&_th]:border-gray-400 
             [&_th]:px-2 [&_th]:py-1"
              dangerouslySetInnerHTML={{
                __html: data.regn.includes("2022")
                  ? data.semresults[selectedSem - 3].Marksheet
                  : data.semresults[selectedSem - 1].Marksheet,
              }}
            ></div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Result;
