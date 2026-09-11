import HeroSection from "../components/HeroSection/heroSection.jsx";
import Favor from "../components/Favor/Favor.jsx";
import Masters from "../components/Masters/Masters.jsx";
import Reviews from "../components/Reviews/Reviews.jsx";
import OurWorks from "../components/OurWorks/OurWorks.jsx";
import Product from "../components/Product/Product.jsx";

const HomePage = (props) => {
  return (
    <>
      <HeroSection />
      <Favor favors={props.favors} />
      <Masters masters={props.masters} />
      <Reviews />
      <OurWorks works={props.works} />
      <Product />
    </>
  );
};
export default HomePage;
