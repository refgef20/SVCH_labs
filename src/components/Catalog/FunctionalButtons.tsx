import "./catalog.css";
import { useState } from "react";
import { Stack, Button, TextField, Select, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Product } from "./IProduct";

interface ButtProp {
  OnsortName: () => void;
  OnSortCost: () => void;
  OnFindName: (name: string) => void;
}

const Butt = ({ OnsortName, OnSortCost, OnFindName }: ButtProp) => {
  const [query, setQuery] = useState("");

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
          setQuery(next);
          OnFindName(next);
        }}
      />

      <Select
        value="sort"
        sx={{ color: "white", border: "2px solid white", borderRadius: "20px" }}
      >
        <MenuItem value="sort">Сортировка</MenuItem>
        <MenuItem value="opt">По цене</MenuItem>
        <MenuItem value="oion">По рейтингу</MenuItem>
      </Select>
    </Stack>
  );
};
export default Butt;
