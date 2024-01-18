import React, { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";
import { Account } from "../../types/Account";
import { SortField } from "../SortField";
import { filterData } from "../../filterData";
import { PaginatedList } from "../Pagination/Pagination";
import { useGetURLParams } from "../../getURLParams";

export const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentItems, setCurrentItems] = useState<Account[]>([]);

  useEffect(() => {
    fetch("/accounts.json")
      .then((response) => response.json())
      .then((data) => {
        setAccounts(data);
        setCurrentItems(data.slice(0, 5));
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const { filterParam, sortParam } = useGetURLParams();

  const filteredAccounts = useMemo(
    () => filterData(currentItems, filterParam, "accountId", sortParam),
    [currentItems, filterParam, sortParam]
  );

  return (
    <section className="container">
      <h2 className="text-center m-3">Accounts</h2>
      <SortField />

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">AuthToken</th>
            <th scope="col">CreationDate</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((account) => (
            <tr key={account.accountId}>
              <th scope="row">
                <Link
                  to={`/profiles/${account.accountId}`}
                  style={{ display: "contents" }}
                  className="text-dark"
                >
                  {account.accountId}
                </Link>
              </th>

              <td>
                <Link
                  to={`/profiles/${account.accountId}`}
                  style={{ display: "contents" }}
                  className="text-dark"
                >
                  {account.email}
                </Link>
              </td>
              <td>
                <Link
                  to={`/profiles/${account.accountId}`}
                  style={{ display: "contents" }}
                  className="text-dark"
                >
                  {account.authToken}
                </Link>
              </td>
              <td>
                <Link
                  to={`/profiles/${account.accountId}`}
                  style={{ display: "contents" }}
                  className="text-dark"
                >
                  {account.creationDate}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginatedList
        itemsPerPage={5}
        data={accounts}
        setCurrentItems={setCurrentItems}
      />
    </section>
  );
};
