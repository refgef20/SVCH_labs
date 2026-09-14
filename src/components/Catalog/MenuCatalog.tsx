import { useState, useEffect } from "react";
import "../Catalog/catalog.css";
import Products from "../Catalog/Products.tsx";
import { Product } from "./IProduct";

const MenuCatalog = () => {
  const [products, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchProd() {
      await fetch("../src/back/db.json")
        .then((res) => {
          console.log("2. Ответ получен, статус:", res.status);
          return res.json();
        })
        .then((data) => {
          console.log("УРА, ДАННЫЕ ПРИШЛИ:", data);
          setProduct(data.products);
        })

        .catch((err) => {
          console.error("4. ВОТ ОНА ОШИБКА:", err);
        });
    }
    fetchProd();
  }, []);
  return (
    <section className="container-for-catalog">
      <div className="container-for-catalog-cards">
        <Products products={products} />
      </div>
    </section>
  );
};
export default MenuCatalog;
