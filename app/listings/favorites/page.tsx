import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "@/app/components/listings/FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = [];

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings." />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient />
    </ClientOnly>
  );
};

export default FavoritesPage;
