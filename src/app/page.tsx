import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Properties from "@/components/Properties";
import Neighborhoods from "@/components/Neighborhoods";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Properties />
        <Neighborhoods />
        <Testimonials />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
