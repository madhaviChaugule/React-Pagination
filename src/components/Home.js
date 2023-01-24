import React, { useState, useEffect } from "react";
import { getData, columns, formatRowData } from "./data";
import Table from "./Table";
import Pagination from "./Pagination";

const HomePage = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalPassengers: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));
    getData(currentPage,limit).then((info) => {
      const { totalPages, totalPassengers, data } = info;
      setPageData({
        isLoading: false,
        rowData: formatRowData(data),
        totalPages,
        totalPassengers: 100,
      });
    });
  }, [currentPage]);
  return (
    <div>
      <p>Total Passengers: {pageData.totalPassengers || "Loading..."}</p>
      <div style={{ height: "600px" }}>
        <Table
          columns={columns}
          data={pageData.rowData}
          isLoading={pageData.isLoading}
        />
      </div>
      <Pagination
        totalRows={pageData.totalPassengers}
        pageChangeHandler={setCurrentPage}
        rowsPerPage={limit}
      />
    </div>
  );
};

export default HomePage;
