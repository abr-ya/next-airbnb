import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import "react-toastify/dist/ReactToastify.css";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Next Airbnb App",
  description: "Next 13 + Tailwind Airbnb App Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <RegisterModal />
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
