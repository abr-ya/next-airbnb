import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import "react-toastify/dist/ReactToastify.css";
import LoginModal from "./components/Modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

const font = Nunito({
  subsets: ["latin"],
});

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
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
