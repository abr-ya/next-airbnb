import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import ListingClient from "@/app/components/listings/ListingClient";
import { Metadata } from "next";
import { ResolvingMetadata } from "next/dist/lib/metadata/types/metadata-interface";

interface IParams {
  listingId?: string;
}

export const generateMetadata = async ({ params }: { params: IParams }): Promise<Metadata> => {
  const listing = await getListingById(params);

  return {
    title: `${listing?.title} | Next Airbnb App`,
    description: `Nice place hosted by ${listing?.user}`,
  };
};

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <div>
      <ClientOnly>
        <ListingClient listing={listing} reservations={reservations} currentUser={currentUser} />
      </ClientOnly>
    </div>
  );
};

export default ListingPage;
