import { useState, useEffect } from "react";
import "../Catalog/catalog.css";
import Products from "../Catalog/Products.tsx";
import { Product } from "./IProduct";

const MenuCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [idSel, setId] = useState<number | null>(null);
  useEffect(() => {
    async function fetchProd() {
      await fetch("../src/back/db.json")
        .then((res) => {
          console.log("2. Ответ получен, статус:", res.status);
          return res.json();
        })
        .then((data) => {
          console.log("УРА, ДАННЫЕ ПРИШЛИ:", data);
          setProducts(data.products);
        })

        .catch((err) => {
          console.error("4. ВОТ ОНА ОШИБКА:", err);
        });
    }
    fetchProd();
  }, []);
  function Delete(id: number) {
    console.log("Родитель услышал клик! Удаляем ID:", id);
    setProducts(products.filter((product) => product.id != id));
  }
  function Redact(id: number | null) {
    setId(id);
  }

  function Save(id: number, name: string, description: string, price: number) {
    setProducts(
      products.map((product) =>
        product.id == id
          ? {
              ...product,
              name_en: name,
              description_en: description,
              price: price,
            }
          : product,
      ),
    );
  }
  return (
    <section className="container-for-catalog">
      <div className="container-for-catalog-cards">
        <Products
          products={products}
          onDelete={Delete}
          onRedact={Redact}
          onSave={Save}
          idSel={idSel}
        />
      </div>
    </section>
  );
};
export default MenuCatalog;
