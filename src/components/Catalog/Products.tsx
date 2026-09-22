import "./catalog.css";
import { useState } from "react";
import { ProdProps } from "./ProdProps";

const Products = ({
  products,
  onDelete,
  onRedact,
  add,
  addFav,
  idSel,
  onSave,
}: ProdProps) => {
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
                  onDelete(product.id);
                }}
                style={{ cursor: "pointer" }}
              >
                🗑️
              </span>
              <span
                onClick={() => {
                  onSave(idSel, name, description, price);
                  onRedact(null);
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
                  onDelete(product.id);
                }}
                style={{ cursor: "pointer" }}
              >
                🗑️
              </span>
              <span
                onClick={() => {
                  onRedact(product.id);
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
                  add(product);
                }}
                style={{ cursor: "pointer" }}
              >
                🛒
              </span>
              <span
                onClick={(e) => {
                  addFav(product);
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
