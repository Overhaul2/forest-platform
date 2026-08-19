import Hero from "./components/home/Hero";
import RecentSpecies from "./components/home/RecentSpecies";
import Statistics from "./components/home/Statistics";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";


export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative z-0">
        <Hero />
        <Statistics />
        <RecentSpecies />
      </main>
      <Footer />
    </>
  );
}