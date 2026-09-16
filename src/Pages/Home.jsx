import HeroSection from "../components/HeroSection/heroSection.jsx";
import Favor from "../components/Favor/Favor.jsx";
import Masters from "../components/Masters/Masters.jsx";
import Reviews from "../components/Reviews/Reviews.jsx";
import OurWorks from "../components/OurWorks/OurWorks.tsx";
import Product from "../components/Product/Prod.jsx";

const HomePage = (props) => {
  return (
    <>
      <HeroSection />
      <Favor favors={props.favors} />
      <Masters />
      <Reviews />
      <OurWorks works={props.works} />
      <Product />
    </>
  );
};
export default HomePage;
