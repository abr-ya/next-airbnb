import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<Reservation, "createdAt" | "startDate" | "endDate" | "listing"> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

// not used now
export interface SearchParams {
  locationValue?: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  startDate?: string;
  endDate?: string;
}

export interface ICoord {
  lat: number;
  lng: number;
}
