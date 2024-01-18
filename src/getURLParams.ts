import { useLocation } from "react-router-dom";

export const useGetURLParams = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const filterParam = urlParams.get("filter") || "";
  const sortParam = urlParams.get("sort") || "";

  return {
    filterParam,
    sortParam,
  };
};