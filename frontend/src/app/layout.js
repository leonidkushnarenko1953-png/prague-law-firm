import { Inter } from "next/font/google";
import "@/index.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "Emergent | Fullstack App",
  description: "A product of emergent.sh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="App">
            <Navbar />
            {children}
            <Footer />
            <Toaster position="top-right" />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
