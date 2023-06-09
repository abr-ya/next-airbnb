"use client";

import { FC, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import useCreateModal from "@/app/hooks/useCreateModal";

interface IUserMenu {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<IUserMenu> = ({ currentUser }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const createModal = useCreateModal();

  const onCreate = () => {
    const modal = currentUser ? createModal : loginModal;
    modal.onOpen();
  };

  const renderGuestMenu = () => (
    <>
      <MenuItem onClick={loginModal.onOpen} label="Login" />
      <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
    </>
  );

  const renderUserMenu = () => (
    <>
      <MenuItem label="Home Page" onClick={() => router.push("/")} />
      <hr />
      <MenuItem label="My favorites" onClick={() => router.push("/listings/favorites")} />
      <MenuItem label="My trips" onClick={() => router.push("/trips")} />
      <MenuItem label="Create new listing" onClick={createModal.onOpen} />
      <MenuItem label="My listings" onClick={() => router.push("/listings/my")} />
      <MenuItem label="My reservations" onClick={() => router.push("/reservations")} />
      <hr />
      <MenuItem label="Logout" onClick={() => signOut()} />
    </>
  );

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onCreate}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 
          flex flex-row items-center gap-3 
          rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer" onClick={toggleOpen}>
            {currentUser ? renderUserMenu() : renderGuestMenu()}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
