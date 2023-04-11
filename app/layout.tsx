import { Nunito } from "next/font/google";
import "./globals.css";

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
      <body className={font.className}>{children}</body>
    </html>
  );
}
