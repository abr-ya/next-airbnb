import { FC, useMemo } from "react";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import categories from "@/app/data/categories";

interface IListingClient {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: FC<IListingClient> = ({ listing }) => {
  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  return (
    <div>
      {listing.title} - {category?.label}
    </div>
  );
};

export default ListingClient;
