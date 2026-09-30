import "./catalog.css";
import { useState } from "react";
import { Stack, Button, TextField, Select, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Product } from "./IProduct";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  sortPriceProduct,
  sortRatingProduct,
  findProduct,
} from "../../slices/ProductsSlice";
import { useTranslation } from "react-i18next";

// interface ButtProp {
//   OnsortRate: () => void;
//   OnSortCost: () => void;
//   OnFindName: (name: string) => void;
// }

const Butt = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [value, setValue] = useState("sort");

  return (
    <Stack sx={{ gap: "10px", flexDirection: "row" }}>
      <TextField
        placeholder={i18n.language == "ru" ? "Введите название" : "Input name"}
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
        onChange={(e) => {
          const next = e.target.value;
          // OnFindName(next);
          dispatch(findProduct(next));
        }}
      />

      <Select
        value={value}
        sx={{ color: "white", border: "2px solid white", borderRadius: "20px" }}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value == "price") {
            // OnSortCost();
            dispatch(sortPriceProduct());
          } else if (e.target.value == "rate") {
            dispatch(sortRatingProduct());
          }
        }}
      >
        <MenuItem value="sort" disabled>
          {i18n.language == "ru" ? "Сортировка" : "Sort"}
        </MenuItem>
        <MenuItem value="price">
          {" "}
          {i18n.language == "ru" ? "По цене" : "On Cost"}
        </MenuItem>
        <MenuItem value="rate">
          {i18n.language == "ru" ? "По рейтинг" : "On Rate"}
        </MenuItem>
      </Select>
    </Stack>
  );
};
export default Butt;
