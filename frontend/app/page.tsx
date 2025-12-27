import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Features from "./components/Features";
import TopColleges from "./components/TopColleges";
import TopCourses from "./components/TopCourses";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Features />
      <TopColleges />
      <TopCourses />
      <CTA />
      <Footer />
    </main>
  );
}

