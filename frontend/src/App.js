import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

// Pages
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import TeamPage from "./pages/Team";
import BlogPage from "./pages/Blog";
import ContactPage from "./pages/Contact";
import BookingPage from "./pages/Booking";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <Toaster position="top-right" />
      </div>
    </LanguageProvider>
  );
}

export default App;
