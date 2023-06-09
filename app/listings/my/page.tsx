import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import MyListingsClient from "@/app/components/listings/MyListingsClient";

const MyListingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No properties found" subtitle="Looks like you have no properties." />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <MyListingsClient listings={listings} user={currentUser} />
    </ClientOnly>
  );
};

export default MyListingsPage;
