import "../OurWorks/ourWorks.css";
import "../../index.css";

const OurWorks = ({ works }) => {
  return (
    <section className="container-our-works">
      <div className="our-works">
        <p className="tittle-works" data-i18n="main.our_works">
          Наши Работы
        </p>
        <p className="inst" data-i18n="main.instagram_more">
          - Больше работ у нас в<span className="highlight"> instagram</span>
        </p>
        <div className="our-works-ex">
          {works.map((work) => (
            <img key={work.photo} src={work.photo} alt="" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWorks;
