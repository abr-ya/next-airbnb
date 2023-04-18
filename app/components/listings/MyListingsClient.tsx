"use client";

import { SafeListing, SafeUser } from "@/app/types";
import { FC } from "react";

interface IMyListingsClient {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const MyListingsClient: FC<IMyListingsClient> = ({ listings }) => {
  console.log(listings);

  return <div>My Listings ({listings.length}) === Coming soon...</div>;
};

export default MyListingsClient;
