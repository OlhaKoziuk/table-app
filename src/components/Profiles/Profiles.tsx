import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Profile } from "../../types/Profile";
import { SortField } from "../SortField";
import { filterData } from "../../filterData";
import { PaginatedList } from "../Pagination";
import { useGetURLParams } from "../../getURLParams";

export const Profiles: React.FC = () => {
  const [currentProfiles, setCurrentProfiles] = useState<Profile[]>([]);
  const [currentItems, setCurrentItems] = useState<Profile[]>([]);
  const { accountId } = useParams();

  useEffect(() => {
    fetch("/profiles.json")
      .then((response) => response.json())
      .then((data) => {
        if (accountId) {
          const profiles = data.filter(
            (profile: Profile) => profile.accountId === +accountId
          );
          setCurrentProfiles(profiles);
          setCurrentItems(profiles.slice(0, 4));
        }
      })
      .catch((error) => console.error("Error loading data:", error));
  }, [accountId]);

 const { filterParam, sortParam } = useGetURLParams();

  const filteredProfiles = useMemo(
    () => filterData(currentItems, filterParam, "profileId", sortParam),
    [currentItems, filterParam, sortParam]
  );

  return (
    <section className="container">
      <h2 className="text-center m-3">{`Profiles for account ${accountId}`}</h2>
      <SortField />

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Country</th>
            <th scope="col">Marketplace</th>
          </tr>
        </thead>
        <tbody>
          {filteredProfiles.map((profile) => (
            <tr key={profile.profileId}>
              <th scope="row">
                <Link
                  to={`/campaigns/:${profile.profileId}`}
                  style={{ display: "contents" }}
                  className="text-dark"
                >
                  {profile.profileId}
                </Link>
              </th>
              <td>
                <Link
                  to={`/campaigns/:${profile.profileId}`}
                  style={{ display: "contents" }}
                  className="text-dark"
                >
                  {profile.country}
                </Link>
              </td>
              <td>
                <Link
                  to={`/campaigns/:${profile.profileId}`}
                  style={{ display: "contents" }}
                  className="text-dark"
                >
                  {profile.marketplace}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginatedList
        itemsPerPage={4}
        data={currentProfiles}
        setCurrentItems={setCurrentItems}
      />
    </section>
  );
};
