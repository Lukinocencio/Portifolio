import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </>
  );
}
