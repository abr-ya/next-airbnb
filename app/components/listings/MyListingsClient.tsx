"use client";

import { FC, useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { SafeListing, SafeUser } from "@/app/types";
import { toast } from "react-toastify";
import { gridClasses } from "@/app/constants";

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
    <Container>
      <Heading title="My Listings" subtitle="Delete... Edit == coming soon!" />
      <div className={`${gridClasses} mt-10`}>
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
      </div>
    </Container>
  );
};

export default MyListingsClient;
