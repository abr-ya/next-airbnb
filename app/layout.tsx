import { PropsWithChildren } from "react";
import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import getCurrentUser from "./actions/getCurrentUser";

import Navbar from "./components/Navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modals from "./components/Modals/Modals";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Next Airbnb App",
  description: "Next 13 + Tailwind Airbnb App Description",
};

const RootLayout = async ({ children }: PropsWithChildren) => {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <Modals />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
