"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "@/app/types";
import { FC } from "react";
import useFavorite from "@/app/hooks/useFavorite";

interface ILikeButton {
  listingId: string;
  currentUser?: SafeUser | null;
}

const LikeButton: FC<ILikeButton> = (props) => {
  const { hasFavorited, toggleFavorite } = useFavorite(props);

  return (
    <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
      <AiFillHeart size={24} className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"} />
    </div>
  );
};

export default LikeButton;
