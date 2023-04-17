import { FC, useMemo } from "react";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import categories from "@/app/data/categories";
import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

interface IListingClient {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: FC<IListingClient> = ({ listing, reservations = [], currentUser }) => {
  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  console.log(reservations, category);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">todo: ListingReservation</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
