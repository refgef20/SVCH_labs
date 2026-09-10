import "../Product/Product.css";

const Product = () => {
  return (
    <section className="container-product">
      <div className="card-tin">
        <div className="card-product">
          <div className="product-buttons">
            <div className="product-name-description">
              <p className="tittle-product" data-i18n="main.products">
                Продукция
              </p>
              <p className="description-product" data-i18n="main.products_desc">
                На сколько Вы готовы к переменам? Измените свой цвет волос за 15
                мин! Тонирующая маска для волос Annetka.hair с кератином,
                витамином Е, пчелиным воском изготавливается из органической
                профессиональной продукции Insight и подбирается индивидуально.
                Результат - идеально ровный цвет, гладкие, плотные и блестящие
                волосы без утяжеления! Тонирующая маска для блондинок с
                вариантами оттенков цвета блонд: пепельный, серебристый,
                стальной, розовый.
              </p>
            </div>
            <div className="buttons-buy">
              <button
                className="button-ozon item-buy"
                data-i18n="main.buy_ozon"
              >
                Купить на ozon
              </button>
              <button className="button-wild item-buy" data-i18n="main.buy_wb">
                купить на wildberries
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
