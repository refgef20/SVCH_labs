import "./catalog.css";
import { useState } from "react";
import { Stack, Button, TextField, Select, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Product } from "./IProduct";

interface ButtProp {
  OnsortRate: () => void;
  OnSortCost: () => void;
  OnFindName: (name: string) => void;
}

const Butt = ({ OnsortRate, OnSortCost, OnFindName }: ButtProp) => {
  const [value, setValue] = useState("sort");

  return (
    <Stack sx={{ gap: "10px", flexDirection: "row" }}>
      <TextField
        placeholder="Введите название"
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
          OnFindName(next);
        }}
      />

      <Select
        value={value}
        sx={{ color: "white", border: "2px solid white", borderRadius: "20px" }}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value == "price") {
            OnSortCost();
          } else if (e.target.value == "rate") {
            OnsortRate();
          }
        }}
      >
        <MenuItem value="sort" disabled>
          Сортировка
        </MenuItem>
        <MenuItem value="price">По цене</MenuItem>
        <MenuItem value="rate">По рейтингу</MenuItem>
      </Select>
    </Stack>
  );
};
export default Butt;
