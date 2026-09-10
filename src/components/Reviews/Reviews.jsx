import "../Reviews/reviews.css";

const Reviews = () => {
  return (
    <section className="container-for-review">
      <div className="review-clients">
        <div className="container-for-review-with-title">
          <p className="tittle-review" data-i18n="main.clients_feedback">
            Отзывы клиентов
          </p>
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
