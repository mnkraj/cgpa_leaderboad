import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loadings";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";
import "./App.css";

const Result = () => {
  const { regn } = useParams();
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState({
    name: "",
    regn: "",
    secret: "",
    semresults: [],
  });
  const [search, setsearch] = useState("");
  const handleButtonClick = (secret , sem) => {
    const url = `${process.env.REACT_APP_RESULT_LINK_1}${secret}${process.env.REACT_APP_RESULT_LINK_2}${sem}${process.env.REACT_APP_RESULT_LINK_3}`;
    const link = document.createElement('a');
        link.href = url;
        link.download = `${sem}_${regn}.pdf`; // Set the download attribute with a default filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
};

  const fetchData = async () => {
    setLoading1(true);

    try {
      const response = await axios.post(
        "https://cgpa-server.onrender.com/api/v1/getindividualresult",
        { regn }
      );
      // toast.remove()

      // console.log(response.data)
      if (!response.data.success) {
        toast.error(`Inavlid Regn no ${regn}`);
        return;
      }
      // toast.success(`Result Fetched Successfully`);
      setData(response.data);
    } catch (error) {
      // toast.remove()
      // toast.error(`Error fetching data: ${error.message}`);
      console.error("Error fetching data:", error);
    } finally {
      // toast.remove()
      setLoading1(false);
    }
  };

  useEffect(() => {
    // toast.loading(`Fetching Result for ${regn}`);
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
        {data.semresults.length > 0 && (
          <div
            className="w-full xl:w-8/12 xl:mb-0 px-4 mx-auto"
            style={{
              paddingTop: "10px",
              paddingBottom: "20px",
              textAlign: "center",
            }}
          >
            <h1 className="items-center text-white text-3xl mb-4">
              {data.name}
            </h1>
            <h2 className="items-center text-gray-400 text-xl mb-8">
              {data.regn}
            </h2>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="block w-full overflow-x-auto">
                <table className="bg-transparent w-full border-collapse mx-auto">
                  <thead className="items-center">
                    <tr>
                      <th className="table-header text-center">Semester</th>
                      <th className="table-header text-center">SGPA</th>
                      <th className="table-header text-center">CGPA</th>
                      <th className="table-header text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.semresults.map((result, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "even-row" : "odd-row"}
                      >
                        <td className="table-cell">{result.sem}</td>
                        <td className="table-cell">{result.sgpa}</td>
                        <td className="table-cell">{result.cgpa}</td>
                        <td className="table-cell items-center text-center">
                          <button
                            className="btn btn-primary items-center text-blue-500 underline text-center"
                            onClick={() => handleButtonClick(`${data.secret}`,`${result.sem}`)}
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Result;
