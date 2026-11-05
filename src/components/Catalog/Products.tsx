import "./catalog.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Stack, TextField, Select, MenuItem } from "@mui/material";
import { useEffect } from "react";
import { Product } from "./IProduct.tsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setSearch, setSort } from "../../slices/ProductsSlice";

const Products = () => {
  const UserId = 1;
  const { t, i18n } = useTranslation();
  const [idSel, setId] = useState<number>(NaN);
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [price, setPrice] = useState(0);
  const [productsall, setProd] = useState<Product[]>([]);

  const [reload, setReload] = useState(0);
  const { search, sortBy } = useSelector((state: RootState) => state.catalProd);
  const dispatch = useDispatch<AppDispatch>();

  interface PropsRed {
    idSel: number;
    name: string;
    description: string;
    price: number;
  }

  useEffect(() => {
    const controller = new AbortController();
    async function getCat() {
      try {
        const res = await axios.get("http://localhost:5000/api/product", {
          params: {
            search,
            sortby: sortBy === "sort" ? "id" : sortBy,
            sortOrder: "ASC",
          },
          signal: controller.signal,
        });
        setProd(res.data.rows);
      } catch (error) {
        if (!axios.isCancel(error)) console.error(error);
      }
    }
    getCat();
    return () => controller.abort();
  }, [search, sortBy, reload]);
  async function deleteP(id: number) {
    await axios.delete(`http://localhost:5000/api/product/${id}`);
    setReload((prev) => prev + 1);
  }
  async function redactP({ idSel, name, description, price }: PropsRed) {
    await axios.patch(
      `http://localhost:5000/api/product/${idSel}`,
      { name, description, price },
    );
    setReload((prev) => prev + 1);
  }
  async function addCart(ProductId: number) {
    const res = await axios.post(`http://localhost:5000/api/cart`, {
      UserId,
      ProductId,
    });
    console.log(res.data);
    return res.data;
  }
  async function addFavourite(ProductId: number) {
    const res = await axios.post(`http://localhost:5000/api/favourite`, {
      UserId,
      ProductId,
    });
    return res.data;
  }

  return (
    <section className="container-for-catalog">
      <Stack sx={{ gap: "10px", flexDirection: "row" }}>
        <TextField
          placeholder={
            i18n.language == "ru" ? "Введите название" : "Input name"
          }
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "white",
              opacity: 0.7,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              borderWidth: "2px",
              borderRadius: "20px",
            },
          }}
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />

        <Select
          value={sortBy}
          sx={{
            color: "white",
            border: "2px solid white",
            borderRadius: "20px",
          }}
          onChange={(e) => dispatch(setSort(e.target.value))}
        >
          <MenuItem value="sort" disabled>
            {i18n.language == "ru" ? "Сортировка" : "Sort"}
          </MenuItem>
          <MenuItem value="price">
            {" "}
            {i18n.language == "ru" ? "По цене" : "On Cost"}
          </MenuItem>
          <MenuItem value="rating">
            {i18n.language == "ru" ? "По рейтинг" : "On Rate"}
          </MenuItem>
        </Select>
      </Stack>
      {productsall.map((product) => (
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
            <p className="item-first-card-mets">{product.name}</p>
          )}
          {product.id === idSel ? (
            <input
              type="text"
              className="item-first-card-mets1"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          ) : (
            <p className="item-first-card-mets1">{product.description}</p>
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
              <p className="itame-for-button-for-last3cardmets1">
                {product.price}
              </p>
            )}

            <div className="cont-redact">
              {product.id === idSel ? (
                <>
                  <span
                    onClick={() => {
                      deleteP(product.id);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    🗑️
                  </span>
                  <span
                    onClick={() => {
                      redactP({ idSel, name, description, price });
                      setId(NaN);
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
                      deleteP(product.id);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    🗑️
                  </span>
                  <span
                    onClick={() => {
                      setId(product.id);
                      setName(product.name);
                      setdescription(product.description);
                      setPrice(product.price);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    ✒️
                  </span>
                  <span
                    onClick={(e) => {
                      addCart(product.id);
                      alert("Товар добавлен в корзину");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    🛒
                  </span>
                  <span
                    onClick={(e) => {
                      addFavourite(product.id);
                      alert("Товар добавлен в избранное");
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
      ))}
    </section>
  );
};

export default Products;
