import { useState, useEffect } from "react";
import "../Catalog/catalog.css";
import Products from "../Catalog/Products.tsx";
import { Product } from "./IProduct";
import Butt from "./FunctionalButtons.tsx";
import { Catal } from "../../App.tsx";

const MenuCatalog = ({ add, addFav }: Catal) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
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
          setAllProducts(data.products);
        })

        .catch((err) => {
          console.error("4. ВОТ ОНА ОШИБКА:", err);
        });
    }
    fetchProd();
  }, []);
  function Delete(id: number) {
    console.log("Родитель услышал клик! Удаляем ID:", id);
    setAllProducts(products.filter((product) => product.id != id));
  }
  function Redact(id: number | null) {
    setId(id);
  }

  function Save(id: number, name: string, description: string, price: number) {
    setAllProducts(
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
  function FindName(name: string) {
    console.log("Данные здесь");

    if (name == "") {
      setAllProducts(products);
      return;
    }
    console.log(name);
    const filtered = allProducts.filter((product) =>
      product.name_en.toLowerCase().startsWith(name.toLowerCase()),
    );

    setAllProducts(filtered);
  }
  function SortRate() {
    console.log("Я ЗДЕСЬ Р");
    setAllProducts(products.toSorted((a, b) => a.rating - b.rating));
  }
  function SortPrice() {
    console.log("Я ЗДЕСЬ ц");
    setAllProducts(products.toSorted((a, b) => a.price - b.price));
  }
  return (
    <section className="container-for-catalog">
      <Butt
        OnsortRate={SortRate}
        OnSortCost={SortPrice}
        OnFindName={FindName}
      />
      <div className="container-for-catalog-cards">
        <Products
          products={allProducts}
          onDelete={Delete}
          onRedact={Redact}
          onSave={Save}
          add={add}
          addFav={addFav}
          idSel={idSel}
        />
      </div>
    </section>
  );
};
export default MenuCatalog;
