import { useCallback, useMemo, MouseEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseLike {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useLike = ({ listingId, currentUser }: IUseLike) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleLike = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();

      try {
        const method = hasLiked ? "delete" : "post";
        const request = () => axios[method](`/api/like/${listingId}`);
        await request();
        router.refresh();
        toast.success(`Success ${hasLiked ? "disliked!(" : "liked!)"}`);
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasLiked, listingId, loginModal, router],
  );

  return { hasLiked, toggleLike };
};

export default useLike;
