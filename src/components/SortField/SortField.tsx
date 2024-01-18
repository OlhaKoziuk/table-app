import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
// import { Dropdown, DropdownButton, DropdownItem } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";

export const SortField: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState("Asc");
 
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const handleSelect = (eventKey: string | null) => {
      if (eventKey) {
        setSelectedOption(eventKey);
      }
    };
  
  type SearchParams = {
    [key: string]: string | string[] | null;
  };

  function getSearchWith(
    currentParams: URLSearchParams,
    paramsToUpdate: SearchParams
  ): string {
    const newParams = new URLSearchParams(currentParams.toString());

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);

        value.forEach((part) => {
          newParams.append(key, part);
        });
      } else {
        newParams.set(key, value);
      }
    });

    return newParams.toString();
  };

  const handleFilterChange = (filterValue: string) => {
   setQuery(filterValue);
  const currentParams = new URLSearchParams(searchParams.toString());
  const updatedParams = getSearchWith(currentParams, { filter: filterValue });
  if (filterValue) {
    navigate(`?${updatedParams}`);
  } else {
    navigate(".");
  }
  };
  
    const handleSortChange = (sortValue: string) => {
     
      const currentParams = new URLSearchParams(searchParams.toString());
      const updatedParams = getSearchWith(currentParams, {
        sort: sortValue,
      });
      if (sortValue) {
        navigate(`?${updatedParams}`);
      } else {
        navigate(".");
      }
    };

  return (
    <div className="d-flex" style={{ gap: "10px" }}>
      <Dropdown
        className="mr-3"
        onSelect={(eventKey) => {
          if (typeof eventKey === "string") {
            handleSortChange(eventKey);
          }
        }}
      >
        <DropdownButton title={selectedOption} onSelect={handleSelect}>
          <DropdownItem eventKey="Asc">Asc</DropdownItem>
          <DropdownItem eventKey="Desc">Desc</DropdownItem>
        </DropdownButton>
      </Dropdown>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter filter params..."
          value={query}
          onChange={(e) => handleFilterChange(e.target.value)}
        />
      </div>
    </div>
  );
};