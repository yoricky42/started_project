import { Inter } from "next/font/google";
import "../../public/assets/css/base.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bienvenu chez Nahyel",
  description: "Nahyel est un site...",
};

export default function ({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
