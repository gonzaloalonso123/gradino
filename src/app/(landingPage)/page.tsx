import About from "./about/page";
import Contact from "./contact/page";
import Gallery from "./gallery/page";
import Hero from "./hero/page";
import Menu from "./menu/page";

export default () => {
  return (
    <div>
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Contact />
    </div>
  );
};
