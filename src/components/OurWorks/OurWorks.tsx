import "../OurWorks/ourWorks.css";
import "../../index.css";
import { WorkItem } from "../../App";
import { useTranslation } from "react-i18next";

interface Works {
  works: WorkItem[];
}

const OurWorks = ({ works }: Works) => {
  const { t, i18n } = useTranslation();
  return (
    <section className="container-our-works">
      <div className="our-works">
        <p className="tittle-works">{t("main.our_works")}</p>
        <p className="inst">
          {t("main.instagram_more")}
          <span className="highlight"> instagram</span>
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
