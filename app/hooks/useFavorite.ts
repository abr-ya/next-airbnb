import { useMemo, MouseEvent } from "react";
import { toast } from "react-toastify";

import { SafeUser } from "@/app/types";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log("toggleFavorite");
    toast.info("Add to favourite ==> coming soon!)");
  };

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
