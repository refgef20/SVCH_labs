import "../Reviews/reviews.css";
import "../../index.css";
import { useTranslation } from "react-i18next";

const Reviews = () => {
  const { t, i18n } = useTranslation();
  return (
    <section className="container-for-review">
      <div className="review-clients">
        <div className="container-for-review-with-title">
          <p className="tittle-review">{t("main.clients_feedback")}</p>
          <div className="container-cards-review">
            <img src="src\assets\images\review1.jpg" alt="" />
            <img src="src\assets\images\review2.jpg" alt="" />
            <img src="src\assets\images\review3.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
