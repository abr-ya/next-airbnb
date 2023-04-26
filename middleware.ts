export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/trips", "/reservations", "/listings/my", "/listings/favorites"],
};
