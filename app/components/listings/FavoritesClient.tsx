import { FC } from "react";

import { SafeListing, SafeUser } from "@/app/types";
import ListingCard from "@/app/components/listings/ListingCard";
import ListingsList from "./ListingsList";

interface IFavoritesClient {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: FC<IFavoritesClient> = ({ listings, currentUser }) => (
  <ListingsList title="Favorites" subtitle="List of places you favorited!">
    {listings.map((listing) => (
      <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
    ))}
  </ListingsList>
);

export default FavoritesClient;
