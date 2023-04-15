import { Nunito } from "next/font/google";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";
import RentModal from "./components/Modals/RentModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Next Airbnb App",
  description: "Next 13 + Tailwind Airbnb App Description",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar currentUser={currentUser} />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
