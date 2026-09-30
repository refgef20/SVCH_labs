import "./catalog.css";
import { useState } from "react";
import { ProdProps } from "./ProdProps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  deleteProduct,
  saveRedactProd,
  redactProduct,
} from "../../slices/ProductsSlice";
import { addProdCart } from "../../slices/CartsSlice";
import { addFav } from "../../slices/FavouriteSlice";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t, i18n } = useTranslation();
  const [idSel, setId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.catalProd.items);
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [price, setPrice] = useState(0);
  return products.map((product) => (
    <div key={product.id} className="container-for-every-card-mets">
      <img className="img-prod" src={product.photo} alt="" />
      {product.id == idSel ? (
        <input
          type="text"
          value={name}
          className="item-first-card-mets"
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <p className="item-first-card-mets">{product.name_en}</p>
      )}
      {product.id === idSel ? (
        <input
          type="text"
          className="item-first-card-mets1"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
      ) : (
        <p className="item-first-card-mets1">{product.description_en}</p>
      )}

      <div className="container-for-button-catalog">
        {product.id === idSel ? (
          <input
            type="text"
            value={price}
            className="itame-for-button-for-last3cardmets1s"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        ) : (
          <p className="itame-for-button-for-last3cardmets1">{product.price}</p>
        )}

        <div className="cont-redact">
          {product.id === idSel ? (
            <>
              <span
                onClick={() => {
                  // onDelete(product.id);
                  dispatch(deleteProduct(product.id));
                }}
                style={{ cursor: "pointer" }}
              >
                🗑️
              </span>
              <span
                onClick={() => {
                  // onSave(idSel, name, description, price);
                  // onRedact(null);
                  dispatch(saveRedactProd({ idSel, name, description, price }));
                  //
                  setId(null);
                }}
                style={{ cursor: "pointer" }}
              >
                ✔️
              </span>
            </>
          ) : (
            <>
              <span
                onClick={() => {
                  // onDelete(product.id);
                  dispatch(deleteProduct(product.id));
                }}
                style={{ cursor: "pointer" }}
              >
                🗑️
              </span>
              <span
                onClick={() => {
                  // onRedact(product.id);
                  setId(product.id);
                  setName(product.name_en);
                  setdescription(product.description_en);
                  setPrice(product.price);
                }}
                style={{ cursor: "pointer" }}
              >
                ✒️
              </span>
              <span
                onClick={(e) => {
                  // add(product);
                  dispatch(addProdCart(product));
                }}
                style={{ cursor: "pointer" }}
              >
                🛒
              </span>
              <span
                onClick={(e) => {
                  dispatch(addFav(product));
                }}
                style={{ cursor: "pointer" }}
              >
                ❤️
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  ));
};

export default Products;
