import { Product } from "../Catalog/IProduct";
import {
  Stack,
  Button,
  Card,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoad, setError } from "../../slices/ProductsSlice";
import { setCartProd, deleteProduct } from "../../slices/CartsSlice";
import { deleteProductFav } from "../../slices/FavouriteSlice";
import { RootState } from "../../store";
import { useTranslation } from "react-i18next";
export interface PropsCartFav {
  products: Product[];
}

const CardProduct = ({ products }: PropsCartFav) => {
  const dispatch = useDispatch();
  console.log(products);
  const { t, i18n } = useTranslation();
  return products.map((product) => (
    <Card
      key={product.id}
      sx={{
        maxWidth: 320,
        bgcolor: "#111111",
        color: "#ffffff",
        borderRadius: 3,
        p: 2,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
      }}
    >
      <Button
        variant="contained"
        size="small"
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          bgcolor: "#5a0346",
          zIndex: 1,
          "&:hover": { bgcolor: "#50013e" },
        }}
      >
        {i18n.language == "ru" ? "Купить" : "Buy"}
      </Button>

      <CardMedia
        component="img"
        image={product.photo}
        alt="Dyson Airwrap"
        sx={{ borderRadius: 2, objectFit: "cover", maxHeight: "270px" }}
      />

      <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
        {i18n.language == "ru" ? product.name_ru : product.name_en}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "rgba(255, 255, 255, 0.6)", my: 1 }}
      >
        {i18n.language == "ru"
          ? product.description_ru
          : product.description_en}
      </Typography>

      <Stack
        sx={{
          mt: 2,
          pt: 1,
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          size="small"
          sx={{ color: "#fff" }}
          onClick={(e) => {
            //
            dispatch(deleteProduct(product.id));
            dispatch(deleteProductFav(product.id));
          }}
        >
          🗑️
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {product.price}
        </Typography>
      </Stack>
    </Card>
  ));
};

export default CardProduct;
