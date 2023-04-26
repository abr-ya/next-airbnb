"use client";

import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

import ListingCard from "@/app/components/listings/ListingCard";
import { SafeListing, SafeUser } from "@/app/types";
import ListingsList from "./ListingsList";

interface IMyListingsClient {
  listings: SafeListing[];
  user?: SafeUser | null;
}

const MyListingsClient: FC<IMyListingsClient> = ({ listings, user }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      console.log("delete:", id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router],
  );

  return (
    <ListingsList title="My Listings" subtitle="Edit => coming soon!">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          data={listing}
          actionId={listing.id}
          onAction={onDelete}
          disabled={deletingId === listing.id}
          actionLabel="Delete listing"
          currentUser={user}
        />
      ))}
    </ListingsList>
  );
};

export default MyListingsClient;
