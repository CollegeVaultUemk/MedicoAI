import About from "./About";
import Hero from "./Hero";

const Home = () => {
  return (
    <div>
      <div className="relative z-0">
        <Hero />
      </div>
      <div id="about" className="relative z-10 -mt-5">
        <About />
      </div>
    </div>
  );
};

export default Home;
