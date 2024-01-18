export const filterData = (
  data: any[],
  query: string,
  sortKey: string,
  sortOrder = "Asc"
) => {
  const filteredData = data.filter((item) => {
    const preparedQuery = query.toLowerCase();

    return Object.values(item).some((value) => {
      if (typeof value === "string" || typeof value === "number") {
        return String(value).toLowerCase().includes(preparedQuery);
      }
      return false;
    });
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === "Asc" || !sortOrder) {
      return a[sortKey] - b[sortKey];
    } else {
      return b[sortKey] - a[sortKey];
    }
  });

  return sortedData;
};