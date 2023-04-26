"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "@/app/types";
import { FC } from "react";
import useLike from "@/app/hooks/useLike";

interface ILikeButton {
  listingId: string;
  currentUser?: SafeUser | null;
}

const LikeButton: FC<ILikeButton> = (props) => {
  const { hasLiked, toggleLike } = useLike(props);

  return (
    <div onClick={toggleLike} className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
      <AiFillHeart size={24} className={hasLiked ? "fill-rose-500" : "fill-neutral-500/70"} />
    </div>
  );
};

export default LikeButton;
