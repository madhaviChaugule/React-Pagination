export const columns = [
  {
    Header: "Passenger name",
    accessor: "name",
  },
  {
    Header: "Total trips",
    accessor: "trips",
  },
];

export const formatRowData = (rawData) =>
  rawData.map((info) => ({
    name: info.name,
    trips: info.trips,
  }));

export const getData = async (pageNo = 1, limit = 10) => {
  const response = await fetch(
    `https://api.instantwebtools.net/v1/passenger?page=${pageNo}&size=${limit}`
  );
  return await response.json();
};
