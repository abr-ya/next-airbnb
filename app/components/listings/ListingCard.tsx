import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { FC } from "react";

interface IListingCard {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: FC<IListingCard> = ({ data: { title } }) => {
  return <div>{title}</div>;
};

export default ListingCard;
