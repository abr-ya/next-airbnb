import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  console.log(request);

  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") throw new Error("Invalid ID");

  const body = await request.json();
  const { title, description, pin } = body;
  const data: any = {};

  if (title) data.title = title;
  if (description) data.description = description;
  if (pin) data.pin = pin;

  console.log(data);

  const updated = await prisma.listing.update({
    where: { id: listingId },
    data,
  });

  return NextResponse.json(updated);
}
