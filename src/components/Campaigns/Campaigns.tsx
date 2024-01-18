import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { SortField } from "../SortField";
import { filterData } from "../../filterData";
import { PaginatedList } from "../Pagination";
import { Campaign } from "../../types/Campaign";
import { Campaings } from "../../types/Campaings";
import { useGetURLParams } from "../../getURLParams";

export const Campaigns: React.FC = () => {
  const [currentCampaigns, setCurrentCampaigns] = useState<Campaign[]>([]);
  const [currentItems, setCurrentItems] = useState<Campaign[]>([]);
  const { profileId } = useParams();

  useEffect(() => {
    fetch("/campaign.json")
      .then((response) => response.json())
      .then((data) => {
        if (profileId) {
          const campaigns = data.filter(
            (item: Campaings) => item.profileId === +profileId.substring(1)
          );

          setCurrentCampaigns(campaigns[0].campaigns);
          setCurrentItems(campaigns[0].campaigns.slice(0, 3));
        }
      })
      .catch((error) => console.error("Error loading data:", error));
  }, [profileId]);

  const { filterParam, sortParam } = useGetURLParams();

  const filteredCampaings = useMemo(
    () => filterData(currentItems, filterParam, "campaignId", sortParam),
    [currentItems, filterParam, sortParam]
  );

  return (
    <section className="container">
      <h2 className="text-center m-3">
        {`Campaings for profile ${profileId?.substring(1)}`}
      </h2>
      <SortField />

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Clicks</th>
            <th scope="col">Cost</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredCampaings.map((campaign) => (
            <tr key={campaign.campaignId}>
              <th scope="row">{campaign.campaignId}</th>
              <td>{campaign.clicks}</td>
              <td>{campaign.cost}</td>
              <td>{campaign.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginatedList
        itemsPerPage={3}
        data={currentCampaigns}
        setCurrentItems={setCurrentItems}
      />
    </section>
  );
};
