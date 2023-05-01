"use client";

import dynamic from "next/dynamic";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { FC } from "react";
import { Pin } from "@prisma/client";
import useEditPinModal from "@/app/hooks/useEditPinModal";

const MapLeaflet = dynamic(() => import("../MapLeaflet"), {
  ssr: false,
});

interface IListingInfo {
  id: string;
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: { label: string; description: string } | undefined;
  locationValue: string;
  pin: Pin | null;
  isHost: boolean;
}

const ListingInfo: FC<IListingInfo> = ({
  id,
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
  pin,
  isHost,
}) => {
  const { getByValue } = useCountries();
  const editPinModal = useEditPinModal();

  const coordinates = pin ? [pin.lat, pin.lon] : getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && <ListingCategory label={category?.label} description={category?.description} />}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <MapLeaflet center={coordinates} zoom={pin ? 15 : 4} />
      {isHost && <div onClick={() => editPinModal.onOpen(id)}>Edit Pin</div>}
    </div>
  );
};

export default ListingInfo;
