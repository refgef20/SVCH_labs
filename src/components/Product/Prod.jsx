import "../Product/Product.css";
import "../../index.css";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";

const Product = () => {
  const { t, i18n } = useTranslation();
  return (
    <section className="container-product">
      <div className="card-tin">
        <div className="card-product">
          <div className="product-buttons">
            <div className="product-name-description">
              <p className="tittle-product">{t("main.products")}</p>
              <p className="description-product">{t("main.products_desc")}</p>
            </div>
            <div className="buttons-buy">
              <button
                className="button-ozon item-buy"
                data-i18n="main.buy_ozon"
              >
                {t("main.buy_ozon")}
              </button>
              <button className="button-wild item-buy">
                {t("main.buy_wb")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
