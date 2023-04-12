import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modals/Modal";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Next Airbnb App",
  description: "Next 13 + Tailwind Airbnb App Description",
};

const tempHandler = () => {
  console.log("click!");
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <Modal isOpen title="Hello, Modal!" actionLabel="Click Me!))" />
        {children}
      </body>
    </html>
  );
}
